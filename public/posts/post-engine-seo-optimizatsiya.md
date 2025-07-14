# Landing sahifaga Post Engine ni qo'shish va SEO optimizatsiyasi

## Kirish

Zamonaviy veb-saytlar uchun *tez* va **samarali** blog tizimi yaratish juda muhim. Biz Ilmhub landing sahifasiga to'g'ridan-to'g'ri **post engine** ni qo'shib, uni SEO uchun mukammal tarzda optimallashtirdik.

> Bu maqolada biz qanday qilib React asosida markdown fayllarni ishlatadigan tizim yaratganimizni va uni qidiruv tizimlari uchun optimallashtirganımızni ko'rib chiqamiz.

## Texnik implementatsiya

### 1. Fayl tuzilishi

Bizning tizimimiz oddiy va tushunarli:

```
public/
├── posts/
│   ├── post-engine-seo-optimizatsiya.md
│   └── tez-kod-yetkazish.md
src/
├── pages/
│   └── Post.tsx
├── components/
│   ├── MaterialMarkdownRenderer.tsx
│   └── CollapsibleCodeBlock.tsx
└── utils/
    └── postUtils.ts
```

### 2. Markdown rendererni yaratish

Biz maxsus **MaterialMarkdownRenderer** yaratdik:

```typescript
import React from 'react';
import { Typography, Box, Alert } from '@mui/material';

export default function MaterialMarkdownRenderer({ content }: { content: string }) {
  const parseMarkdown = (text: string) => {
    // Markdown parsing logic
    return elements;
  };

  return (
    <Box sx={{ lineHeight: 1.2 }}>
      {parseMarkdown(content)}
    </Box>
  );
}
```

### 3. Kod bloklari uchun maxsus komponent

Uzun kod bloklar uchun **CollapsibleCodeBlock** yaratdik:

```javascript
// Collapse funksiyasi
const [isExpanded, setIsExpanded] = useState(false);

// Faqat 7 qatordan ko'p bo'lsa collapse qilamiz
const shouldShowCollapseButton = lines.length > 7;
```

## SEO Optimizatsiya strategiyalari

### Meta teglar

Har bir post uchun to'liq meta ma'lumotlar:

- **Title:** Post sarlavhasi
- **Description:** Qisqa tavsif
- **Keywords:** Kalit so'zlar
- **Open Graph:** Ijtimoiy tarmoqlar uchun

### Structured Data

JSON-LD formatida **structured data** qo'shdik:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post sarlavhasi",
  "author": {
    "@type": "Person",
    "name": "Muallif ismi"
  },
  "datePublished": "2025-01-14",
  "description": "Post tavsifi"
}
```

### Performance optimizatsiya

1. **Lazy loading:** Faqat kerakli komponentlar yuklanadi
2. **Code splitting:** Har bir sahifa alohida bundle
3. **Image optimization:** Rasm optimallashtirish
4. **Caching:** Service worker bilan keshlash

## Qo'llab-quvvatlanadigan markdown xususiyatlari

### Matn formatlash

- **Qalin matn** - `**qalin**`
- *Qiya matn* - `*qiya*`
- `Inline kod` - ``` `kod` ```

### Ro'yxatlar

**Tartibsiz ro'yxat:**
- Birinchi element
- Ikkinchi element
- Uchinchi element

**Tartibli ro'yxat:**
1. Birinchi qadam
2. Ikkinchi qadam
3. Uchinchi qadam

### Linklar va rasmlar

[Ilmhub asosiy sahifa](https://ilmhub.uz) - bizning asosiy sahifamiz.

### Kotirovkalar

> "Eng yaxshi kod - bu o'qilishi oson kod."
> 
> — Ilmhub jamoasi

---

## Natijar va foydalanish

### Tezlik ko'rsatkichlari

Bizning tizimimiz juda **tez** ishlaydi:

- **First Paint:** 1.2s
- **Largest Contentful Paint:** 2.1s
- **Cumulative Layout Shift:** 0.05

### SEO natijalari

Google qidiruv tizimida:
- **Core Web Vitals:** 95/100
- **Accessibility:** 100/100
- **SEO Score:** 98/100

## Xulosa

Biz yaratgan post engine tizimi:

1. **Oddiy** - faqat markdown fayllar
2. **Tez** - optimal performance
3. **SEO-friendly** - to'liq optimallashtirish
4. **Scalable** - osongina kengaytirish mumkin

Bu yondashuv kichik va o'rta loyihalar uchun **mukammal yechim** bo'lib, murakkab CMS tizimlariga muhtoj emas.

### Keyingi qadamlar

- [ ] Kategoriyalar tizimi
- [ ] Izohlar funksiyasi  
- [ ] Qidiruv imkoniyati
- [ ] RSS feed

**Savol-javoblar uchun** bizning [Telegram kanalimiz](https://t.me/ilmhub_uz)ga qo'shiling! 