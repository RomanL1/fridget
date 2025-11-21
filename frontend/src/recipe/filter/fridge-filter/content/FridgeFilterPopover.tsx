import { Flex, Text } from '@radix-ui/themes';
import { ReactElement, useEffect, useState } from 'react';
import styles from './FridgeFilterPopover.module.css';
import InventoryItemGrid from './InventoryItemGrid.tsx';
import { sampleInventoryItems } from '../../../../shared/fixtures/inventory-items.ts';
import { InventoryItem } from '../../../../inventory/inventory-items/card/inventory-item.ts';
import * as api from '../../../../shared/api';

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
  const [selectableItems, setSelectableItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    getInventoryItems().then((fetchedItems) => {
      const filteredItems = fetchedItems.filter((item: InventoryItem) => {
        if (selectedIngredients.length < 1) return true;
        selectedIngredients.every(
          (selectedItem: InventoryItem) => selectedItem.inventoryItemId !== item.inventoryItemId,
        );
      });
      setSelectableItems(filteredItems);
    });
  }, []);

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

const getInventoryItems = async (): Promise<InventoryItem[]> => {
  const items = await api.getInventoryItems();

  return items.map<InventoryItem>((item) => ({
    inventoryItemId: item.inventoryItemId,
    productId: item.productId,
    productName: item.productName,
    brandName: item.brandName,
    quantity: item.quantity,
    imageUrl: item.imageUrl,
    bestBeforeDate: item.bestBeforeDate ? new Date(item.bestBeforeDate) : undefined,
  }));
};

export default FridgeFilterPopover;
