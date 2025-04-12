import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';

export default function Home(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Hero />
      <div>
        {/* <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <Divider /> */}
        <FAQ />
        <Footer />
      </div>
    </AppTheme>
  );
}
