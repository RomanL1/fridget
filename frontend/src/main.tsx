import { Theme } from '@radix-ui/themes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { BarcodeScanner } from './barcode-scanner/BarcodeScanner';
import { Inventory } from './inventory/Inventory';

import './main.css';
import NavigationBar from './shared/components/navigation-bar/NavigationBar';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Theme appearance="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavigationBar />}>
            <Route path="inventory" element={<Inventory />} />
            <Route path="recipes" />
            <Route path="grocery-list" />
          </Route>
          <Route path="/scan" element={<BarcodeScanner />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  </React.StrictMode>,
);
