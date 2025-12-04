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

const COUNT_OF_SKELETON_CARDS = 4;

const RecipeView = (): ReactElement => {
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let alreadyFetched = false;

    getDailyRecipes()
      .then((fetchedItems) => {
        if (!alreadyFetched) {
          setRecipes(fetchedItems);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
        setRecipes([]);
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
      getDailyRecipes()
        .then((fetchedItems) => {
          setRecipes(fetchedItems);
          setLoading(false);
        })
        .catch(() => {
          setRecipes([]);
          setLoading(false);
        });
    } else {
      getRecipes(recipeFilter.payload!)
        .then((fetchedItems) => {
          setRecipes(fetchedItems);
          setLoading(false);
        })
        .catch(() => {
          setRecipes([]);
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
            ? Array.from({ length: COUNT_OF_SKELETON_CARDS }).map((_, i) => (
                <RecipeCardSkeleton loading={loading} key={i} />
              ))
            : recipes.map((recipeItem, index) => <RecipeCard key={index} recipeItem={recipeItem} />)}
        </Flex>
      </Flex>
    </PageShell>
  );
};

const getDailyRecipes = async (): Promise<RecipeItem[]> => {
  return await api.getDailyRecipes();
};

const getRecipes = async (ingredients: string[]): Promise<RecipeItem[]> => {
  return await api.getRecipes(ingredients);
};

export default RecipeView;
