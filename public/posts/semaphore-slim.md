# `Semaphore` va `SemaphoreSlim` o‘rtasidagi farqlar

## 🧵 Ko‘p oqimli dasturlashda sinxronlash

Ko‘p oqimli (multi-threaded) dasturlashda birdaniga bir nechta oqim (thread)lar bitta resursga murojaat qilishi mumkin. Agar bunday kirish to‘g‘ri boshqarilmasa:

- Resurslar noto‘g‘ri holatga kelib qoladi
- Parchalanish (race condition) yuz beradi
- Ma'lumotlar ishonchliligi buziladi

.NET platformasida bu kabi vaziyatlarni boshqarish uchun `Semaphore` va `SemaphoreSlim` sinflari mavjud. Quyida ularning qanday ishlashi, farqlari va real hayotdagi misollar orqali tushuntiriladi.

---

## 📌 `Semaphore` nima?

`Semaphore` bu operatsion tizim darajasida ishlovchi obyekt bo‘lib, birdaniga **N ta thread**ga resursga kirishga ruxsat beradi. Boshqacha qilib aytganda, bu **"signal asosida ishlovchi hisoblagich"** bo‘lib, resurslar soni bilan cheklangan.

### 💡 Real hayotdagi misol:

Tasavvur qiling, avtoturargohda 3 ta bo‘sh joy bor. Har bir mashina joy topguncha kutadi. Bu holatda `Semaphore(3, 3)` resurs sifatida qaraladi.

### Kod namunasi:

~~~csharp
using System;
using System.Threading;

class Program
{
    static Semaphore semaphore = new Semaphore(3, 3);

    static void Main()
    {
        for (int i = 1; i <= 6; i++)
        {
            Thread t = new Thread(EnterParking);
            t.Name = $"Mashina {i}";
            t.Start();
        }
    }

    static void EnterParking()
    {
        Console.WriteLine($"{Thread.CurrentThread.Name} joy qidirmoqda...");
        semaphore.WaitOne(); // Ruxsat kutish
        Console.WriteLine($"{Thread.CurrentThread.Name} parkovkaga kirdi.");
        Thread.Sleep(2000); // Mashina parkovkada
        Console.WriteLine($"{Thread.CurrentThread.Name} chiqmoqda...");
        semaphore.Release(); // Joyni bo‘shatish
    }
}
~~~

---

## 📌 `SemaphoreSlim` nima?

`SemaphoreSlim` — bu `Semaphore`ning **yengil (lightweight)** versiyasi bo‘lib, **faqatgina bitta jarayonda (in-process)** ishlash uchun mo‘ljallangan. U OS (operatsion tizim) yadrosiga murojaat qilmasdan, ko‘p hollarda **faqat xotirada** ishlaydi.

Bu uni **tezroq**, **kam resurs talab qiladigan** va **`async/await` bilan ishlashga mos** qiladi.

### Kod namunasi:

~~~csharp
using System;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static SemaphoreSlim semaphoreSlim = new SemaphoreSlim(3);

    static async Task Main()
    {
        for (int i = 1; i <= 6; i++)
        {
            int carId = i;
            _ = Task.Run(() => EnterParking(carId));
        }

        await Task.Delay(5000); // Dastur tugashini kutish
    }

    static async Task EnterParking(int id)
    {
        Console.WriteLine($"Mashina {id} joy qidirmoqda...");
        await semaphoreSlim.WaitAsync();
        Console.WriteLine($"Mashina {id} parkovkaga kirdi.");
        await Task.Delay(2000);
        Console.WriteLine($"Mashina {id} chiqmoqda...");
        semaphoreSlim.Release();
    }
}
~~~

---

## ⚙️ Texnik farqlar

| Xususiyat                     | `Semaphore`                            | `SemaphoreSlim`                           |
|-------------------------------|----------------------------------------|-------------------------------------------|
| Foydalanish sohasi            | Jarayonlararo (`Interprocess`)         | Faqat bitta jarayon (`In-process`)        |
| Asosiy ishlash mexanizmi      | Kernel-level                           | User-level (xotirada)                     |
| Ishlash tezligi               | Nisbatan sekin                         | Tez (spinning + kechikishsiz)             |
| Resurs iste'moli              | Yuqori                                 | Kam                                      |
| `async/await` qo‘llovi        | Yo‘q                                   | ✅ Ha, `WaitAsync()` mavjud               |
| Spinning (aylanish)           | Yo‘q                                   | ✅ Ha                                     |
| Bloklash darajasi             | Har doim bloklaydi                     | Avval spinning, keyin bloklaydi           |
| Platforma bog‘liqligi         | Windows OS bilan bog‘liq               | Platformadan mustaqil                     |

---

## 🔍 Ichki ishlash: Spinning qanday ishlaydi?

`SemaphoreSlim` ichida quyidagi algoritm ishlaydi:

1. Thread resursni so‘raydi (`Wait()` yoki `WaitAsync()`).
2. Agar ruxsat mavjud bo‘lsa — darhol oladi.
3. Agar yo‘q bo‘lsa:
   - Avval `SpinWait` orqali **aylanadi** (CPUni band qilmaydi).
   - Hali ham bo‘sh joy yo‘q bo‘lsa — faqat shunda **bloklanadi**.
   
Bu usul, ayniqsa qisqa vaqtli to‘qnashuvlarda samarali bo‘lib, **kontekst almashinuvi (context switch)** zaruratini kamaytiradi.

---

## ✅ Qachon qaysi birini tanlash kerak?

### `Semaphore` dan foydalaning, agar:
- Sizga **jarayonlararo** sinxronlash kerak bo‘lsa
- `legacy` tizimlar bilan ishlayotgan bo‘lsangiz
- Barqarorlik va OS darajasida boshqaruv zarur bo‘lsa

### `SemaphoreSlim` dan foydalaning, agar:
- Faqat bitta ilova doirasida ishlayotgan bo‘lsangiz
- **`async/await` bilan ishlashni** rejalashtirgan bo‘lsangiz
- Maksimal tezlik va samaradorlik kerak bo‘lsa

---

## 🧠 Xulosa

`Semaphore` va `SemaphoreSlim` sinflari ko‘p oqimli dasturlarni sinxronlashtirishda juda foydali vositalardir. Ularning asosiy farqlari:

- **`Semaphore` — barqaror va kuchli, lekin sekin.**
- **`SemaphoreSlim` — yengil, zamonaviy, va yuqori samarali.**

Dasturingiz talablari, arxitekturasi va ishlash samaradorligiga qarab siz ulardan birini tanlashingiz mumkin.

---

## 📚 Foydali havolalar
- [`lock`, `semaphore`, `semaphoreslim` haqida batafsil](https://ilmhub.uz/posts/locking-toliq-qollanma)
- [`SemaphoreSlim` rasmiy hujjatlari (Microsoft)](https://learn.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim)
- [`Semaphore` rasmiy hujjatlari (Microsoft)](https://learn.microsoft.com/en-us/dotnet/api/system.threading.semaphore)
- [Thread sinxronlash haqida umumiy ko‘rsatma (.NET Docs)](https://learn.microsoft.com/en-us/dotnet/standard/threading/)
