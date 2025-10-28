import { Button, IconButton, Text, TextField } from '@radix-ui/themes';
import { CalendarDaysIcon } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { InventoryItem } from '../../inventory-items/card/inventory-item';
import styles from './InventoryItemDetailForm.module.css';

interface InventoryItemDetailFormProps {
  inventoryItem: InventoryItem;
  onCancel: () => void;
  onSave: (item: InventoryItem) => void;
}

export function InventoryItemDetailForm({ inventoryItem, onSave, onCancel }: InventoryItemDetailFormProps) {
  const [productName, setProductName] = useState<string>('');
  const [brandName, setBrandName] = useState<string | undefined>('');
  const [quantity, setQuantity] = useState<string | undefined>('');
  const [bestBeforeDate, setBestBeforeDate] = useState<string | undefined>('');

  useEffect(() => {
    setProductName(inventoryItem.productName);
    setBrandName(inventoryItem.brandName || '');
    setQuantity(inventoryItem.quantity || '');
    setBestBeforeDate(inventoryItem.bestBeforeDate?.toString() || '');
  }, [inventoryItem]);

  function submitForm(event: FormEvent) {
    event.preventDefault();
    onSave({
      inventoryItemId: 0,
      productName,
      brandName,
      quantity,
    });
  }

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <fieldset className={styles.fields}>
        <div className={styles.field}>
          <Text as="label" htmlFor="productName">
            Produktname
          </Text>
          <TextField.Root
            id="productName"
            size="3"
            className={styles.field}
            placeholder="Produktname"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <Text as="label" htmlFor="brandName">
            Marke
          </Text>
          <TextField.Root
            id="brandName"
            size="3"
            className={styles.field}
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <Text as="label" htmlFor="quantity">
            Menge
          </Text>
          <TextField.Root
            id="quantity"
            size="3"
            className={styles.field}
            placeholder="Menge"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <Text as="label" htmlFor="expiryDate">
            Ablaufdatum
          </Text>
          <TextField.Root
            id="expiryDate"
            size="3"
            className={styles.field}
            placeholder="Ablaufdatum"
            value={bestBeforeDate}
            onChange={(e) => setBestBeforeDate(e.target.value)}
          >
            <TextField.Slot side="right">
              <IconButton type="button" variant="ghost" color="gray">
                <CalendarDaysIcon />
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
        </div>
      </fieldset>

      <div className={styles.actions}>
        <Button type="button" variant="ghost" color="gray" onClick={() => onCancel()}>
          Abbrechen
        </Button>
        <Button type="submit">Speichern</Button>
      </div>
    </form>
  );
}
