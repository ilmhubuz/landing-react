import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Typography from '@mui/material/Typography';
import ColorModeIconDropdown from '../theme/ColorModeIconDropdown';
import CallIcon from '@mui/icons-material/Call';
import Sitemark from './SitemarkIcon';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

const PhoneTypography = (
  <Link
    href="tel:+998946715060"
    underline="none"
    variant="h4"
    sx={{
      color: '#B8860B',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      mr: 4,
    }}
  >
    <CallIcon fontSize="large" />
    &nbsp;94 671 50 60
  </Link>
);

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  // 1. useNavigate hook'ini chaqiramiz
  const navigate = useNavigate();

  // 2. Tugma bosilganda ishlaydigan funksiya
  const handleNavigateToRegister = () => {
    // 3. navigate funksiyasiga o'tish kerak bo'lgan manzilni beramiz
    navigate('/regester');
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToFaq = () =>
    document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}
          >
            <Sitemark />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
                onClick={scrollToFaq}
              >
                Savollar
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {PhoneTypography}
            <Button
              onClick={handleNavigateToRegister}
              color="primary"
              variant="contained"
              size="small"
            >
              Ro'yxatdan o'tish
            </Button>
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                {/* <MenuItem>Kurslar</MenuItem>
                <MenuItem>Natijalar</MenuItem>
                <MenuItem>Ustozlar</MenuItem>
                <MenuItem>Narxlar</MenuItem> */}
                <MenuItem
                  onClick={() => {
                    scrollToFaq();
                    toggleDrawer(false)();
                  }}
                >
                  Savollar
                </MenuItem>
                {PhoneTypography}
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button
                    onClick={handleNavigateToRegister}
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    Ro'yxatdan o'tish
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
