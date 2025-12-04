import { ReactElement, useEffect, useRef, useState } from 'react';
import { PageShell } from '../shared/components/page/PageShell';
import { Flex, Heading, Text } from '@radix-ui/themes';
import CardSkeleton from './card/ShoppingListCardSkeleton';
import ShoppingListCard from './card/ShoppingListCard';
import { BottomSheet, BottomSheetRef } from '../shared/components/bottom-sheet/BottomSheet';
import ShoppingListItemDetail from './detail/ShoppingListItemDetail';
import { ProductNameInput } from '../shared/components/floating-input/ProductNameInput';
import * as api from '../shared/api';

const COUNT_OF_SKELETON_CARDS = 4;

export type ShoppingListItem = {
  id?: string;
  name: string;
  description?: string;
  bought: boolean;
};

const ShoppingListView = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<ShoppingListItem | null>(null);
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [boughtItems, setBoughtItems] = useState<ShoppingListItem[]>([]);
  const detailSheetRef = useRef<BottomSheetRef | null>(null);

  useEffect(() => {
    getShoppingListItems()
      .then((fetchedItems: ShoppingListItem[]) => {
        setLoading(false);

        const boughtItems: ShoppingListItem[] = [];
        const notBoughtItems: ShoppingListItem[] = [];

        for (const item of fetchedItems) {
          (item.bought ? boughtItems : notBoughtItems).push(item);
        }

        setItems(notBoughtItems);
        setBoughtItems(boughtItems);
      })
      .catch(() => {
        setLoading(false);
        setItems([]);
      });
  }, []);

  const handleOnClose = () => {
    setSelectedItem(null);
  };

  const handleOnSave = async (updatedItem: ShoppingListItem) => {
    const savedInventoryItem = await saveShoppingListItem(updatedItem);
    const findIndex = items.findIndex((i: ShoppingListItem) => i.id === savedInventoryItem.id);

    if (findIndex === -1) {
      setItems([savedInventoryItem, ...items]);
    } else {
      const updatedItems = items.map((i: ShoppingListItem) => (i.id === savedInventoryItem.id ? updatedItem : i));
      setItems(updatedItems);
    }

    detailSheetRef.current?.close();
  };

  const handleOnCacnel = () => {
    detailSheetRef.current?.close();
    setSelectedItem(null);
  };

  const handleOnEditClick = (item: ShoppingListItem) => {
    setSelectedItem(item);
    detailSheetRef.current?.open();
  };

  const handleOnClick = (clickedItem: ShoppingListItem) => {
    toggleBoughtStatusShoppingListItem(clickedItem.id!);

    clickedItem.bought = true;
    const updatedItems = items.filter((item: ShoppingListItem) => item.id != clickedItem.id);
    const updatedBoughtItems = [clickedItem, ...boughtItems];

    setItems(updatedItems);
    setBoughtItems(updatedBoughtItems);
  };

  const handleOnBoughtClick = (clickedItem: ShoppingListItem) => {
    toggleBoughtStatusShoppingListItem(clickedItem.id!);

    clickedItem.bought = false;

    const updatedBoughtItems = boughtItems.filter((item: ShoppingListItem) => item.id != clickedItem.id);
    const updatedItems = [...items, clickedItem];

    setItems(updatedItems);
    setBoughtItems(updatedBoughtItems);
  };

  const handleOnCreateItem = (enteredName: string) => {
    handleOnEditClick({ name: enteredName, bought: false });
  };

  const handleOnRemoveClick = (itemId: string) => {
    removeShoppingListItem(itemId);
    const updatedItems = items.filter((item: ShoppingListItem) => item.id !== itemId);
    setItems(updatedItems);
  };

  return (
    <PageShell title={'Einkaufsliste'}>
      <Flex direction="column" gap="5">
        <Flex direction="row" gap="6" wrap="wrap">
          {loading
            ? Array.from({ length: COUNT_OF_SKELETON_CARDS }).map((_, i) => <CardSkeleton loading={loading} key={i} />)
            : items.map((item) => (
                <ShoppingListCard
                  onEditClick={() => handleOnEditClick(item)}
                  onClick={() => handleOnClick(item)}
                  onRemoveClick={() => handleOnRemoveClick(item.id!)}
                  key={item.id}
                  shoppingListItem={item}
                />
              ))}
        </Flex>
        {boughtItems.length > 0 ? (
          <>
            <Heading size="4">Zuletzt verwendet</Heading>
            <Flex direction="row" gap="6">
              {boughtItems.map((item) => (
                <ShoppingListCard onClick={() => handleOnBoughtClick(item)} key={item.id} shoppingListItem={item} />
              ))}
            </Flex>
          </>
        ) : (
          ''
        )}
      </Flex>
      <ProductNameInput onSubmit={handleOnCreateItem} />
      <BottomSheet ref={detailSheetRef} onClose={handleOnClose}>
        <ShoppingListItemDetail onSave={handleOnSave} onCancel={handleOnCacnel} selectedItem={selectedItem} />
      </BottomSheet>
    </PageShell>
  );
};

const getShoppingListItems = async (): Promise<ShoppingListItem[]> => {
  return await api.getShoppingListItems();
};

const saveShoppingListItem = async (item: ShoppingListItem): Promise<ShoppingListItem> => {
  return await api.saveShoppingListItem(item);
};

const removeShoppingListItem = async (itemId: string): Promise<ShoppingListItem> => {
  return await api.removeShoppingListItem(itemId);
};

const toggleBoughtStatusShoppingListItem = async (itemId: string): Promise<ShoppingListItem> => {
  return await api.toggleBoughtStatusShoppingListItem(itemId);
};

export default ShoppingListView;
