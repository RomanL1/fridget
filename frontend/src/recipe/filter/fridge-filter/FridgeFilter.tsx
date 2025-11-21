import { Flex, Popover, Text } from '@radix-ui/themes';
import { LucideSlidersHorizontal, LucideX } from 'lucide-react';
import { ReactElement, useState } from 'react';
import styles from './FridgeFilter.module.css';
import FridgeFilterPopover from './content/FridgeFilterPopover';
import { InventoryItem } from '../../../inventory/inventory-items/card/inventory-item';

interface FridgetFilterProps {
  selectedIngredients: InventoryItem[];
  onItemClick: (inventoryItem: InventoryItem) => void;
  onItemDeselect: (inventoryItem: InventoryItem) => void;
  onChange: () => void;
  onClear: () => void;
}

const FridgeFilter = ({
  selectedIngredients,
  onChange,
  onItemClick,
  onClear,
  onItemDeselect,
}: FridgetFilterProps): ReactElement => {
  const [open, setIsOpen] = useState(false);

  const handleOnOpenChange = (open: boolean) => {
    setIsOpen(open);

    // if modal is not open filter should fire change to reload data based on selected ingredients
    if (!open) {
      onChange();
    }
  };

  const selectedIngredientsInline = selectedIngredients
    .map((selectedItem: InventoryItem) => selectedItem.productName)
    .join(', ');

  return (
    <Popover.Root open={open} onOpenChange={handleOnOpenChange}>
      <Flex align="center" gap="2">
        <Popover.Trigger>
          <Flex gap="2" width="100%">
            <LucideSlidersHorizontal />
            <Text size="3" weight="bold">
              {selectedIngredients.length > 0 ? selectedIngredientsInline : 'Mein Kühlschrank'}
            </Text>
          </Flex>
        </Popover.Trigger>
        {selectedIngredients.length > 0 ? <LucideX className={styles.iconClose} onClick={onClear} /> : ''}
      </Flex>

      <Popover.Content className={styles.popOver} side="bottom" width="950px" maxWidth="950px">
        <FridgeFilterPopover
          selectedIngredients={selectedIngredients}
          onItemClick={onItemClick}
          onItemDeselect={onItemDeselect}
        />
      </Popover.Content>
    </Popover.Root>
  );
};

export default FridgeFilter;
