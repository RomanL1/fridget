import { Card, Flex, Heading, IconButton, Text } from '@radix-ui/themes';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { ExpirationNotice } from './expiration/ExpirationNotice';
import { ProductImage } from './image/ProductImage';
import { InventoryItem } from './inventory-item';

import styles from './InventoryItemCard.module.css';

interface InventoryItemCardProps {
  inventoryItem: InventoryItem;
}

export function InventoryItemCard({ inventoryItem }: InventoryItemCardProps) {
  return (
    <Card className={styles.card}>
      <ProductImage imageUrl={inventoryItem.imageUrl} />
      <Flex direction="column" className={styles.productInformation}>
        <Flex direction="column">
          <Heading size="4" weight="medium" as="h3" className={styles.productName}>
            {inventoryItem.productName}
          </Heading>
          <Flex justify="between">
            <Text size="3" weight="light">
              {inventoryItem.brandName}
            </Text>
            <Text size="3" weight="light">
              {inventoryItem.quantity}
            </Text>
          </Flex>
        </Flex>
        <Flex justify="between">
          <ExpirationNotice bestBeforeDate={inventoryItem.bestBeforeDate} />
          <Flex className={styles.actions}>
            <IconButton variant="ghost">
              <PencilIcon />
            </IconButton>
            <IconButton variant="ghost" color="gray">
              <TrashIcon />
            </IconButton>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
