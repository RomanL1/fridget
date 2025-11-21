import { Box, Card, Flex, Inset, Link, Text } from '@radix-ui/themes';
import { LucideExternalLink } from 'lucide-react';
import { ReactElement } from 'react';
import { RecipeItem } from '../RecipeView';
import RecipeRating from './rating/RecipeRating';
import styles from './RecipeCard.module.css';

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
