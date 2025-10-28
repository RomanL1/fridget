import { Heading } from '@radix-ui/themes';
import { InventoryItem } from '../inventory-items/card/inventory-item';

import styles from './InventoryItemDetail.module.css';
import { InventoryItemDetailForm } from './form/InventoryItemDetailForm';

interface InventoryItemDetailProps {
  inventoryItem: InventoryItem | null;
  onCancel: () => void;
  onSave: (item: InventoryItem) => void;
}

export function InventoryItemDetail({ inventoryItem, onSave, onCancel }: InventoryItemDetailProps) {
  if (!inventoryItem) {
    return <></>;
  }

  return (
    <div className={styles.detail}>
      <div className={styles.image} />
      <Heading as="h2">Details</Heading>

      <div className={styles.form}>
        <InventoryItemDetailForm inventoryItem={inventoryItem} onSave={onSave} onCancel={onCancel} />
      </div>
    </div>
  );
}
