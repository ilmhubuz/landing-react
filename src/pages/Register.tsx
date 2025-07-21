import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import AppTheme from '../theme/AppTheme';
import RegisterCard from '../components/RegisterCard';
import Content from '../components/RegisterFeatures';

type RegisterPageProps = {
  disableCustomTheme?: boolean;
};

export default function Register(props: RegisterPageProps) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <Box
        sx={{
          position: 'fixed',
          top: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          p: { xs: 1.5, sm: 2 },
          zIndex: 10,
        }}
      >
        <IconButton onClick={() => window.location.href = '/'} aria-label="orqaga qaytish">
          <ArrowBackIcon />
        </IconButton>
      </Box>

        <Stack
          direction="column"
          component="main"
          sx={[
            {
              minHeight: '100vh',
              justifyContent: 'center',
              alignItems: 'center',
            },
            (theme) => ({
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                zIndex: -1,
                inset: 0,
                backgroundImage:
                  'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
                backgroundRepeat: 'no-repeat',
                ...theme.applyStyles('dark', {
                  backgroundImage:
                    'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
                }),
              },
            }),
          ]}
        >
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              mx: 'auto',
              mb: { xs: 4, md: 0 },
            }}
          >
            <Content />
            <RegisterCard />
          </Stack>
        </Stack>
      </AppTheme>
  );
}
