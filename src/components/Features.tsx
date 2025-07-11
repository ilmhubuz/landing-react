import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip'; // Mobil uchun Chip import qilindi

// Ikonkalarni import qilamiz
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';

const items = [
  {
    icon: <ApartmentRoundedIcon />,
    title: 'Ilmhub Shahar (Namangan)',
    description:
      'Namangan shahrining markazida joylashgan, barcha qulayliklarga ega zamonaviy filialimiz.',
    coordinates: [41.003768, 71.658741], // Coordinates are still useful for general reference, but won't be used by iframes
    mapIframeSrc:
      'https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=196532200053',
    ratingIframeSrc:
      'https://yandex.ru/sprav/widget/rating-badge/196532200053?type=rating&theme=dark',
  },
  {
    icon: <BusinessRoundedIcon />,
    title: 'Ilmhub Chimgan (Toshkent)',
    description:
      'Toshkent shahridagi eng yirik filiallarimizdan biri, transport uchun qulay hududda.',
    coordinates: [41.351039, 69.352922],
    mapIframeSrc:
      'https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=203336160307',
    ratingIframeSrc:
      'https://yandex.ru/sprav/widget/rating-badge/203336160307?type=rating&theme=dark',
  },
  {
    icon: <LocationOnRoundedIcon />,
    title: 'Ilmhub Uychi (Namangan)',
    description:
      'Uychi tumanidagi yoshlar uchun barcha sharoitlarni yaratgan holda tashkil etilgan filial.',
    coordinates: [41.028724, 71.851263],
    mapIframeSrc:
      'https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=134699861291',
    ratingIframeSrc:
      'https://yandex.ru/sprav/widget/rating-badge/134699861291?type=rating&theme=dark',
  },
];

export function MobileLayout({
  selectedItemIndex,
  handleItemClick,
}: {
  selectedItemIndex: number;
  handleItemClick: (index: number) => void;
}) {
  const selectedFeature = items[selectedItemIndex];

  return (
    <Box
      sx={{
        display: { xs: 'flex', sm: 'none' },
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {/* Mobil uchun filiallar ro'yxati (aylantirsa bo'ladigan Chip'lar) */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          overflowX: 'auto',
          pb: 1.5,
          '& > *': { flexShrink: 0 },
        }}
      >
        {items.map(({ title }, index) => (
          <Chip
            key={index}
            label={title}
            onClick={() => handleItemClick(index)}
            variant={selectedItemIndex === index ? 'filled' : 'outlined'}
            color={selectedItemIndex === index ? 'primary' : 'default'}
            sx={{ minWidth: 'fit-content', height: 35 }} // <-- CHIP BALANDLIGI BU YERDA O'ZGARTIRILDI
          />
        ))}
      </Box>

      {/* Mobil uchun xarita va baholash vidjeti - bir Box ichida, relative position bilan */}
      <Box
        sx={(theme) => ({
          position: 'relative', // Baholash iframesi uchun asos
          borderRadius: 2, // Cardga o'xshash border radius
          border: '1px solid', // Yupqa border
          borderColor: 'divider', // Border rangi
          overflow: 'hidden', // Radius ishlatish uchun
          // Mobil karta balandligini to'liq joylashish uchun moslashtirish
          // iframe height 250px bo'lgani uchun, boxning minimal balandligi shuni qoplab turishi kerak
          minHeight: '250px', // <-- MOBIL KARTA BALANDLIGI BU YERDA O'ZGARTIRILDI (minimal)
        })}
      >
        {selectedFeature.mapIframeSrc && (
          <iframe
            src={selectedFeature.mapIframeSrc}
            width="100%"
            height="250" // <-- MOBIL XARITA BALANDLIGI BU YERDA O'ZGARTIRILDI (300px dan 250px ga)
            frameBorder="0"
            style={{ display: 'block' }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            title={`Map for ${selectedFeature.title}`}
          ></iframe>
        )}

        {/* Mobil uchun baholash vidjeti - xarita ustida o'ng past burchakda */}
        {selectedFeature.ratingIframeSrc && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 8, // Pastdan 8px
              right: 8, // O'ngdan 8px
              zIndex: 1, // Xarita ustida turishi uchun
            }}
          >
            <iframe
              src={selectedFeature.ratingIframeSrc}
              width="150"
              height="50"
              frameBorder="0"
              style={{ border: 0 }}
              title={`Rating for ${selectedFeature.title}`}
            ></iframe>
          </Box>
        )}
      </Box>

      {/* Mobil uchun tanlangan fililaning description'i */}
      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
        {selectedFeature.description}
      </Typography>
    </Box>
  );
}

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const handleItemClick = (index: number) => setSelectedItemIndex(index);
  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box sx={{ width: { sm: '100%', md: '60%' } }}>
        <Typography component="h2" variant="h4" gutterBottom>
          Bizning Filiallarimiz
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}
        >
          O'zingizga qulay bo'lgan filialimizga tashrif buyuring. Biz sizni
          kutamiz!
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row-reverse' },
          gap: 4,
        }}
      >
        <Box sx={{ width: { xs: '100%', md: '30%' } }}>
          {/* Bu DESKTOP ro'yxati mobil'da ko'rinmaydi */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 2,
              height: '100%',
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Box
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                  (theme) => ({
                    p: 2,
                    height: '100%',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: (theme.vars || theme).palette.action
                        .hover,
                    },
                  }),
                  selectedItemIndex === index && {
                    backgroundColor: 'action.selected',
                  },
                ]}
              >
                <Box
                  sx={[
                    {
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'left',
                      gap: 1,
                      textAlign: 'left',
                      textTransform: 'none',
                      color: 'text.secondary',
                    },
                    selectedItemIndex === index && {
                      color: 'text.primary',
                    },
                  ]}
                >
                  {React.cloneElement(icon, {
                    sx: {
                      color:
                        selectedItemIndex === index
                          ? 'primary.main'
                          : 'text.secondary',
                    },
                  })}
                  <Typography variant="h6">{title}</Typography>
                  <Typography variant="body2">{description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          {/* Endi bu MobileLayout to'g'ri ishlaydi */}
          <MobileLayout
            selectedItemIndex={selectedItemIndex}
            handleItemClick={handleItemClick}
          />
        </Box>

        {/* Desktop uchun xarita va baholash vidjeti - bir Box ichida, relative position bilan */}
        <Box
          sx={(theme) => ({
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            width: { xs: '100%', md: '70%' },
            position: 'relative', // Baholash iframesi uchun asos
            borderRadius: 2, // Cardga o'xshash border radius
            border: '1px solid', // Yupqa border
            borderColor: 'divider', // Border rangi
            overflow: 'hidden', // Radius ishlatish uchun
            gap: 2, // Map va boshqa kontent orasidagi bo'shliq
          })}
        >
          {selectedFeature.mapIframeSrc && (
            <iframe
              src={selectedFeature.mapIframeSrc}
              width="100%"
              height="500"
              frameBorder="0"
              style={{ display: 'block' }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              title={`Map for ${selectedFeature.title}`}
            ></iframe>
          )}

          {/* Desktop uchun baholash vidjeti - xarita ustida o'ng past burchakda */}
          {selectedFeature.ratingIframeSrc && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 8, // Pastdan 8px
                right: 8, // O'ngdan 8px
                zIndex: 1, // Xarita ustida turishi uchun
              }}
            >
              <iframe
                src={selectedFeature.ratingIframeSrc}
                width="150"
                height="50"
                frameBorder="0"
                style={{ border: 0 }}
                title={`Rating for ${selectedFeature.title}`}
              ></iframe>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}
