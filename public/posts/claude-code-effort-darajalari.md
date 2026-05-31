# Claude Code effort darajalari: Low, Medium, High, xHigh, Max aslida nima qiladi? 🎚️

Claude Code'da **effort** — ya'ni modelning "qancha chuqur o'ylashi" — natija sifatiga juda katta ta'sir qiladi. Lekin ko'pchilik o'zi qaysi standart darajada ishlayotganini ham bilmaydi va, bilmagan holda, pasaytirilgan sozlamada kod yozadi. Keling, har bir darajani tartib bilan ko'rib chiqamiz, qaysi birini qachon tanlashni hal qilamiz va eng yangi **Opus 4.8** modeli bu rasmni qanday o'zgartirganini ko'ramiz. 🧭

---
<br/>

## ⚡ Qisqacha (TL;DR)

- Darajalar **4 ta emas, 5 ta**: `low`, `medium`, `high`, `xhigh`, `max` 🖐️
- Eng yangi **Opus 4.8** (hozirgi standart model) hamma tarifda `high`'da ishlaydi. Opus 4.7 esa `xhigh`'da, eski 4.6 modellari Pro/Max'da `medium`'da edi.
- Effort — bu **xulq-atvor signali**, qattiq token byudjeti emas. Hatto `low`'da ham Claude qiyin masala ustida o'ylaydi — shunchaki kamroq.
- Effort bir vaqtning o'zida 4 narsani boshqaradi: **o'ylash chuqurligi**, **tool chaqirish ishtahasi**, **javob uzunligi** va **avtonom davom etish**.
- Anthropic tavsiyasi (4.7 va 4.8 uchun): kod va agentic ish uchun `xhigh`dan boshlang, qolgan hamma narsa uchun `high`.
- Ko'pincha **kontekst sifati** effort darajasidan muhimroq — yaxshi kontekst bilan `low` yomon kontekstdagi `max`'ni ortda qoldiradi.

---
<br/>

## 🎛️ Effort aslida nimani boshqaradi?

Effort darajasi **moslashuvchan fikrlash**ni (adaptive reasoning) boshqaradi — model har bir qadamda masala murakkabligiga qarab qancha o'ylashni o'zi hal qiladi. Effort sozlamasi esa shu fikrlashning yuqori chegarasi va umumiy moyilligini belgilaydi.

U bir vaqtning o'zida **4 narsa**ga ta'sir qiladi:

1. **O'ylash chuqurligi** — javob berishdan oldingi ichki fikrlash hajmi.
2. **Tool chaqirish ishtahasi** — qo'shimcha fayllarni o'qish, qo'shimcha buyruq ishga tushirish va harakatdan oldin tekshirishga qanchalik moyil.
3. **Javob uzunligi** — yuqori effort uzunroq, batafsilroq javob beradi.
4. **Avtonom davom etish** — `low`'da model to'xtab, aniqlik so'raydi; `medium` va undan yuqorida oldindan rejalashtirib, mustaqil davom etaveradi.

> 💡 Shkala har bir model uchun alohida sozlangan — bir xil daraja nomi turli modellarda bir xil "kuch"ni anglatmaydi. Masalan, Opus 4.7 chiqqanda butun shkala yuqoriga surilgandi: `low` effortdagi 4.7 taxminan `medium` effortdagi 4.6'ga teng edi.

---
<br/>

## 📊 Darajalar

| Daraja | Xulq-atvori |
|--------|-------------|
| **Low** | Eng tez. Oddiy masalalarda o'ylab o'tirmaydi, minimal tool ishlatadi, javoblari qisqa, kerak bo'lsa to'xtab savol beradi. Tezkor, siz boshqarib turgan interaktiv so'rovlar va subagentlar uchun. |
| **Medium** | Muvozanatli. Kerak bo'lganda o'ylaydi, kerak bo'lmasa — yo'q. Umumiy kod, kichik refactoring va xarajatga e'tiborli avtonom sessiyalar uchun. |
| **High** | Murakkab masalalarda deyarli har doim o'ylaydi, so'ralmasa ham aloqador fayllarni o'qiydi, batafsil javob beradi. **Opus 4.8 va Sonnet 4.6 ning standarti** — sifat va token tejamkorligi orasidagi muvozanat. |
| **xHigh** | High'dan bir pog'ona yuqori — chuqurroq fikrlaydi, ko'proq tekshiradi, uzoq vazifalar bo'ylab izchil davom etadi. Faqat Opus 4.7 va 4.8 da. Anthropic'ning **kod va agentic ish uchun tavsiya etgan boshlang'ich nuqtasi**. |
| **Max** | Eng yuqori quvvat, token chegarasi yo'q. Faqat haqiqatan og'ir, "frontier" masalalar uchun. Ko'pchilik vazifada katta xarajat evaziga arzimas yutuq beradi, ba'zan esa ortiqcha o'ylab yuboradi. |

> 📌 Effort — **qattiq token byudjeti emas**, balki xulq-atvor signali. Hatto `low`'da ham masala yetarlicha qiyin bo'lsa, Claude baribir o'ylaydi — shunchaki yuqori darajadagidan kamroq. Ya'ni darajani pasaytirsangiz, model "ahmoq" bo'lib qolmaydi — shunchaki kamroq harakat qiladi.

