import { InventoryItem } from '../../inventory/inventory-items/card/inventory-item';

function getTodayOffsetByDays(numberOfDays: number) {
  const result = new Date();
  result.setDate(result.getDate() + numberOfDays);
  return result;
}

const fresh: InventoryItem = {
  productId: '204047bc-306f-4867-801f-ca45c5a138bf',
  inventoryItemId: '2b63597c-abc6-440a-9ad4-999e57702a2d',
  productName: 'El Tony Mate',
  brandName: 'El Tony',
  quantity: '330 ml',
  bestBeforeDate: getTodayOffsetByDays(7),
  imageUrl: 'https://images.openfoodfacts.org/images/products/764/015/049/1001/front_de.38.400.jpg',
};

const custom: InventoryItem = {
  productId: 'c53f741c-23cc-4a8b-86a7-05c69459ef97',
  inventoryItemId: 'ee7450fd-d1a5-484a-8352-9b5972b7adb6',
  productName: 'Marmorkuchen (Selbstgebacken)',
  quantity: '2 Stk.',
  bestBeforeDate: getTodayOffsetByDays(7),
};

const soonExpiring: InventoryItem = {
  productId: 'f006c1e2-1f07-4958-8ffc-3bf69dd7f978',
  inventoryItemId: 'ba719ac7-2956-4478-89fb-e9d0800ca3f0',
  productName: 'Champignons Bio braun',
  brandName: 'Naturaplan',
  quantity: '250 g',
  bestBeforeDate: getTodayOffsetByDays(2),
  imageUrl: 'https://images.openfoodfacts.org/images/products/762/753/580/1761/front_en.4.400.jpg',
};

const pastExpiration: InventoryItem = {
  productId: '7e6cbc90-1731-46c7-a080-8027a40643be',
  inventoryItemId: 'bf9de342-8c77-4bcc-bb99-984b06ed07fd',
  productName: 'Kochbutter',
  brandName: 'BO Butter GmbH',
  quantity: '250 g',
  bestBeforeDate: getTodayOffsetByDays(-1),
  imageUrl: 'https://images.openfoodfacts.net/images/products/761/012/873/7127/front_en.91.400.jpg',
};

export const sampleInventoryItems = [fresh, custom, pastExpiration, soonExpiring];
