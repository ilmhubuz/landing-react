import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Container,
  Typography,
  Button,
  Box,
  Stack,
  Link,
} from '@mui/material';
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  Call as CallIcon,
} from '@mui/icons-material';
import AppTheme from '../theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Helmet>
        <title>404 - Sahifa topilmadi - Ilmhub</title>
        <meta name="description" content="Kechirasiz, siz qidirayotgan sahifa topilmadi. Ilmhub bosh sahifasiga qaytishingiz mumkin." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://ilmhub.uz/404" />
      </Helmet>
      
      <Box
        sx={(theme) => ({
          width: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
          ...theme.applyStyles('dark', {
            backgroundImage:
              'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
          }),
        })}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
            textAlign: 'center',
          }}
        >
          <Stack
            spacing={4}
            useFlexGap
            sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
          >
            {/* Main 404 Display */}
            <Typography
              variant="h1"
              sx={{
                fontSize: 'clamp(4rem, 15vw, 8rem)',
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 2,
              }}
            >
              404
            </Typography>
            
            <Typography
              variant="h2"
              sx={{
                fontSize: 'clamp(2rem, 8vw, 3rem)',
                mb: 2,
              }}
            >
              Sahifa topilmadi
            </Typography>
            
            <Typography
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                width: { sm: '100%', md: '80%' },
                fontSize: '1.1rem',
                mb: 4,
              }}
            >
              Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki o'chirilgan bo'lishi mumkin. 
              URL manzilini tekshiring yoki&nbsp;
              <Link
                href="/"
                sx={(theme) => ({
                  fontSize: 'inherit',
                  fontWeight: 'bold',
                  color: 'primary.main',
                  ...theme.applyStyles('dark', {
                    color: 'primary.light',
                  }),
                })}
              >
                ilmhub
              </Link>
              &nbsp;bosh sahifasiga qaytishingiz mumkin.
            </Typography>

            {/* Helpful Links */}
            <Box sx={{ mt: 6, pt: 4, borderTop: 1, borderColor: 'divider', width: '100%' }}>
              <Typography
                variant="h6"
                sx={{ mb: 3, color: 'text.secondary', fontWeight: 'medium' }}
              >
                Foydali havolalar
              </Typography>
              
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={3} 
                sx={{ justifyContent: 'center', flexWrap: 'wrap' }}
              >
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => { navigate('/'); setTimeout(() => window.location.hash = '#faq', 100); }}
                  sx={{ textTransform: 'none', fontSize: '1rem' }}
                >
                  Ko'p so'raladigan savollar
                </Button>
                
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => { navigate('/'); setTimeout(() => window.location.hash = '#locations', 100); }}
                  sx={{ textTransform: 'none', fontSize: '1rem' }}
                >
                  Bizning manzillarimiz
                </Button>
                
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => window.location.href = '/register.html'}
                  sx={{ textTransform: 'none', fontSize: '1rem' }}
                >
                  Ro'yxatdan o'tish
                </Button>
              </Stack>
            </Box>

            {/* Contact Info */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: 'center', mt: 4 }}
            >
              Yordam kerak bo'lsa, &nbsp;
              <Link 
                href="tel:+998946715060" 
                color="primary"
                sx={{ 
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <CallIcon fontSize="small" />
                94 671 50 60
              </Link>
              &nbsp; raqamiga qo'ng'iroq qiling
            </Typography>
          </Stack>
        </Container>
      </Box>
      
      <Footer />
    </AppTheme>
  );
};

export default NotFound; 