import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip'; // Mobil uchun Chip import qilindi
import { Map, Placemark } from '@pbe/react-yandex-maps';

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
    coordinates: [41.003768, 71.658741],
  },
  {
    icon: <BusinessRoundedIcon />,
    title: 'Ilmhub Chimgan (Toshkent)',
    description:
      'Toshkent shahridagi eng yirik filiallarimizdan biri, transport uchun qulay hududda.',
    coordinates: [41.351039, 69.352922],
    ///,
  },
  {
    icon: <LocationOnRoundedIcon />,
    title: 'Ilmhub Uychi (Namangan)',
    description:
      'Uychi tumanidagi yoshlar uchun barcha sharoitlarni yaratgan holda tashkil etilgan filial.',
    coordinates: [41.028724, 71.851263],
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
      <Map
        key={selectedItemIndex}
        state={{ center: selectedFeature.coordinates, zoom: 15 }}
        width="100%"
        height={300}
      >
        <Placemark geometry={selectedFeature.coordinates} />
      </Map>
    </Box>
  );
}

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const handleItemClick = (index: number) => setSelectedItemIndex(index);
  const selectedFeature = items[selectedItemIndex];
  const yandexTaxiLink = `https://go.yandex/route?rtext=~${selectedFeature.coordinates.join(
    ','
  )}&rtt=taxi`;

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

        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            width: { xs: '100%', md: '70%' },
          }}
        >
          <Map
            key={selectedItemIndex}
            state={{
              center: selectedFeature.coordinates,
              zoom: 15,
              controls: ['zoomControl', 'fullscreenControl'],
            }}
            width="100%"
            height={500}
            modules={['control.ZoomControl', 'control.FullscreenControl']}
          >
            <Placemark
              geometry={selectedFeature.coordinates}
              properties={{
                iconCaption: selectedFeature.title,
                balloonContentBody: `<div><strong>${selectedFeature.title}</strong><br/><a href="${yandexTaxiLink}" target="_blank">Yandex Go orqali borish</a></div>`,
              }}
              options={{ preset: 'islands#blueDotIconWithCaption' }}
            />
          </Map>
        </Box>
      </Box>
    </Container>
  );
}
