import { Box, Card as RadixCard, Flex, Text, IconButton, Heading } from '@radix-ui/themes';
import { ReactElement } from 'react';
import { ShoppingListItem } from '../ShoppingListView';
import styles from './ShoppingListCard.module.css';
import { PencilIcon, TrashIcon } from 'lucide-react';

interface CardProps {
  shoppingListItem: ShoppingListItem;
  onEditClick: () => void;
  onRemoveClick: () => void;
  onClick: () => void;
}

const ShoppingListCard = ({ shoppingListItem, onEditClick, onRemoveClick }: CardProps): ReactElement => (
  <Box width="250px" onClick={onEditClick}>
    <RadixCard size="2" className={styles.card}>
      <Flex direction="column" gap="2">
        <Heading size="4" weight="medium" as="h3">
          {shoppingListItem.name}
        </Heading>
        <Flex gap="1" align="center">
          <Text as="p" size="4" truncate={true}>
            {shoppingListItem.description}
          </Text>
          <Flex gap="5" className={styles.actions}>
            <IconButton variant="ghost" onClick={onEditClick}>
              <PencilIcon width="24" height="24" />
            </IconButton>
            <IconButton variant="ghost" color="gray" onClick={onRemoveClick}>
              <TrashIcon width="24" height="24" />
            </IconButton>
          </Flex>
        </Flex>
      </Flex>
    </RadixCard>
  </Box>
);

export default ShoppingListCard;
