import { Box, Card as RadixCard, Flex, Text } from '@radix-ui/themes';
import { ReactElement } from 'react';
import { ShoppingListItem } from '../ShoppingListView';
import styles from './Card.module.css';

interface CardProps {
  shoppingListItem: ShoppingListItem;
}

const Card = ({ shoppingListItem }: CardProps): ReactElement => (
  <Box width="250px">
    <RadixCard size="2" className={styles.card}>
      <Flex direction="column" gap="2">
        <Text as="p" size="6" truncate={true}>
          {shoppingListItem.name}
        </Text>
        <Text as="p" size="2" truncate={true}>
          {shoppingListItem.description}
        </Text>
      </Flex>
    </RadixCard>
  </Box>
);

export default Card;
