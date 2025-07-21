## .NET Locking Primitives ― To‘liq Qo‘llanma 🔐

<br/>

**Concurrent** _(bir nechta thread bir vaqtning o‘zida)_ muhitda resurslaringizni himoya qilish juda muhim. `.NET` ramkasida quyidagi primitivlar orqali resurslar himoya qilinadi:

- `lock` (Monitor asosida)  
- `Monitor` sinfi  
- `Mutex`  
- `Semaphore`  
- `SemaphoreSlim`  

Quyida har biriga batafsilroq to‘xtalamiz, **real-world** misollar va qaysi holatda nima ishlatish kerakligini ko'rib chiqamiz.

---

### 1. `lock` (Monitor asosida) 🔒
```csharp
public class Counter
{
    private readonly object locker = new object();
    private int count = 0;

    public void Increment()
    {
        lock (locker)
        {
            // Kritikal bo‘lim: faqat bitta thread bu yerda
            count++;
            Console.WriteLine($"Count: {count}");
        }
    }
}
```
- **Tushuntirish**:  
  - `lock(obj)` aslida `Monitor.Enter(obj)` va `Monitor.Exit(obj)` ga teng.
  - `Monitor.Enter(obj)` va `Monitor.Exit(obj)` orasidagi hudud kritikal _(xavfli)_ hudud hisoblanadi
  - bitta `Thread` xavfli hududga kirsa, boshqasi kutib turadi
- **Qachon ishlatish**:  
  - Oddiy sinxronizatsiya: bitta obyekt ustida oddiy inkrement yoki o‘qish/yozish operatsiyalari.  
- **Pros & Cons**:  
  - Yengil va sodda; ammo faqat sinxron (sync) kod uchun, asinxron operatsiyalarda `Thread` baribir ham bloklanadi.

<br/>

---

### 2. `Monitor` sinfi 🛠️
```csharp
public class ProducerConsumer
{
    private readonly object locker = new object();
    private Queue<int> queue = new Queue<int>();
    private const int MAX = 5;

    public void Produce(int item)
    {
        lock (locker)
        {
            while (queue.Count >= MAX)
                Monitor.Wait(locker);   // Bo‘sh joy bo‘lgunga qadar kutadi

            queue.Enqueue(item);
            Console.WriteLine($"Produced {item}");
            Monitor.Pulse(locker);      // Consumer ga signal beradi
        }
    }

    public void Consume()
    {
        lock (locker)
        {
            while (queue.Count == 0)
                Monitor.Wait(locker);   // Element bo‘lguncha kutadi

            int item = queue.Dequeue();
            Console.WriteLine($"Consumed {item}");
            Monitor.Pulse(locker);      // Producer ga signal beradi
        }
    }
}
```
- **Tushuntirish**:  
  - `Wait(locker)`: bant qilingan obyektni _(bu yerda `locker`)_ bo‘shatadi _(release)_ va threadni uyquga yuboradi.  
  - `Pulse(locker)`: bitta kutayotgan / uyquga yuborilgan threadni uyg‘otadi.  
  - `PulseAll(locker)`: barcha kutayotgan (uxlayotgan) **thread**larni uyg‘otadi.  
- **Use case**: Producer–Consumer, signalling, condition-based blocking.  
- **Eslatma**: Har doim `lock` hududi ichida chaqiriladi; aks holda `SynchronizationLockException`.

<br/>

---

### 3. `Mutex` 🌐
```csharp
public void SingleInstance()
{
    // Global scope: boshqa processlar ham ko‘radi
    using (var mutex = new Mutex(false, "Global\\MyAppMutex"))
    {
        if (!mutex.WaitOne(TimeSpan.FromSeconds(3)))
        {
            Console.WriteLine("Another instance is running.");
            return;
        }

        // Kritikal bo‘lim: yagona processda ishlaydi
        Console.WriteLine("This is the only instance.");
        Thread.Sleep(2000);

        mutex.ReleaseMutex();
    }
}
```
- **Tushuntirish**:  
  - OS darajasida yaratiladi, `Mutex` nomni _global/local_ qilib belgilash mumkin.  
  - Bir process resursni (bu yerda `Global\\MyAppMutex` nomi)  egallasa, boshqasi kutadi yoki xatolik beradi.  
