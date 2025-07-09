import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Toaster
        position="top-center" // Bildirishnomalar yuqori markazda chiqadi
        reverseOrder={false} // Standart ketma-ketlik
      />
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);
