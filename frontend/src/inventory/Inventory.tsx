// import { BarcodeScannerToggle } from './barcode-scanner-toggle/BarcodeScannerToggle';
import { Product } from './product-card/product';
import { ProductCard } from './product-card/ProductCard';

import styles from './Inventory.module.css';

const products: Product[] = [
  {
    productId: 1,
    productName: 'El Tony Mate',
    brandName: 'El Tony',
    quantity: '330 ml',
    bestBeforeDate: new Date(2025, 11, 27),
    imageUrl: 'https://images.openfoodfacts.org/images/products/764/015/049/1001/front_de.38.400.jpg',
  },
  {
    productId: 2,
    productName: 'Bio - Avocat',
    brandName: 'Migros',
    quantity: '1 pièce',
    bestBeforeDate: new Date(2025, 9, 26),
    imageUrl: 'https://images.openfoodfacts.net/images/products/761/063/200/0731/front_fr.23.400.jpg',
  },
  {
    productId: 3,
    productName: 'Zero Zucker',
    brandName: 'Coca-Cola',
    quantity: '500 ml',
    bestBeforeDate: new Date(2025, 9, 20),
    imageUrl: 'https://images.openfoodfacts.net/images/products/544/900/013/1836/front_en.354.400.jpg',
  },
  {
    productId: 4,
    productName: 'El Tony Mate',
    brandName: 'El Tony',
    quantity: '330 ml',
    bestBeforeDate: new Date(2025, 11, 27),
    imageUrl: 'https://images.openfoodfacts.org/images/products/764/015/049/1001/front_de.38.400.jpg',
  },
  {
    productId: 5,
    productName: 'Bio - Avocat',
    brandName: 'Migros',
    quantity: '1 pièce',
    bestBeforeDate: new Date(2025, 9, 26),
    imageUrl: 'https://images.openfoodfacts.net/images/products/761/063/200/0731/front_fr.23.400.jpg',
  },
  {
    productId: 6,
    productName: 'Zero Zucker',
    brandName: 'Coca-Cola',
    quantity: '500 ml',
    bestBeforeDate: new Date(2025, 9, 20),
    imageUrl: 'https://images.openfoodfacts.net/images/products/544/900/013/1836/front_en.354.400.jpg',
  },
];

export function Inventory() {
  const productsNodes = products.map((product) => (
    <div className={styles.product} key={product.productId}>
      <ProductCard product={product} />
    </div>
  ));
  return <div className={styles.container}>{productsNodes}</div>;
}
