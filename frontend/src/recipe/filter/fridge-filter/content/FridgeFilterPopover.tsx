import { Flex, Text } from '@radix-ui/themes';
import { ReactElement } from 'react';
import styles from './FridgeFilterPopover.module.css';
import InventoryItemGrid from './InventoryItemGrid.tsx';
import { sampleInventoryItems } from '../../../../shared/fixtures/inventory-items.ts';
import { InventoryItem } from '../../../../inventory/inventory-items/card/inventory-item.ts';

interface FridgeFilterPopoverProps {
  selectedIngredients: InventoryItem[];
  onItemClick: (inventoryItem: InventoryItem) => void;
  onItemDeselect: (inventoryItem: InventoryItem) => void;
}

const FridgeFilterPopover = ({
  selectedIngredients,
  onItemClick,
  onItemDeselect,
}: FridgeFilterPopoverProps): ReactElement => {
  const selectableItems = sampleInventoryItems.filter((item: InventoryItem) => {
    if (selectedIngredients.length < 1) return true;
    return selectedIngredients.every((selectedItem: InventoryItem) => selectedItem.productId !== item.productId);
  });

  return (
    <Flex p="5" direction="column" width="100%" gap="6" className={styles.container}>
      <Flex p="5" gap="5" align="center" direction="column" className={styles.dropzone} wrap="nowrap">
        <Text size="5" weight="bold">
          Ausgewählte Zutaten ({selectedIngredients.length} / 3)
        </Text>
        {selectedIngredients.length > 0 ? (
          <InventoryItemGrid inventoryItems={selectedIngredients} onItemClick={onItemDeselect} />
        ) : (
          <Text size="3" weight="bold">
            Keine Zutaten ausgewählt
          </Text>
        )}
      </Flex>
      <Flex gap="4" direction="column">
        <Text size="5" weight="bold">
          Wähle Zutaten aus deinem Kühlschrank
        </Text>
        {selectableItems.length > 0 ? (
          <InventoryItemGrid inventoryItems={selectableItems} onItemClick={onItemClick} />
        ) : (
          'Keine Zutaten im Kühlschrank vorhanden'
        )}
      </Flex>
    </Flex>
  );
};
export default FridgeFilterPopover;
