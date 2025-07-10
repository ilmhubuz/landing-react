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
      <Box sx={{ display: 'flex', gap: 1, overflow: 'auto', pb: 1.5 }}>
        {items.map(({ title }, index) => (
          <Chip
            key={index}
            label={title}
            onClick={() => handleItemClick(index)}
            variant={selectedItemIndex === index ? 'filled' : 'outlined'}
            color={selectedItemIndex === index ? 'primary' : 'default'}
          />
        ))}
      </Box>
      {/* Mobil uchun xarita */}
      {selectedFeature.mapIframeSrc && (
        <iframe
          src={selectedFeature.mapIframeSrc}
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen={true}
          aria-hidden="false"
          tabIndex={0}
          title={`Map for ${selectedFeature.title}`}
          loading="lazy"
        ></iframe>
      )}
      {/* Mobil uchun baholash vidjeti */}
      {selectedFeature.ratingIframeSrc && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <iframe
            src={selectedFeature.ratingIframeSrc}
            width="150"
            height="50"
            style={{ border: 0 }}
            title={`Rating for ${selectedFeature.title}`}
            loading="lazy"
          ></iframe>
        </Box>
      )}
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
          <MobileLayout
            selectedItemIndex={selectedItemIndex}
            handleItemClick={handleItemClick}
          />
        </Box>

        {/* Desktop uchun xarita va baholash vidjeti */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column', // Add column direction for map and rating
            width: { xs: '100%', md: '70%' },
            gap: 2, // Gap between map and rating
          }}
        >
          {selectedFeature.mapIframeSrc && (
            <iframe
              src={selectedFeature.mapIframeSrc}
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen={true}
              aria-hidden="false"
              tabIndex={0}
              title={`Map for ${selectedFeature.title}`}
              loading="lazy"
            ></iframe>
          )}
          {selectedFeature.ratingIframeSrc && (
            <Box sx={{ alignSelf: 'flex-end' }}>
              {' '}
              <iframe
                src={selectedFeature.ratingIframeSrc}
                width="150"
                height="50"
                style={{ border: 0 }}
                title={`Rating for ${selectedFeature.title}`}
                loading="lazy"
              ></iframe>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}
