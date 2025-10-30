import { Button, Text, TextField } from '@radix-ui/themes';
import { CalendarDaysIcon } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { Datepicker } from '../../../shared/datepicker/Datepicker';
import { InventoryItem } from '../../inventory-items/card/inventory-item';

import styles from './InventoryItemDetailForm.module.css';

interface InventoryItemDetailFormProps {
  inventoryItem: InventoryItem;
  onCancel: () => void;
  onSave: (item: InventoryItem) => void;
}

export function InventoryItemDetailForm({ inventoryItem, onSave, onCancel }: InventoryItemDetailFormProps) {
  const [productName, setProductName] = useState<string>(inventoryItem.productName);
  const [brandName, setBrandName] = useState<string>(inventoryItem.brandName || '');
  const [quantity, setQuantity] = useState<string>(inventoryItem.quantity || '');
  const [bestBeforeDate, setBestBeforeDate] = useState<Date | null>(inventoryItem.bestBeforeDate ?? null);

  useEffect(() => {
    setProductName(inventoryItem.productName);
    setBrandName(inventoryItem.brandName || '');
    setQuantity(inventoryItem.quantity || '');
    setBestBeforeDate(inventoryItem.bestBeforeDate ?? null);
  }, [inventoryItem]);

  function submitForm(event: FormEvent) {
    event.preventDefault();
    onSave({
      inventoryItemId: 0,
      productName,
      brandName,
      quantity,
      bestBeforeDate: bestBeforeDate ?? undefined,
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
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <ExpirationDateFormField initialValue={bestBeforeDate} onChange={setBestBeforeDate} />
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

interface FormFieldProps<V> {
  initialValue: V | null;
  onChange: (value: V | null) => void;
}

function ExpirationDateFormField({ initialValue, onChange }: FormFieldProps<Date>) {
  const [value, setValue] = useState(initialValue);

  function onDateSelected(date: Date | null) {
    setValue(date);
    onChange(date);
  }

  console.log(value);

  return (
    <div className={styles.field}>
      <Text as="label" htmlFor="expiryDate">
        Ablaufdatum
      </Text>
      <Datepicker
        initialValue={value}
        onChange={onDateSelected}
        inputElement={
          <TextField.Root className={styles.field} id="expiryDate" size="3" autoComplete="off">
            <TextField.Slot side="right">
              <CalendarDaysIcon />
            </TextField.Slot>
          </TextField.Root>
        }
      />
    </div>
  );
}
