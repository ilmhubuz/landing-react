import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { YMaps } from '@pbe/react-yandex-maps';
import { CircularProgress, Box } from '@mui/material';

// Lazy load components
const Home = React.lazy(() => import('./pages/Home'));
const Register = React.lazy(() => import('./pages/Register'));

// Loading component
const LoadingSpinner = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

const App = () => {
  const YANDEX_API_KEY = 'de6ad38d-cc91-43e7-9fcc-02c7aca316b5';

  return (
    <BrowserRouter>
      <YMaps query={{ apikey: YANDEX_API_KEY }}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </YMaps>
    </BrowserRouter>
  );
};

export default App;
