import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Toaster
        position="top-center" 
        reverseOrder={false} 
      />
      <Register />
    </StyledEngineProvider>
  </React.StrictMode>
); 