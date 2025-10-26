import { custom, fresh, pastExpiration, soonExpiring } from './fixtures/inventory-items';
import { InventoryItem } from './inventory-item/inventory-item';
import { InventoryItemCard } from './inventory-item/InventoryItemCard';

export function Inventory() {
  return (
    <div style={{ padding: '3rem', display: 'flex', alignContent: 'start', gap: '2rem', flexWrap: 'wrap' }}>
      <InventoryItems />
    </div>
  );
}

function InventoryItems() {
  const items = [fresh, soonExpiring, pastExpiration, custom];
  return items.map((item) => (
    <InventoryItemCard
      key={item.inventoryItemId}
      inventoryItem={item}
      onEditClick={() => editInventoryItem(item)}
      onRemoveClick={() => removeInventoryItem(item)}
    />
  ));
}

function editInventoryItem(item: InventoryItem) {
  console.log(item);
}

function removeInventoryItem(item: InventoryItem) {
  console.log(item);
}
