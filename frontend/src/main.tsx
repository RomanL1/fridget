import { Theme } from '@radix-ui/themes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App';
import { BarcodeScanner } from './BarcodeScanner/BarcodeScanner';

import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Theme appearance="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/scan" element={<BarcodeScanner />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  </React.StrictMode>,
);
