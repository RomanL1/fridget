import { Card, Flex, Heading, IconButton, Text } from '@radix-ui/themes';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { ExpirationNotice } from './expiration/ExpirationNotice';
import { ProductImage } from './image/ProductImage';
import { Product } from './product';

import styles from './ProductCard.module.css';

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className={styles.card}>
      <ProductImage imageUrl={product.imageUrl} />
      <Flex direction="column" className={styles.productInformation}>
        <Flex direction="column">
          <Heading size="6" weight="regular" as="h3">
            {product.productName}
          </Heading>
          <Flex justify="between">
            <Text size="3" weight="light">
              {product.brandName}
            </Text>
            <Text size="3" weight="light">
              {product.quantity}
            </Text>
          </Flex>
        </Flex>
        <Flex justify="between">
          <ExpirationNotice bestBeforeDate={product.bestBeforeDate} />
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
