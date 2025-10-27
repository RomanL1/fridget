import { Heading } from '@radix-ui/themes';
import { InventoryItem } from '../inventory-items/card/inventory-item';

interface InventoryItemDetailProps {
  inventoryItem: InventoryItem | null;
}

export function InventoryItemDetail({ inventoryItem }: InventoryItemDetailProps) {
  if (!inventoryItem) {
    return <></>;
  }

  return <Heading>{inventoryItem.productName}</Heading>;
}
