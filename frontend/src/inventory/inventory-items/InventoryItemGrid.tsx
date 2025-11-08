import { InventoryItem } from './card/inventory-item';
import { InventoryItemCard } from './card/InventoryItemCard';

import styles from './InventoryItemGrid.module.css';

interface InventoryItemGridProps {
  inventoryItems: InventoryItem[];
  onEditItem: (item: InventoryItem) => void;
  onRemoveItem: (item: InventoryItem) => void;
}

export function InventoryItemGrid({ inventoryItems, onEditItem, onRemoveItem }: InventoryItemGridProps) {
  return (
    <div className={styles.grid}>
      <InventoryItemList inventoryItems={inventoryItems} onEditItem={onEditItem} onRemoveItem={onRemoveItem} />
    </div>
  );
}

function InventoryItemList({ inventoryItems, onEditItem, onRemoveItem }: InventoryItemGridProps) {

  // TODO: for testing purposes to generate scrollable content
  const _inventoryItems = Array(4).fill(inventoryItems).flat();

  return _inventoryItems.map((item) => (
    <InventoryItemCard
      key={item.inventoryItemId}
      inventoryItem={item}
      onEditClick={() => onEditItem(item)}
      onRemoveClick={() => onRemoveItem(item)}
    />
  ));
}
