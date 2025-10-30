import { InventoryItem } from '../../inventory/inventory-items/card/inventory-item';

const fresh: InventoryItem = {
  productId: 1,
  inventoryItemId: 1,
  productName: 'El Tony Mate',
  brandName: 'El Tony',
  quantity: '330 ml',
  bestBeforeDate: new Date(2025, 11, 27),
  imageUrl: 'https://images.openfoodfacts.org/images/products/764/015/049/1001/front_de.38.400.jpg',
};

const custom: InventoryItem = {
  productId: 2,
  inventoryItemId: 2,
  productName: 'Schokokuchen (Selbstgebacken)',
  quantity: '2 Stk.',
  // bestBeforeDate: new Date(2025, 11, 27),
};

const soonExpiring: InventoryItem = {
  productId: 3,
  inventoryItemId: 3,
  productName: 'Champignons Bio braun',
  brandName: 'Naturaplan',
  quantity: '250 g',
  bestBeforeDate: new Date(2025, 9, 28),
  imageUrl: 'https://images.openfoodfacts.org/images/products/762/753/580/1761/front_en.4.400.jpg',
};

const pastExpiration: InventoryItem = {
  productId: 4,
  inventoryItemId: 4,
  productName: 'Kochbutter',
  brandName: 'BO Butter GmbH',
  quantity: '250 g',
  bestBeforeDate: new Date(2025, 9, 21),
  imageUrl: 'https://images.openfoodfacts.net/images/products/761/012/873/7127/front_en.91.400.jpg',
};

export const sampleInventoryItems = [fresh, custom, pastExpiration, soonExpiring];
