import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { ReactElement } from 'react';
import { ProductImage } from '../../../../inventory/inventory-items/card/image/ProductImage';
import { ExpirationNotice } from '../../../../inventory/inventory-items/card/expiration/ExpirationNotice';
import { InventoryItem } from '../../../../inventory/inventory-items/card/inventory-item';
import styles from './InventoryItemCard.module.css';

interface FridgeFilterIngredientCardProps {
  inventoryItem: InventoryItem;
  onItemClick: (inventoryItem: InventoryItem) => void;
}

const InventoryItemCard = ({ inventoryItem, onItemClick }: FridgeFilterIngredientCardProps): ReactElement => {
  const handleOnClick = () => {
    onItemClick(inventoryItem);
  };

  return (
    <Card size="1" className={styles.card} onClick={handleOnClick}>
      <ProductImage imageSize="2" imageUrl={inventoryItem.imageUrl} />
      <Flex direction="column" className={styles.productInformation}>
        <Flex direction="column">
          <Heading size="2" weight="medium" as="h3" className={styles.productName}>
            {inventoryItem.productName}
          </Heading>
          <Flex justify="between">
            <Text size="1" weight="light">
              {inventoryItem.brandName}
            </Text>
            <Text size="1" weight="light">
              {inventoryItem.quantity}
            </Text>
          </Flex>
        </Flex>
        <Flex justify="between">
          <ExpirationNotice textSize="1" bestBeforeDate={inventoryItem.bestBeforeDate} />
        </Flex>
      </Flex>
    </Card>
  );
};

export default InventoryItemCard;
