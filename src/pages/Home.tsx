import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
const FAQ = React.lazy(() => import('../components/FAQ'));
const Locations = React.lazy(() => import('../components/Locations'));
const GalleryCarousel = React.lazy(
  () => import('../components/GalleryCarousel')
);

export default function Home(props: { disableCustomTheme?: boolean }) {
  React.useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            const yOffset = -80;
            const y =
              el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'auto' });
          }, 400);
          el.focus?.();
        }
      }
    };
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Hero />
      <div>
        <React.Suspense fallback={<div style={{ height: '400px' }} />}>
          <GalleryCarousel />
        </React.Suspense>

        <React.Suspense fallback={<div style={{ height: '400px' }} />}>
          <Locations />
        </React.Suspense>
        <React.Suspense fallback={<div style={{ height: '400px' }} />}>
          <FAQ />
        </React.Suspense>
        <Footer />
      </div>
    </AppTheme>
  );
}
