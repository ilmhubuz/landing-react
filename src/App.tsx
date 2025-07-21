import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

// Lazy load components
const Home = React.lazy(() => import('./pages/Home'));
const Post = React.lazy(() => import('./pages/Post'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Redirect component for /register route
const RedirectToRegisterHtml = () => {
  React.useEffect(() => {
    window.location.replace('/register.html');
  }, []);
  return null;
};

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
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RedirectToRegisterHtml />} />
          <Route path="/posts/:slug" element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
