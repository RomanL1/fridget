import { ReactElement } from 'react';
import sampleData from './sample-data';
import RecipeCard from './card/RecipeCard';
import { PageShell } from '../shared/components/page/PageShell';
import { Flex } from '@radix-ui/themes';
import RecipeFilter, { RecipeFilterChange } from './filter/RecipeFilter';

const RecipeView = (): ReactElement => {
  const onFilterChange = (recipeFilter: RecipeFilterChange) => {
    console.log(recipeFilter);
  };

  return (
    <PageShell title={'Rezepte'}>
      <Flex direction="column" gap="5">
        <RecipeFilter onFilterChange={onFilterChange} />
        <Flex direction="row" gap="6">
          {sampleData.map(({ imageUrl, title, rating, originURL, ratingCount }, index) => (
            <RecipeCard
              key={index}
              imageUrl={imageUrl}
              title={title}
              rating={rating}
              originUrl={originURL}
              ratingCount={ratingCount}
            />
          ))}
        </Flex>
      </Flex>
    </PageShell>
  );
};

export default RecipeView;
