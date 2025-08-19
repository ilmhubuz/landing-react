## 10🍋 qatorli jadvalda sanash 

Katta hajmdagi jadvallarda ishlashda ba’zan oddiy `COUNT(*)` query ham juda sekin natija qaytarishi mumkin. Bugun biz aynan shunday muammoga duch keldik va uni optimallashtirish orqali tezlikni bir necha barobar oshirdik. 🏎️

---

#### 🤔 Muammo

Biz ishlatayotgan query quyidagicha edi:

```sql
SELECT COUNT(*)
FROM Transactions
WHERE ClusterID > (SELECT MAX(ClusterID) - 100000 FROM Transactions)
  AND CreatedDateTime >= DATEADD(DAY, -1, SYSUTCDATETIME());
```

- Jadvalda 13 milliondan ortiq satr mavjud
- Birinchi ishga tushirishda query **30–35 soniya** davom etadi
- Keyingi ishga tushirishlarda esa cache sababli **sub-sekund** natija beradi
- Lekin uzoq vaqt ishlatilmagandan keyingi birinchi query yana 35+ sekund bajariladi

> Demak, asosiy muammo **cold cache** paytida query jadvalni to‘liq o‘qib chiqishga majbur bo‘layotganida edi.

---

#### 🔍 Yechim variantlari

1. **Query rewrite (SARGability)**  
   `MAX(ClusterID)` ni alohida olish va keyin shartga qo‘shish orqali optimizerga to‘g‘ri plan tanlash imkonini berish:
   ```sql
   DECLARE @cutoffClusterID BIGINT;
   SELECT @cutoffClusterID = MAX(ClusterID) - 100000 FROM Transactions;
   SELECT COUNT(*)
   FROM Transactions
   WHERE ClusterID > @cutoffClusterID
     AND CreatedDateTime >= DATEADD(DAY, -1, SYSUTCDATETIME());
   ```
> Tsql SARGability haqida (mana bu yerda)[/posts/tsql-sargability] batafsil o'qing.


2. **Index yaratish**  
   `ClusterID` va `CreatedDateTime` ustunlariga `NONCLUSTERED INDEX` qo‘shish orqali query faqat kerakli sahifalarni o‘qiydi.

3. **Filtered index**  
   Agar query doim oxirgi kun yoki hafta bo‘yicha ishlatilsa, `WHERE CreatedDateTime >= ...` sharti bilan filtered index yaratish mumkin.

4. **Pre-aggregation**  
   Agar doimiy ravishda shu kabi hisoblash kerak bo‘lsa, alohida summary jadval yuritib, unda `COUNT` qiymatini oldindan saqlash mumkin.

---

#### ✅ Tanlangan Yechim

Biz birinchi yondashuvni tanladik:

**Query rewrite** — `DECLARE` orqali cutoff qiymatini olib, query’ni SARGable qildik. Bu optimizerga `seek` ishlatish imkonini berdi.
Bu variantni tanlashimizga asosiy sabab qolgan barcha usullar database sxemasiga o'zgarish kiritadi. Bu esa albatta o'z risklari va vaqt omili bilan keladi. 
Queryni yuqoridagida SARGable qilib qayta yozishni o'zi bizga millisekundlar ichida natija bera boshladi. 

> Natijada, avvalgi 30–35 soniyalik query endi millisekund ichida natija bermoqda 🚀

Filtered index va pre-aggregation ham foydali variantlar, ammo bizning hozirgi ehtiyojimizni aynan **rewrite + index** kombinatsiyasi to‘liq qondirdi.

---

#### 🧭 Xulosa

- Katta jadvalda `COUNT(*)` ishlatish har doim ham tez bo‘lmaydi.  
- Query rewrite va to‘g‘ri index tanlash orqali **katta tezlik yutug‘i** olish mumkin.  
- Doimiy ishlatiladigan statistikalar uchun esa pre-aggregation yechimlari o‘ylab ko‘rilishi kerak.  

> Agar query sekin ishlayotgan bo‘lsa, avval **SARGability** va **index** masalasini ko‘rib chiqing. Bu eng tez va samarali yechimdir. ✅
