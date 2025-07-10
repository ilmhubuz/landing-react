import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';

//import { YMaps } from 'react-yandex-maps';
import { YMaps } from '@pbe/react-yandex-maps';

const App = () => {
  const YANDEX_API_KEY = 'de6ad38d-cc91-43e7-9fcc-02c7aca316b5';
  return (
    <BrowserRouter>
      <YMaps query={{ apikey: YANDEX_API_KEY }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </YMaps>
    </BrowserRouter>
  );
};

export default App;
