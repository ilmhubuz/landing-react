# Tsql ― SARGability 🔍

**SQL Server**da **query** samaradorligi ko‘pincha **[SARGability](https://en.wikipedia.org/wiki/Sargable)** tushunchasiga bog‘liq bo‘ladi. 

**SARGable query** indeksdan samarali foydalanib kerakli **index**larnigina o'qiydi; **non-SARGable** esa butun jadval yoki **index**ni skan qiladi.

---
<br/>

## 👎 Non-SARGable misol

Quyidagi **query**ga e’tibor bering:

```sql
SELECT *
FROM Transactions
WHERE DATEADD(DAY, -1, CreatedDateTime) >= SYSUTCDATETIME();
```

- Bu yerda `DATEADD` **ustun ustida** ishlatilmoqda  
- Optimizer har bir satr uchun `DATEADD` hisoblab chiqadi  
- Index mavjud bo‘lsa ham, **index seek ishlatilmaydi**, balki **scan** qilinadi  

> Natijada, katta hajmdagi jadvalda bu query juda sekin ishlaydi.

---
<br/>

## ✅ SARGable misol

Endi shartni qayta yozamiz:

```sql
SELECT *
FROM Transactions
WHERE CreatedDateTime >= DATEADD(DAY, -1, SYSUTCDATETIME());
```

- Endi `DATEADD` **konstanta ustida** ishlamoqda  
- `CreatedDateTime` “yolg‘iz” (`naked column`) qoldi  
- Optimizer index’dan samarali foydalanadi va **index seek** ishlaydi  

> Shu o‘zgarishning o‘zi query performance’ni bir necha baravar yaxshilaydi. 🚀

---

## 🔧 Umumiy qoidalar

- `WHERE` qismida **ustun ustida funksiyalar ishlatishdan saqlaning** (`ISNULL`, `CAST`, `CONVERT`, va h.k.)  
- Ustunni “toza” (`naked column`) holatda qoldiring, barcha matematik amallarni va funksiyalarni **konstantaga** qo‘ying  
- Query’ni shunday yozingki, SQL Server **index seek** ishlata olsin  

---

## 🎯 Hayotiy misol

👎 Non-SARGable:
```sql
WHERE YEAR(CreatedDateTime) = 2025
```

✅ SARGable:
```sql
WHERE CreatedDateTime >= '2025-01-01'
  AND CreatedDateTime <  '2026-01-01'
```

> Bir qarashda farqi kichikdek tuyuladi, lekin **performance farqi juda katta** bo‘lishi mumkin.

---

## 🧭 Xulosa

**SARGability** ― bu query performance uchun juda muhim tushuncha:  

- **SARGable query** → index seek, tez ishlaydi  
- **Non-SARGable query** → index scan/table scan, sekin ishlaydi  

> Har safar query yozganingizda o‘zingizdan so‘rang:  
> **"Bu shart indeksdan samarali foydalanadimi?"**  

Agar javob “yo‘q” bo‘lsa, query’ni SARGable shaklga keltirish kerak. ✅

{% nextpost slug="query-optimization" %}