- **Use case**: Bitta ilovaning bir nechta nusxasidan turib yagona resursga murojaat qilishni oldini oladi.  
- **Pros & Cons**:  
  - Kuchli: processlararo himoya;  
  - Og‘irroq va biroz sekinroq.

<br/>

---

### 4. `Semaphore` 🚦
```csharp
public class DbPool
{
    private static Semaphore semaphore = new Semaphore(3, 3);

    public void UseDatabase(int id)
    {
        semaphore.WaitOne();    // Ruxsat topguncha kutadi
        try
        {
            Console.WriteLine($"Thread {id} using DB");
            Thread.Sleep(1000);  // Simulyatsiya
        }
        finally
        {
            Console.WriteLine($"Thread {id} done");
            semaphore.Release();
        }
    }
}
```
- **Tushuntirish**:  
  - Maksimal (`maxCount`) va boshlang‘ich (`initialCount`) qiymat bilan yaratiladi.  
  - Har WaitOne() chaqiruvi — bitta ruxsatni oladi; Release() — qaytaradi.  
- **Use case**: Cheklangan kirish: masalan, 3 ta parallel DB ulanish.  
- **Pros & Cons**:  
  - Processlararo ham bo‘lishi mumkin;  
  - Asinxron metodlarni qo‘llab‑quvvatlamaydi.

<br/>

---

### 5. `SemaphoreSlim` 🏃‍♂️
```csharp
public class AsyncService
{
    private static SemaphoreSlim semSlim = new SemaphoreSlim(5, 5);

    public async Task ProcessAsync(int id)
    {
        await semSlim.WaitAsync();  // Async kutish
        try
        {
            Console.WriteLine($"Async {id} started");
            await Task.Delay(500);
        }
        finally
        {
            Console.WriteLine($"Async {id} finished");
            semSlim.Release();
        }
    }
}
```
- **Tushuntirish**:  
  - `Semaphore`ning yengilroq varianti, `async/await` bilan ishlaydi.  
  - Internal spinning (tezroq kirish uchun qisqa kutish) va so‘ngra bloklash. Batafsil [👉 bu yerda](https://ilmhub.uz/posts/semaphore-slim)
- **Use case**: Bir process ichida asinxron parallel limitlash.  
- **Pros & Cons**:  
  - Tezkor va yengil  
  - Processlararo ishlamaydi.

<br/>

---

### Taqqoslash Jadvali 📊
| Primitiv          | Thread darajasi | Process darajasi | Async qo‘llab-quvvatlash | Og‘irlik  |
|-------------------|-----------------|------------------|--------------------------|-----------|
| `lock`/`Monitor`  | ✔️             | ❌               | ❌                       | Yengil    |
| `Monitor`         | ✔️             | ❌               | ❌                       | O‘rtacha  |
| `Mutex`           | ✔️             | ✔️               | ❌                       | Og‘ir     |
| `Semaphore`       | ✔️             | ✔️               | ❌                       | O‘rtacha  |
| `SemaphoreSlim`   | ✔️             | ❌               | ✔️                       | Yengil    |

<br/>

### Qachon Qaysi Primitiv? 🤔<br/>
1. **Simple multithread**: `lock` → tez, soddaligi uchun afzal.  
2. **Condition-based signaling**: `Monitor.Wait`/`Pulse`.  
3. **Single-instance app**: `Mutex`.  
4. **Cheklangan parallelizm**: `Semaphore`.  
5. **Async kod**: `SemaphoreSlim`.

<br/>

---

### Xulosa ✨
Har bir primitiv o‘z kuchli va zaif tomoniga ega. Kichik sinxron vazifalar uchun `lock`, murakkab signaling uchun `Monitor`, processlararo cheklov uchun `Mutex` yoki `Semaphore`, async muhit uchun esa `SemaphoreSlim` ni tanlang. Shu tarzda eng samarali va xavfsiz konkurenstlikni ta’minlaysiz! 🚀

<br/>
