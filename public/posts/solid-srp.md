## Single Responsibility Principle (SRP) ― .NET kontekstida 🧱

<br/>

**SOLID** — bu obyektga yo‘naltirilgan dasturlashdagi 5 ta muhim prinsiplar to‘plamidir. Ularning birinchisi — **S** harfi, ya’ni **Single Responsibility Principle** (Yagona Mas’uliyat Prinsipi).

> Bir sinf faqat bitta mas’uliyatga ega bo‘lishi kerak. Ya’ni, u o‘zgarishi uchun yagona sabab bo‘lishi kerak.  

<br/>
.NET dasturchilar ko‘p hollarda bu prinsipga amal qilmagan holda "God Object" yoki "Everything Manager" yaratib yuborishadi. Quyida SRP’ni yaxshiroq tushunishga yordam beradigan real misollarni ko‘rib chiqamiz.
<br/>

---
<br/>

### 👎 Barcha vazifani bitta sinf bajaradi
```csharp
public class InvoiceService
{
    public void CreateInvoice(Order order)
    {
        // 1. Invoice yaratish
    }

    public void SaveToDatabase(Invoice invoice)
    {
        // 2. Ma’lumotlar bazasiga saqlash
    }

    public void SendEmail(Invoice invoice)
    {
        // 3. Email yuborish
    }
}
```
- Bu yerda **InvoiceService** uchta butunlay **boshqa-boshqa mas’uliyat**ni bajarayapti:
  1. Invoice yaratish
  2. Bazaga saqlash
  3. Email yuborish

> Ya’ni, bu sinf **3 ta sababga ko‘ra o‘zgarishi mumkin**:
> - Invoice formatini o‘zgartirish
> - Database layerni o‘zgartirish
> - Email xabar dizaynini o‘zgartirish

---
<br/>

### ✅ Har bir mas’uliyat alohida
```csharp
public class InvoiceGenerator
{
    public Invoice Create(Order order)
    {
        // Invoice yaratish
        return new Invoice();
    }
}

public class InvoiceRepository
{
    public void Save(Invoice invoice)
    {
        // Ma’lumotlar bazasiga yozish
    }
}

public class EmailSender
{
    public void Send(Invoice invoice)
    {
        // Email yuborish
    }
}
```
- Har bir sinf **faqat bitta ishni bajaradi**
- O‘zgarishlar faqat alohida sinflarga ta’sir qiladi
- Unit testlar osonroq, modul almashtirish osonroq

---
<br/>

### 🎯 Hayotiy misol
Faraz qilaylik, siz ASP.NET Core Web API yaratmoqdasiz va unda foydalanuvchi ro‘yxatdan o‘tadi. Yomon dizayndagi `UserService` quyidagicha ko‘rinadi:

```csharp
public class UserService
{
    public void Register(UserDto userDto)
    {
        // 1. Validation
        // 2. Mapping
        // 3. User yaratish
        // 4. Saqlash
        // 5. Email yuborish
        // 6. Logging
    }
}
```

SRP ni to‘g‘ri qo‘llasak, bu vazifalarni alohida xizmatlarga ajratamiz:

```csharp
public class UserValidator
{
    public bool Validate(UserDto dto) { /* ... */ }
}

public class UserMapper
{
    public User Map(UserDto dto) { /* ... */ }
}

public class UserRepository
{
    public void Save(User user) { /* ... */ }
}

public class RegistrationNotifier
{
    public void SendWelcome(User user) { /* ... */ }
}
```

Va `UserRegistrationService` faqat orkestratsiya qiladi:

```csharp
public class UserRegistrationService
{
    private readonly UserValidator validator;
    private readonly UserMapper mapper;
    private readonly UserRepository repository;
    private readonly RegistrationNotifier notifier;

    public UserRegistrationService(
        UserValidator validator,
        UserMapper mapper,
        UserRepository repository,
        RegistrationNotifier notifier)
    {
        this.validator = validator;
        this.mapper = mapper;
        this.repository = repository;
        this.notifier = notifier;
    }

    public void Register(UserDto dto)
    {
        if (!validator.Validate(dto)) throw new Exception("Invalid user data");

        var user = mapper.Map(dto);
        repository.Save(user);
        notifier.SendWelcome(user);
    }
}
```

---
<br/>

### 💡 Afzalliklari
- **O‘qish oson**: Har bir sinf faqat bitta ishni bajaradi.
- **Test qilish oson**: Har bir modulni alohida sinovdan o‘tkazish mumkin.
- **Refactor qilish qulay**: Kichik o‘zgarishlar butun kodga ta’sir qilmaydi.
- **Reusability**: EmailSender yoki Validator boshqa sinflarda ham ishlatiladi.

---
<br/>

### ❗ Eslatma
SRP bu:
- "Har bir sinf faqat bitta metodga ega bo‘lsin" degani emas.  
- "Har bir sinf faqat bitta sabab bilan o‘zgarsin" degani.  
> Bir nechta metod bo‘lishi mumkin, lekin hammasi **bitta mas’uliyatni** ifoda etishi kerak.

---
<br/>

### 🧭 Xulosa
Single Responsibility Principle (SRP) — bu kodni modularlashtirish va kelajakdagi o‘zgarishlarga tayyor qilishda eng muhim tamoyillardandir. .NET loyihalaringizda har bir klassga savol bering:

> **"Bu sinf qaysi yagona vazifani bajaradi?"**

Agar siz bir nechta mas’uliyatni ko‘rsangiz — vaqt keldi: uni ajrating. ✅

---
<br/>

Happy coding! 👨‍💻👩‍💻

{% nextpost slug="di-faktory-metodlar" %}
