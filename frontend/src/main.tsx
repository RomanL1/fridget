import { Theme } from '@radix-ui/themes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { BarcodeScanner } from './barcode-scanner/BarcodeScanner';
import { Inventory } from './inventory/Inventory';
import { authenticate } from './shared/auth';

import './main.css';
import Root from './Root';
import { ThemeProvider } from 'next-themes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider attribute="class">
      <Theme>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route index element={<Inventory />} />
              <Route path="recipes" />
              <Route path="grocery-list" />
            </Route>
            <Route path="/scan" element={<BarcodeScanner />} />
          </Routes>
        </BrowserRouter>
      </Theme>
    </ThemeProvider>
  </React.StrictMode>,
);

await authenticate();
