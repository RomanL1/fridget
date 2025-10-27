import { useRef, useState } from 'react';
import { BottomSheet, BottomSheetRef } from '../shared/bottom-sheet/BottomSheet';
import { sampleInventoryItems } from '../shared/fixtures/inventory-items';
import { PageShell } from '../shared/page/PageShell';
import { BarcodeScannerToggle } from './barcode-scanner-toggle/BarcodeScannerToggle';
import { InventoryItemDetail } from './detail/InventoryItemDetail';
import { InventoryItem } from './inventory-items/card/inventory-item';
import { InventoryItemGrid } from './inventory-items/InventoryItemGrid';
import { ProductNameInput } from './product-name-input/ProductNameInput';

import styles from './Inventory.module.css';

export function Inventory() {
  const sheetRef = useRef<BottomSheetRef>(null);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  function editItem(item: InventoryItem) {
    setSelectedItem(item);
    sheetRef.current?.open();
  }

  function productNameEntered(productName: string) {
    editItem({
      productName,
      inventoryItemId: 0,
    });
  }

  return (
    <PageShell title="Produktübersicht">
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

      {/* Bottom sheet for inventory item detail view */}
      <BottomSheet ref={sheetRef}>
        <InventoryItemDetail inventoryItem={selectedItem} />
      </BottomSheet>
    </PageShell>
  );
}
