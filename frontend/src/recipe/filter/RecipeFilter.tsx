import { Flex, Text } from '@radix-ui/themes';
import { LucideFlame } from 'lucide-react';
import { ToggleGroup } from 'radix-ui';
import styles from './RecipeFilter.module.css';

import { ReactElement, useState } from 'react';
import FridgeFilter from './fridge-filter/FridgeFilter';
import { InventoryItem } from '../../inventory/inventory-items/card/inventory-item';

interface RecipeFilterProps {
  onFilterChange: (recipeFilter: RecipeFilterChange) => void;
}

export enum RecipeFilterType {
  DailyHits = 'daily-hits',
  Fridge = 'fridge',
}

export type RecipeFilterPayload = {
  [RecipeFilterType.DailyHits]: null;
  [RecipeFilterType.Fridge]: string[];
};

export type RecipeFilterChange<T extends RecipeFilterType = RecipeFilterType> = {
  type: T;
  payload: RecipeFilterPayload[T];
};

const RecipeFilter = ({ onFilterChange }: RecipeFilterProps): ReactElement => {
  const [selectedFilter, setValue] = useState('daily-hits');
  const [selectedIngredients, setSelectedIngredients] = useState<InventoryItem[]>([]);

  const handleOnChange = (value: string) => {
    // Prevent deselect of item
    if (value == '') return;

    setValue(value);

    if (value === 'daily-hits') {
      onFilterChange({
        type: RecipeFilterType.DailyHits,
        payload: null,
      });
    }
  };

  const handleOnFridgeFilterChange = () => {
    onFilterChange({
      type: RecipeFilterType.Fridge,
      payload: selectedIngredients.map((selectedItem: InventoryItem) => selectedItem.inventoryItemId!),
    });
  };

  const handleOnFridgeFilterItemClick = (inventoryItem: InventoryItem) => {
    setSelectedIngredients((prev) => [...prev, inventoryItem]);
  };

  const handleOnFridgeFilterItemDeselect = (inventoryItem: InventoryItem) => {
    setSelectedIngredients((prev) =>
      prev.filter((selectedItem: InventoryItem) => selectedItem.productId !== inventoryItem.productId),
    );
  };

  const handleOnFridgeFilterClear = () => {
    setSelectedIngredients([]);
    handleOnChange('daily-hits');
  };

  return (
    <>
      <ToggleGroup.Root type="single" value={selectedFilter} onValueChange={handleOnChange}>
        <Flex gap="4">
          <ToggleGroup.Item className={styles.filterItem} value={RecipeFilterType.DailyHits} aria-label="Left aligned">
            <Flex gap="2" width="100%" className="filterItem">
              <LucideFlame />
              <Text size="3" weight="bold">
                Tägliche Hits
              </Text>
            </Flex>
          </ToggleGroup.Item>
          <ToggleGroup.Item className={styles.filterItem} value={RecipeFilterType.Fridge}>
            <FridgeFilter
              selectedIngredients={selectedIngredients}
              onItemClick={handleOnFridgeFilterItemClick}
              onItemDeselect={handleOnFridgeFilterItemDeselect}
              onClear={handleOnFridgeFilterClear}
              onChange={handleOnFridgeFilterChange}
            />
          </ToggleGroup.Item>
        </Flex>
      </ToggleGroup.Root>
    </>
  );
};

export default RecipeFilter;
