import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { BarcodeScanner } from './barcode-scanner/BarcodeScanner';
import { Inventory } from './inventory/Inventory';
import './main.css';
import RecipeView from './recipe/RecipeView';
import MainLayout from './MainLayout';
import { authenticate } from './shared/auth';
import ShoppingListView from './shopping-list/ShoppingListView';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider attribute="class">
    <Theme>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Inventory />} />
            <Route path="shopping-list" element={<ShoppingListView />} />
            <Route path="recipes" element={<RecipeView />} />
          </Route>
          <Route path="/scan" element={<BarcodeScanner />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  </ThemeProvider>,
);

await authenticate();
