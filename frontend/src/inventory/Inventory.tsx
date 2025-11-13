import { useEffect, useRef, useState } from 'react';
import * as api from '../shared/api';
import { BottomSheet, BottomSheetRef } from '../shared/bottom-sheet/BottomSheet';
import { PageShell } from '../shared/page/PageShell';
import { BarcodeScannerToggle } from './barcode-scanner-toggle/BarcodeScannerToggle';
import { InventoryItemDetail } from './detail/InventoryItemDetail';
import { InventoryItem } from './inventory-items/card/inventory-item';
import { InventoryItemGrid } from './inventory-items/InventoryItemGrid';
import { ProductNameInput } from './product-name-input/ProductNameInput';

import styles from './Inventory.module.css';

export function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const detailSheetRef = useRef<BottomSheetRef>(null);

  useEffect(() => {
    let alreadyFetched = false;
    getInventoryItems().then((fetchedItems) => {
      if (!alreadyFetched) setItems(fetchedItems);
    });

    return () => {
      alreadyFetched = true;
    };
  }, []);

  function editItem(item: InventoryItem) {
    setSelectedItem(item);
    detailSheetRef.current?.open();
  }

  function cancelEdit() {
    detailSheetRef.current?.close();
  }

  function productNameEntered(productName: string) {
    editItem({ productName });
  }

  async function saveItem(item: InventoryItem) {
    const savedInventoryItem = await saveInventoryItem(item);
    const itemIndex = items.findIndex((i) => i.inventoryItemId === savedInventoryItem.inventoryItemId);

    if (itemIndex === -1) {
      // Item is new --> add to list
      setItems([savedInventoryItem, ...items]);
    } else {
      // Item already exists --> update in list
      const updatedItems = items.map((existingItem) =>
        existingItem.inventoryItemId === savedInventoryItem.inventoryItemId ? savedInventoryItem : existingItem,
      );

      setItems(updatedItems);
    }

    detailSheetRef.current?.close();
  }

  async function removeItem(itemToRemove: InventoryItem) {
    setItems(items.filter((item) => item !== itemToRemove));
    await removeInventoryItem(itemToRemove);
  }

  function resetSelectedItem() {
    // Reset selected item after the bottom sheet animation is over
    const animationDurationInMilliseconds = 200;
    setTimeout(() => setSelectedItem(null), animationDurationInMilliseconds);
  }

  return (
    <PageShell title="Mein Kühlschrank">
      {/* Iventory items  */}
      <InventoryItemGrid inventoryItems={items} onEditItem={editItem} onRemoveItem={removeItem} />

      {/* Manual product input  */}
      <div className={styles.productNameInput}>
        <ProductNameInput onSubmit={productNameEntered} />
      </div>

      {/* Barcode scanner button  */}
      <div className={styles.barcodeScannerToggle}>
        <BarcodeScannerToggle />
      </div>

      {/* Bottom sheet for inventory item detail */}
      <BottomSheet ref={detailSheetRef} onClose={resetSelectedItem}>
        <InventoryItemDetail inventoryItem={selectedItem} onSave={saveItem} onCancel={cancelEdit} />
      </BottomSheet>
    </PageShell>
  );
}

async function getInventoryItems() {
  const items = await api.getInventoryItems();

  return items.map<InventoryItem>((item) => ({
    inventoryItemId: item.inventoryItemId,
    productId: item.productId,
    productName: item.productName,
    brandName: item.brandName,
    quantity: item.quantity,
    imageUrl: item.imageUrl,
    bestBeforeDate: item.bestBeforeDate ? new Date(item.bestBeforeDate) : undefined,
  }));
}

async function removeInventoryItem(item: InventoryItem) {
  await api.removeInventoryItem(item.inventoryItemId!);
}

async function saveInventoryItem(item: InventoryItem) {
  const response = await api.saveInventoryItem({
    inventoryItemId: item.inventoryItemId,
    productId: item.productId,
    productName: item.productName!,
    brandName: item.brandName,
    quantity: item.quantity,
    bestBefore: item.bestBeforeDate?.toISOString(),
  });

  return {
    inventoryItemId: response.inventoryItemId,
    productId: response.productId,
    productName: response.productName,
    brandName: response.brandName,
    quantity: response.quantity,
    imageUrl: response.imageUrl,
    bestBeforeDate: response.bestBefore ? new Date(response.bestBefore) : undefined,
  } as InventoryItem;
}
