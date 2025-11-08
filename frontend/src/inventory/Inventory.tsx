import { useRef, useState } from 'react';
import { BottomSheet, BottomSheetRef } from '../shared/components/bottom-sheet/BottomSheet';
import { sampleInventoryItems } from '../shared/fixtures/inventory-items';
import { PageShell } from '../shared/components/page/PageShell';
import { BarcodeScannerToggle } from './barcode-scanner-toggle/BarcodeScannerToggle';
import { InventoryItemDetail } from './detail/InventoryItemDetail';
import { InventoryItem } from './inventory-items/card/inventory-item';
import { InventoryItemGrid } from './inventory-items/InventoryItemGrid';
import { ProductNameInput } from './product-name-input/ProductNameInput';

import styles from './Inventory.module.css';

export function Inventory() {
  const detailSheetRef = useRef<BottomSheetRef>(null);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  function editItem(item: InventoryItem) {
    setSelectedItem(item);
    detailSheetRef.current?.open();
  }

  function productNameEntered(productName: string) {
    editItem({ productName });
  }

  function saveItem(item: InventoryItem) {
    console.log(item);
  }

  function cancelEdit() {
    detailSheetRef.current?.close();
  }

  function resetSelectedItem() {
    // Reset selected item after the bottom sheet animation is over
    const animationDurationInMilliseconds = 200;
    setTimeout(() => setSelectedItem(null), animationDurationInMilliseconds);
  }

  return (
    <PageShell title="Mein Kühlschrank">
      {/* Iventory items  */}
      <InventoryItemGrid inventoryItems={sampleInventoryItems} onEditItem={editItem} onRemoveItem={() => {}} />

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
