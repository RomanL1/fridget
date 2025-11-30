import { ReactElement, useRef, useState } from 'react';
import { PageShell } from '../shared/components/page/PageShell';
import { Flex } from '@radix-ui/themes';
import sampleData from './sample-data';
import CardSkeleton from './card/ShoppingListCardSkeleton';
import ShoppingListCard from './card/ShoppingListCard';
import { BottomSheet, BottomSheetRef } from '../shared/components/bottom-sheet/BottomSheet';
import ShoppingListItemDetail from './detail/ShoppingListItemDetail';
import { ProductNameInput } from '../shared/components/floating-input/ProductNameInput';

const COUNT_OF_SKELETON_CARDS = 4;

export type ShoppingListItem = {
  id?: string;
  name: string;
  description?: string;
};

const ShoppingListView = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ShoppingListItem | null>(null);
  const detailSheetRef = useRef<BottomSheetRef | null>(null);

  const handleOnClose = () => {
    setSelectedItem(null);
  };

  const handleOnSave = () => {
    detailSheetRef.current?.close();
  };

  const handleOnCacnel = () => {
    detailSheetRef.current?.close();
  };

  const handleOnEditClick = (item: ShoppingListItem) => {
    setSelectedItem(item);
    detailSheetRef.current?.open();
  };

  const handleOnClick = (item: ShoppingListItem) => {
    // TODO: Item löschen
  };

  const handleOnCreateItem = () => {};

  const handleOnRemoveClick = (item: ShoppingListItem) => {};

  return (
    <PageShell title={'Rezepte'}>
      <Flex direction="row" gap="6" wrap="wrap">
        {loading
          ? Array.from({ length: COUNT_OF_SKELETON_CARDS }).map((_, i) => <CardSkeleton loading={loading} key={i} />)
          : sampleData.map((item) => (
              <ShoppingListCard
                onEditClick={() => handleOnEditClick(item)}
                onClick={() => handleOnClick(item)}
                onRemoveClick={() => handleOnRemoveClick(item)}
                key={item.id}
                shoppingListItem={item}
              />
            ))}
      </Flex>
      <ProductNameInput onSubmit={handleOnCreateItem} />
      <BottomSheet ref={detailSheetRef} onClose={handleOnClose}>
        <ShoppingListItemDetail onSave={handleOnSave} onCancel={handleOnCacnel} selectedItem={selectedItem} />
      </BottomSheet>
    </PageShell>
  );
};

export default ShoppingListView;
