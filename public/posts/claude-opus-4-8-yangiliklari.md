# Claude Opus 4.8: yangi nima bor va nima o'zgardi? 🚀

![Claude Opus 4.8](/posts/images/opus-4-8.jpg)

2026-yil 28-mayda Anthropic o'zining eng kuchli modeli — **Claude Opus 4.8** ni chiqardi. U 4.7 asosida qurilgan, lekin kod yozish, uzoq agentic ishlar va halollikda sezilarli oldinga ketgan. Keling, barcha yangiliklarni birma-bir, sodda tilda ko'rib chiqamiz. 🧭

---
<br/>

## ⚡ Qisqacha (TL;DR)

- **Claude Opus 4.8** 2026-yil 28-mayda chiqdi — Anthropic'ning eng kuchli generatsiya modeli, 4.7 asosida.
- Standart effort endi hamma joyda **`high`** (4.7'da `xhigh` edi); kod uchun esa `xhigh` tavsiya etiladi.
- **1M token** kontekst standart, **128k** chiqish, narx 4.7 bilan bir xil.
- Yangi imkoniyatlar: suhbat o'rtasida `system` xabar, fast mode (2.5x tez, 3x arzon), prompt cache minimumi 1024 token, refusal stop details.
- Yaxshilangan: uzoq agentic kod, effort kalibrovkasi, tool chaqirish va **halollik** (o'z kod xatosini ~4 barobar ko'p topadi).

---
<br/>

## 🧠 Yangi model

Opus 4.8 — murakkab fikrlash, uzoq muddatli agentic kod va yuqori avtonomli ishlar uchun mo'ljallangan. Asosiy texnik xususiyatlar:

| Xususiyat | Qiymat |
|-----------|--------|
| Model ID | `claude-opus-4-8` |
| Kontekst oynasi | **1M token** (Microsoft Foundry'da 200k) |
| Maksimal chiqish | 128k token |
| Fikrlash rejimi | Adaptive thinking |
| Narx | $5 / 1M kirish, $25 / 1M chiqish (4.7 bilan bir xil) |

Tool'lar va platforma imkoniyatlari to'plami 4.7'dagidek — ya'ni 4.7 uchun yozilgan kodingiz deyarli o'zgarishsiz ishlaydi.

---
<br/>

## ✨ Yangi imkoniyatlar

### 🗨️ Suhbat o'rtasida `system` xabar
Endi `messages` massivida foydalanuvchi xabaridan keyin `role: "system"` xabar yuborish mumkin. Ya'ni butun system promptni qaytadan yozmasdan, uzoq suhbat o'rtasida modelga yangi ko'rsatma qo'shasiz. Bu **prompt cache**'ni buzmaydi va agentic looplarda kirish xarajatini kamaytiradi.

### 🎚️ Effort standarti — endi `high`
Opus 4.8 hamma joyda (Claude API va Claude Code) standart `high` effortda ishlaydi. Agar siz effortni qo'lda o'rnatgan bo'lsangiz — sozlamangiz o'zgarmaydi.

> 💡 4.8 ning `high`'i 4.7 ning standartiga yaqin token sarflab, har bir kod benchmarkida undan yaxshiroq ishlaydi. Effort darajalari haqida batafsil [alohida maqolamiz bor](/posts/claude-code-effort-darajalari).

### ⚡ Fast mode
`speed: "fast"` bilan o'sha modeldan **2.5 barobargacha** ko'proq token/soniya tezligini olasiz (premium narxda). Hozircha API'da research preview, va avvalgi modellarning fast mode'iga qaraganda **3 barobar arzonroq**.

### 💾 Prompt cache minimumi pasaydi
Cache uchun minimal prompt uzunligi endi atigi **1024 token** (4.7'da kattaroq edi). Ya'ni avval cache'ga tushmaydigan qisqa promptlar endi hech qanday kod o'zgarishisiz cache'lanadi.

### 🛑 Refusal stop details
Model so'rovni rad etganda, `stop_details` obyekti rad etishning **turini** (kategoriyasini) ham qaytaradi. Bu ilovangizga turli rad etishlarni ajratib, foydalanuvchini to'g'ri keyingi qadamga yo'naltirish imkonini beradi.

---
<br/>

## ⚙️ API cheklovlari (4.7 dan meros)

Bular yangi cheklov emas — 4.7'dan o'zgarishsiz keldi, shuning uchun 4.7'da ishlaydigan kod 4.8'da ham ishlayveradi:

- `temperature`, `top_p`, `top_k` ni standartdan boshqa qiymatga qo'ysangiz — **400 xato**. Ularni umuman bermang, model xulqini prompt orqali boshqaring.
- Qo'lda fikrlash byudjeti (`budget_tokens`) qo'llanmaydi — faqat **adaptive thinking**:

```python
# Avval (Opus 4.6 va undan oldin)
thinking = {"type": "enabled", "budget_tokens": 32000}

# Endi (Opus 4.7 va keyin)
thinking = {"type": "adaptive"}
output_config = {"effort": "high"}
```

---
<br/>

## 📈 Nimasi yaxshilangan?

4.7 bilan solishtirganda 4.8 quyidagilarga urg'u beradi:

- **Uzoq agentic kod** — uzun kontekstni yaxshiroq ushlaydi, kamroq "compaction" qiladi va compaction'dan keyin yo'qotmasdan davom etadi.
- **Effort kalibrovkasi** — har bir effort darajasida xulq ishonchliroq va bashoratliroq.
- **Tool chaqirishni "unutmaslik"** — vazifa talab qilgan tool chaqiruvini o'tkazib yuborish holatlari kamaygan (4.7'da ba'zi foydalanuvchilar shikoyat qilgandi).
- **Adaptive thinking** — model faqat kerak bo'lgandagina o'ylaydi: oddiy so'rovga to'g'ridan-to'g'ri javob beradi, murakkab masala oldidan fikrlaydi. Natijada bir xil effortda behuda "fikrlash tokenlari" kamayadi.

> 🏆 **Raqamlarda:** 4.8 ko'pchilik benchmarkda GPT-5.5 va Gemini 3.1 Pro'ni ortda qoldiradi, o'z kodidagi xatolarni ~4 barobar ko'p ilg'aydi, ortiqcha ishonch (overconfidence) 10 barobardan ortiq kamaygan, noto'g'ri natijani tanqidsiz "to'g'ri" deb taqdim etish esa — 0%.

---
<br/>

## 🔁 4.7 dan 4.8 ga o'tish

Bular API'ni buzuvchi o'zgarishlar emas, lekin promptlaringizni biroz moslashtirishingiz kerak bo'lishi mumkin — masalan, bir xil effortda model kamroq "o'ylaydi", shuning uchun murakkab masalada effortni oshirish foydali. Claude Code yoki Agent SDK ishlatsangiz, **"Claude API" skill** bu o'tish qadamlarini kodingizga avtomatik qo'llab beradi.

---
<br/>

## 🧭 Xulosa

- Opus 4.8 — Anthropic'ning hozirgi eng kuchli modeli; standart effort `high`, kod uchun `xhigh`.
- Eng katta yutuqlar: uzoq agentic kod, ishonchli effort, kamroq behuda fikrlash va sezilarli **halollik** yaxshilanishi.
- 4.7 kodingiz o'zgarishsiz ishlaydi — faqat fikrlash va tool xulqidagi nozik o'zgarishlarga e'tibor bering.
- 1M kontekst standart, fast mode esa tezroq va arzonroq bo'ldi.

> ❤️ Foydali bo'lsa, ulashing. Boshqalarga ham ilhom bo'lsin.

<br/>

> 🙌 Manba: Anthropic'ning rasmiy hujjatlari (platform.claude.com). Modellar tez yangilanadi — ushbu maqola 2026-yil may holatiga ko'ra tayyorlangan.

{% nextpost slug="claude-code-effort-darajalari" %}
