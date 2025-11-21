import { Box, Card, Flex, Inset, Link, Skeleton, Text } from '@radix-ui/themes';
import { ReactElement, useState } from 'react';
import styles from './RecipeCard.module.css';
import { LucideExternalLink } from 'lucide-react';
import RecipeRating from './rating/RecipeRating';
import { RecipeItem } from '../RecipeView';

interface RecipeCardProps {
  recipeItem: RecipeItem;
}

const RecipeCard = ({ recipeItem }: RecipeCardProps): ReactElement => {
  return (
    <Box width="350px">
      <Flex direction="column">
        <Card size="2">
          <Inset clip="padding-box" side="top" mb="3">
            <img className={styles.cardImage} src={recipeItem.imageUrl} />
          </Inset>
          <Text as="p" size="4" mb="1" truncate={true}>
            <strong>{recipeItem.title}</strong>
          </Text>
          <Link href={recipeItem.originURL} size="3" target="_blank">
            <Flex gap="2" align="center">
              Zum Rezept
              <LucideExternalLink />
            </Flex>
          </Link>
          <RecipeRating rating={recipeItem.rating} ratingCount={recipeItem.ratingCount} className={styles.rating} />
        </Card>
      </Flex>
    </Box>
  );
};
export default RecipeCard;