---
<br/>

## 🧩 Tarif va modelga qarab standart sozlama

Aynan shu yer chalkash. Standart effort **ham modelga, ham tarifingizga** bog'liq:

| Model | Pro / Max (shaxsiy) | Team / Enterprise (jamoaviy) |
|-------|--------------------|------------------------------|
| **Opus 4.8** (hozirgi standart) | `high` | `high` |
| Opus 4.7 | `xhigh` | `xhigh` |
| Opus 4.6 | `medium` | `high` |
| Sonnet 4.6 | `medium` | `high` |

Bir qarashda g'alati: Opus 4.7 hamma joyda `xhigh`'da edi, yangi **Opus 4.8** esa `high`'ga "tushdi". Sababi — 4.8 ning `high`'i 4.7 ning standartiga yaqin token sarflab, har bir kod benchmarkida undan yaxshiroq ishlaydi. Ya'ni bu pasayish emas, balki **bir xil xarajatga ko'proq sifat**.

Eski 4.6 modellari bilan tarix biroz chalkash: standart avval hamma tarifda `high` edi, mart oyida jimgina `medium`'ga tushirildi, so'ng faqat jamoaviy tariflar uchun yana `high`'ga ko'tarildi. (Eng so'nggi xabarlarga ko'ra, yaqinda Pro/Max uchun ham 4.6 modellari `high`'ga qaytarilgan.)

> 📌 **Aniqlik kiritamiz:** Claude Code'ning o'zi — bu **harness** (qobiq), model emas. "Claude Code standartda nima ishlatadi" deganda, aslida **model**ning standart efforti nazarda tutiladi. Hozirgi darajangizni bilish uchun `/effort` ni argumentsiz ishga tushiring. Opus 4.5 da esa effort darajalari umuman yo'q.

---
<br/>

## 🤖 Har bir model bo'yicha

### 🆕 Opus 4.8 (2026-yil 28-may)

Hozirgi standart va eng kuchli model — ko'pchilik benchmarkda GPT-5.5 va Gemini 3.1 Pro'ni ham ortda qoldiradi. Standart effort hamma joyda `high`. Anthropic tavsiyasi: **kod va agentic ish uchun `xhigh`dan boshlang**, qolgan ish uchun `high`, va `medium`/`low`'ga faqat o'z testlaringizda sifat tushmasligiga ishonch hosil qilgach o'ting.

Nimasi bilan ajralib turadi:

- **Tejamkorroq.** `high`-4.8 4.7 ning standart sarfiga yaqin token ishlatib, har bir kod benchmarkida undan yaxshiroq natija beradi.
- **O'zini tekshiradi.** O'z kodidagi xatolarni 4.7'ga qaraganda ~4 baravar ko'p ilg'aydi; ortiqcha ishonch (overconfidence) 10 barobardan ortiq kamaygan.
- **Halolroq.** Noto'g'ri natijani tanqidsiz "to'g'ri" deb taqdim etish — 0%; muhim narsani aytmay o'tib ketish — atigi 3.7%.
- **Fast mode** ~2.5 baravar tezroq va 3 baravar arzonroq.

> 🚀 **Yangi: Ultracode + Dynamic Workflows.** Claude Code'ning effort menyusida `ultracode` paydo bo'ldi. Bu alohida effort darajasi **emas** — `xhigh` ustiga "ko'p agentli workflow'larni ishga tushirishga ruxsat"ni qo'shadi: model katta vazifani rejalashtirib, bitta sessiyada yuzlab parallel subagent ochadi va tugatishdan oldin o'z natijasini tekshiradi. (Team/Enterprise/Max tariflarida.)

### Opus 4.7

Standart — hamma joyda `xhigh`. Effortni 4.6'ga qaraganda **qat'iyroq hurmat qiladi**: pastroq darajada ishni keraksiz kengaytirmay, aniq doirada bajaradi. Murakkab masalada sayoz fikrlasa, "atrofidan aylanib" prompt yozish o'rniga effortni oshiring. (Bu maslahatlar 4.8'ga ham tegishli.)

### Sonnet 4.6

API standarti — `high`, lekin amaliyotda `medium` kundalik agentic kod uchun tez va yetarli. Eng muhimi: **Sonnet ko'rsatmalarga qat'iy amal qiladi, "drift" qilmaydi** — shuning uchun yaxshi reja tuzilgan bo'lsa, ijroni bemalol pastroq effortda topshirsangiz bo'ladi.

### Haiku 4.5

Eng arzon va eng tez. Effort parametri bu yerda xuddi katta modellardagidek qo'llanmaydi. Oddiy qidiruvlar, tezkor tahrirlar va boilerplate uchun zo'r.

> 📉 **Limitni kuzating:** `xhigh` va `max` `high`'ga qaraganda sezilarli darajada ko'proq token sarflaydi. Haftada qancha limitingiz qolganini web ilovaning **Settings → Usage** sahifasidan ko'rib turing.

