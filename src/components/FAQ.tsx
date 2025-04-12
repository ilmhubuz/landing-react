import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(
        isExpanded
          ? [...expanded, panel]
          : expanded.filter((item) => item !== panel),
      );
    };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: 'text.primary',
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        Ko&apos;p so&apos;raladigan savollar
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Accordion
          expanded={expanded.includes('panel1')}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography component="span" variant="subtitle2">
              Kurslar haqida to&apos;liq ma&apos;lumotni qanday olish mumkin?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              <Link href="tel:+998906915060">90 691 50 60</Link>
              &nbsp;raqamiga qo&apos;ng&apos;iroq qiling yoki telegram orqali <Link href="https://t.me/ilmhubnamangan">ilmhubnamangan</Link>&nbsp;
              hisobiga yozing, sizga tezkor ma&apos;lumot beramiz.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded.includes('panel1')}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography component="span" variant="subtitle2">
              Kurslar narxi qancha?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              Kurslar narxi yo&apos;nalish va filialga qarab farqlanadi. Narxlar bilan tanishish uchun <Link href="tel:+998906915060">90 691 50 60</Link>&nbsp;raqamiga qo&apos;ng&apos;iroq qiling.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded.includes('panel2')}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography component="span" variant="subtitle2">
              Menga eng yaqin <strong>ilmhub</strong> filiali qayerda?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              Ha, biz hozirda quyidagi 3 ta manzilda zamonaviy va sifatli darslar olib boramiz:
              <Box component="ul" sx={{ pl: 2 }}>
                <li>
                  <Link href="https://yandex.uz/maps/-/CHV~z88z" target="_blank" rel="noopener">
                    ilmhub chimgan
                  </Link>
                </li>
                <li>
                  <Link href="https://yandex.uz/maps/-/CHV~zLzQ" target="_blank" rel="noopener">
                    ilmhub namangan
                  </Link>
                </li>
                <li>
                  <Link href="https://yandex.uz/maps/-/CHV~zT4r" target="_blank" rel="noopener">
                    ilmhub uychi
                  </Link>
                </li>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded.includes('panel3')}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            <Typography component="span" variant="subtitle2">
              <strong>ilmhub</strong> kurslarining boshqa kurslardan farqi nimada?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              <strong>ilmhub</strong> kurslarining farqlari:
              <Box component="ul" sx={{ pl: 2 }}>
                <li>
                  Boshqa kurslardan farqli o&apos;laroq, biz bolalar uchun stressli lug&apos;at va grammatika mashg&apos;ulotlari bilan an&apos;anaviy ingliz tilini o&apos;rgatish usulini emas, balki bolaning yoshiga mos zamonaviy dasturlarni taklif etamiz.
                </li>
                <li>
                  Ingliz tili darslari interaktiv mashg&apos;ulotlar va o&apos;yinlarga asoslangan bo&apos;lib ko&apos;rish, eshitish va gapirish oraqali Ingliz tilida ravon gapirishni o&apos;rgatamiz.
                </li>
                <li>
                  Dars rejalari bolalar psixologiyasiga asoslangan. Bizning darslarimiz AQSh va Janubiy Koreyadagi zamonaviy ta&apos;lim muassasalari dasturlari asosida tuzilgan.
                </li>
                <li>
                  IELTS va CEFR sertifikatlari yoki universitet kirish imtihonlari uchun o&apos;qiyotgan talabalar uchun, bizning yuqori malakali ustozlarimiz eng zamonaviy yondashuvni va maqsadlaringizga tezroq erishish uchun barcha qisqa yo&apos;llarni taklif etadilar.
                </li>
                <li>
                  Barcha yoshdagi bolalar uchun IT dasturlarimizga kelsak, hozirda IT sohasida bizning kurslarimizga muqobil yo&apos;q. Faqatgina biz farzandlaringizning yorqin kelajagini kafolatlaydigan eng zamonaviy dars rejalarini taklif etamiz.
                </li>
              </Box>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded.includes('panel4')}
          onChange={handleChange('panel4')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4d-content"
            id="panel4d-header"
          >
            <Typography component="span" variant="subtitle2">
              Farzandimni necha yoshdan kurslarga bersam bo&apos;ladi?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              <li>
                  Ingliz tiliga 5-6 yoshdan boshlab dasturlarimiz mavjud.
              </li>
              <li>
                  IT (dasturlash) uchun farzandingizni 8 yoshdan qabul qilamiz.
              </li>
              Qabul qilishda farzandingizni maktabgacha bo&apos;lgan ta&apos;lim bilimlari va iqtidori hisobga olib darslarga tayyor yoki yo&apos;q ekanligini aniqlanadi.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded.includes('panel5')}
          onChange={handleChange('panel5')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5d-content"
            id="panel5d-header"
          >
            <Typography component="span" variant="subtitle2">
              Nega farzandimni IT (dasturlash)ga berishim kerak?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              IT sohasini o&apos;rganish farzandingizga quyidagi imkoniyatlarni beradi:
              <Box component="ul" sx={{ pl: 2 }}>
                <li>
                  Uyida o&apos;tirib O&apos;zbekiston va chet el kompaniyalarida yaxshi daromad bilan ishlash imkoniyatiga ega bo&apos;ladi
                </li>
                <li>
                  Texnologiyaga qaramlikdan qutuladi, aksincha dasturlar orqali texnologiyani boshqarishni o&apos;rganadi
                </li>
                <li>
                  Istalgan sohada, xoh bank bo&apos;lsin, xoh boshqa yo&apos;nalish - eng oldi kadr bo&apos;lib ishlash imkoniyatiga ega bo&apos;ladi
                </li>
              </Box>
              Buning ahamiyatini davlatimiz ham tan olgan bo&apos;lib, Prezidentimiz ITni keng tarqatish uchun maxsus qarorlar chiqarmoqda.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
