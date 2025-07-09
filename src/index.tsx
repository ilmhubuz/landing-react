import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <StyledEngineProvider injectFirst>
        <Toaster
          position="top-center" 
          reverseOrder={false} 
        />
        <App />
      </StyledEngineProvider>
    </HelmetProvider>
  </React.StrictMode>
);
