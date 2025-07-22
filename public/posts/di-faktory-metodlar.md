## 🎓 Dependency Injection va Factory Metodlar

<br/>
{% youtube F8qspc2_AKY  %}
<br/>

🚀 Ushbu maqolada .NET'dagi **Dependency Injection (DI)** haqida batafsil tushuntiramiz. Quyidagi video orqali bu mavzuni real kod misollarida ko‘rib chiqamiz.

---

### 📌 Nima bu Dependency Injection?

Dependency Injection — bu klasslar o‘ziga kerakli bo‘lgan xizmat (service) yoki obyektlarni o‘zlari yaratmasdan, tashqi manbadan (odatda DI konteynerdan) olish usulidir. Bu:
- kodni soddalashtiradi,
- testlashni osonlashtiradi,
- komponentlararo bog‘liqlikni kamaytiradi.

---

## 🧱 DI komponentlari

### ✅ Service Collection
`IServiceCollection` — bu yerda siz xizmatlaringizni ro‘yxatdan o‘tkazasiz.

### ✅ Service Provider
`ServiceProvider` — bu ro‘yxatdan o‘tgan xizmatlarni yaratib va yetkazib beruvchi obyektdir.

---

## 🔄 Service Lifetime turlari

### 🔹 AddTransient
- **Har safar yangi nusxa yaratadi**
- Har safar `GetRequiredService<T>()` chaqirilganda yangi obyekt qaytaradi.

```
services.AddTransient<Student>();
```

### 🔸 AddSingleton
- **Bitta obyektni yaratadi va hamma joyda shuni ishlatadi**
- Dastur davomida faqat bitta nusxa ishlatiladi.

```
services.AddSingleton<Student>();
```

---

## 🏭 Factory Method bilan ro‘yxatdan o‘tkazish

Agar xizmatni yaratishda moslashtirilgan obyekt kerak bo‘lsa, `factory method` dan foydalaniladi:

```
services.AddTransient<Student>(provider => new Student {
    Name = "Eshmat",
    Age = 27,
    CreatedAt = DateTime.Now
});
```

Bu usulda siz obyektni qanday qilib yaratishni aniq belgilaysiz.

---

## 🧪 Amaliy misol: Student klassi

```
public class Student
{
    public string Name { get; set; }
    public int Age { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public override string ToString() => $"Name: {Name}, Age: {Age}, CreatedAt: {CreatedAt}";
}
```

Kodni ishga tushirganda siz `Transient`da har safar yangi vaqt (`CreatedAt`) olgan student nusxasini ko‘rasiz, `Singleton`da esa vaqt bir xil bo‘lib qoladi.

---

## ⏱ Service Lifetime’ni solishtirish

| Lifetime     | Yangi obyektmi? | Foydalanish holati                    |
|--------------|------------------|--------------------------------------|
| Transient    | Ha               | Har bir chaqiriqda yangi obyekt      |
| Singleton    | Yo‘q             | Har doim bitta obyekt qaytariladi    |
| Scoped       | (Video’da yo‘q)  | Har bir HTTP so‘rov uchun bitta obyekt |

---

## 🔚 Xulosa

.NET’dagi Dependency Injection — kuchli va qulay mexanizm. U orqali siz kodni modulli, testlanadigan va kengaytiriladigan holga keltirasiz. Ushbu maqola va video orqali siz DI ning asosiy tushunchalari va amaliy qo‘llanilishini o‘zlashtirasiz.

---

👉 **Izoh qoldiring**, savollaringiz bo‘lsa bemalol yozing!  
🟡 **Obuna bo‘ling** va .NET darslarining keyingi videolarini o‘tkazib yubormang!

#dotnet #csharp #dependencyinjection #aspnetcore #uzbekdev #programming
