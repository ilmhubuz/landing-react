import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import Locations from '../components/Locations';

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
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
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
        <Locations />
        <FAQ />
        <Footer />
      </div>
    </AppTheme>
  );
}
