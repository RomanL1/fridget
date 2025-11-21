import { ReactElement, useEffect, useState } from 'react';
import * as api from '../shared/api';
import RecipeCard from './card/RecipeCard';
import { PageShell } from '../shared/components/page/PageShell';
import { Flex } from '@radix-ui/themes';
import RecipeFilter, { RecipeFilterChange, RecipeFilterType } from './filter/RecipeFilter';
import RecipeCardSkeleton from './card/RecipeCardSkeleton';

export type RecipeItem = {
  title: string;
  rating: number;
  originURL: string;
  ratingCount: number;
  imageUrl: string;
};

const RecipeView = (): ReactElement => {
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let alreadyFetched = false;

    getDailyRecipes().then((fetchedItems) => {
      if (!alreadyFetched) {
        console.log(fetchedItems);
        setRecipes(fetchedItems);
        setLoading(false);
      }
    });

    return () => {
      alreadyFetched = true;
    };
  }, []);

  const onFilterChange = (recipeFilter: RecipeFilterChange) => {
    // reset recipes
    setRecipes([]);
    setLoading(true);

    if (recipeFilter.type === RecipeFilterType.DailyHits) {
      getDailyRecipes().then((fetchedItems) => {
        setRecipes(fetchedItems);
        setLoading(false);
      });
    } else {
      getRecipes(recipeFilter.payload).then((fetchedItems) => {
        setRecipes(fetchedItems);
        setLoading(false);
      });
    }
  };

  return (
    <PageShell title={'Rezepte'}>
      <Flex direction="column" gap="5">
        <RecipeFilter onFilterChange={onFilterChange} />
        <Flex direction="row" gap="6" wrap="wrap">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <RecipeCardSkeleton loading={loading} key={i} />)
            : recipes.map((recipeItem, index) => <RecipeCard key={index} recipeItem={recipeItem} />)}
        </Flex>
      </Flex>
    </PageShell>
  );
};

const getDailyRecipes = async (): Promise<RecipeItem[]> => {
  return await api.getDailyRecipes();
};

const getRecipes = async (ingredients: (string | undefined)[] | null): Promise<RecipeItem[]> => {
  return await api.getRecipes(ingredients);
};

export default RecipeView;
