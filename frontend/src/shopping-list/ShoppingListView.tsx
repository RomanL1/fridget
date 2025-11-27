import { ReactElement, useState } from 'react';
import { PageShell } from '../shared/components/page/PageShell';
import { Flex } from '@radix-ui/themes';
import sampleData from './sample-data';
import CardSkeleton from './card/CardSkeleton';
import Card from './card/Card';

const COUNT_OF_SKELETON_CARDS = 4;

export type ShoppingListItem = {
  id: string;
  name: string;
  description?: string;
};

const ShoppingListView = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <PageShell title={'Rezepte'}>
      <Flex direction="row" gap="6" wrap="wrap">
        {loading
          ? Array.from({ length: COUNT_OF_SKELETON_CARDS }).map((_, i) => <CardSkeleton loading={loading} key={i} />)
          : sampleData.map((item) => <Card key={item.id} shoppingListItem={item} />)}
      </Flex>
    </PageShell>
  );
};

export default ShoppingListView;
