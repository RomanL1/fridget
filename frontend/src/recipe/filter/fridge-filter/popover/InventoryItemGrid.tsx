import { ReactElement } from 'react';
import { InventoryItem } from '../../../../inventory/inventory-items/card/inventory-item';
import InventoryItemCard from './InventoryItemCard';
import { Flex } from '@radix-ui/themes';

interface InventoryItemGridProps {
  inventoryItems: InventoryItem[];
  onItemClick: (inventoryItem: InventoryItem) => void;
}

const InventoryItemGrid = ({ inventoryItems, onItemClick }: InventoryItemGridProps): ReactElement => (
  <Flex gap="5" wrap="wrap" align="center">
    {inventoryItems.map((inventoryItem: InventoryItem, index) => (
      <InventoryItemCard key={index} inventoryItem={inventoryItem} onItemClick={onItemClick} />
    ))}
  </Flex>
);

export default InventoryItemGrid;