---
<br/>

## 🗂️ Qachon qaysi birini ishlatish kerak

| Topshiriq | Model + Effort |
|-----------|----------------|
| Fayl nomini o'zgartirish, oddiy grep, build buyruqlari | **Sonnet Low** |
| Umumiy kod, kichik refactoring, test yozish | **Sonnet Medium** |
| Murakkab kod, ko'p faylli refactoring, debugging | **Opus 4.8 xHigh** |
| Uzoq avtonom sessiyalar, yuzlab subagentli ulkan vazifa | **Opus 4.8 Ultracode** |
| Arxitektura qarorlari, nozik buglar, xavfsizlik tekshiruvi | **Opus 4.8 Max** |

> 💡 **Bir naqsh:** murakkab **rejani** Opus 4.8 xHigh/Max bilan tuzing, so'ng **ijroni** Sonnet'ga pastroq effortda topshiring. Sonnet aniq rejaga drift qilmasdan amal qiladi — reja bir ma'noli va atomik bo'lsa, ijro arzonga tushadi.

---
<br/>

## 🎯 Effort ≠ Aql: kontekst sifati tuzog'i

Effort darajasi qisman **kontekst sifatining o'rnini bosadi**. Yaxshi kontekst bilan `low`'dagi model ko'pincha **yomon kontekst bilan `max`'dagi o'sha modeldan yaxshiroq** ishlaydi — chunki qo'shimcha fikrlash byudjeti sessiya allaqachon bilishi kerak bo'lgan holatni qaytadan tiklashga sarflanadi.

> 🧠 **Amaliy qoida:** kerak bo'lmasligi kerakdek tuyulgan vazifada `max`'ga qo'l cho'zayotgan bo'lsangiz, taxminan 80% holatda yechim "yuqorida" — aniqroq `CLAUDE.md`, ravshanroq reja, noaniqliksiz atomik topshiriqlar — modelning qanchalik qattiq o'ylashida emas.

`High`'da bemalol ishlab, `medium`'da buzilib ketadigan loyiha sizga model haqida emas, **kontekst sozlamangiz** haqida gapiryapti.

---
<br/>

## 🛠️ Effortni qanday o'zgartirish

Doimiylik darajasi bo'yicha, kamdan-ko'pga:

- **Bir turn uchun:** prompt'ga `ultrathink` so'zini qo'shing.
  > ⚠️ Diqqat: bu o'sha turn uchun effortni `high`'ga o'rnatadi (CLI oynasi ham "setting effort to high for this turn" deb yozadi). Ya'ni siz `xhigh` yoki `max`'da bo'lsangiz, bu aslida **pasayish** — `ultrathink` `max`'gacha ko'tarmaydi (ma'lum xato).
- **Bir sessiya uchun:** chatda `/effort <daraja>`, yoki ishga tushirishda `claude --effort <daraja>`.
- **Sessiyalararo doimiy** (`low`/`medium`/`high`/`xhigh`): `~/.claude/settings.json` ga `"effortLevel": "high"` qo'shing.
- **`max` uchun doimiy:** faqat `CLAUDE_CODE_EFFORT_LEVEL=max` muhit o'zgaruvchisi (env var) orqali. `settings.json`'da `max` UI bilan ishlaganda jimgina pasayadi (ma'lum xato). Maslahat: `CLAUDE_CODE_EFFORT_LEVEL=high` ni shell profilingizga (`.zshrc`/`.bashrc`) yozib qo'ying.

> `/effort` ni argumentsiz yozsangiz — interaktiv slider ochiladi. `/effort auto` esa model standartiga qaytaradi.

> 🐛 **Bir tuzoq:** `settings.json`'da `medium` qo'ygan bo'lsangiz ham, yangi sessiya kuchliroq darajada ochilishi mumkin — yangi model birinchi ishga tushganda qo'lda o'rnatilgan effortni o'z standartiga override qiladi. Bunday holda `/effort` orqali qayta sozlang.

---
<br/>

## 🧭 Xulosa

- Darajalar 5 ta: `low → medium → high → xhigh → max`. "Hamma narsa uchun `max`" — kamdan-kam to'g'ri yechim.
- Standart darajangizni biling: Opus 4.8 hamma joyda `high`, lekin **kod va agentic ish uchun `xhigh`dan boshlang**.
- Eng kuchli naqsh: rejani Opus bilan tuzib, ijroni Sonnet'ga arzonroq effortda topshirish.
- `max`'ga shoshilishdan oldin **kontekstingizni** yaxshilang — ko'pincha muammo modelda emas, biz bergan ma'lumotda.

> ❤️ Foydali bo'lsa, ulashing. Boshqalarga ham ilhom bo'lsin.

<br/>

> 🙌 Ushbu maqola jamoaning birgalikdagi kuzatuvlari, rasmiy hujjatlar va amaliyotdan yig'ilgan. Modellar va standartlar tez o'zgaradi — takliflar va to'g'rilashlar mamnuniyat bilan qabul qilinadi.

{% nextpost slug="tez-kod-yetkazish" %}
