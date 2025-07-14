import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

interface PostsThemeProps {
  children: React.ReactNode;
}

// Original Material UI dark theme with minimal customization
const postsTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
      light: '#d0a9ff',
      dark: '#8858c8',
      contrastText: '#000000',
    },
    secondary: {
      main: '#03dac6',
      light: '#66fff9',
      dark: '#00a896',
      contrastText: '#000000',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    error: {
      main: '#cf6679',
    },
    warning: {
      main: '#ffb74d',
    },
    info: {
      main: '#81c784',
    },
    success: {
      main: '#81c784',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 300,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 300,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 500,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.66,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      textTransform: 'uppercase',
      lineHeight: 2.66,
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
  components: {
    // Use original Material UI component styles
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default function PostsTheme({ children }: PostsThemeProps) {
  return (
    <ThemeProvider theme={postsTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
} 