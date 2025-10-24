// import { BarcodeScannerToggle } from './barcode-scanner-toggle/BarcodeScannerToggle';
import { Product } from './product-card/product';
import { ProductCard } from './product-card/ProductCard';

const sampleProduct: Product = {
  productName: 'El Tony Mate',
  brandName: 'El Tony',
  quantity: '330 ml',
  bestBeforeDate: new Date(2025, 9, 27),
  imageUrl: 'https://images.openfoodfacts.org/images/products/764/015/049/1001/front_de.38.400.jpg',
};

export function Inventory() {
  return (
    <div style={{ padding: '3rem' }}>
      <ProductCard product={sampleProduct} />
    </div>
  );
}
