import { Button, Text, TextField } from '@radix-ui/themes';
import { CalendarDaysIcon } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { Datepicker } from '../../../shared/components/datepicker/Datepicker';
import { InventoryItem } from '../../inventory-items/card/inventory-item';

import styles from './InventoryItemDetailForm.module.css';

interface InventoryItemDetailFormProps {
  inventoryItem: InventoryItem;
  onCancel: () => void;
  onSave: (item: InventoryItem) => void;
}

export function InventoryItemDetailForm({ inventoryItem, onSave, onCancel }: InventoryItemDetailFormProps) {
  const [productName, setProductName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [bestBeforeDate, setBestBeforeDate] = useState<Date | null>(null);

  useEffect(() => {
    setProductName(inventoryItem.productName ?? '');
    setBrandName(inventoryItem.brandName ?? '');
    setQuantity(inventoryItem.quantity ?? '');
    setBestBeforeDate(inventoryItem.bestBeforeDate ?? null);
  }, [inventoryItem.inventoryItemId]);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSave({
      ...inventoryItem,
      productName,
      brandName,
      quantity,
      bestBeforeDate: bestBeforeDate ?? undefined,
    });
  }

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <fieldset className={styles.fields}>
        <ProductNameFormField value={productName} onChange={setProductName} />
        <BrandNameFormField value={brandName} onChange={setBrandName} />
        <QuantityFormField value={quantity} onChange={setQuantity} />
        <ExpirationDateFormField value={bestBeforeDate} onChange={setBestBeforeDate} />
      </fieldset>

      <div className={styles.actions}>
        <Button type="button" variant="ghost" color="gray" onClick={onCancel}>
          Abbrechen
        </Button>
        <Button type="submit">Speichern</Button>
      </div>
    </form>
  );
}

interface FormFieldProps<V> {
  value: V;
  onChange: (value: V) => void;
}

function ProductNameFormField({ value, onChange }: FormFieldProps<string>) {
  return (
    <div className={styles.field}>
      <Text as="label" htmlFor="productName">
        Produktname
      </Text>
      <TextField.Root
        id="productName"
        size="3"
        className={styles.field}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        autoComplete="off"
      />
    </div>
  );
}

function BrandNameFormField({ value, onChange }: FormFieldProps<string>) {
  return (
    <div className={styles.field}>
      <Text as="label" htmlFor="brandName">
        Marke
      </Text>
      <TextField.Root
        id="brandName"
        size="3"
        className={styles.field}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}

function QuantityFormField({ value, onChange }: FormFieldProps<string>) {
  return (
    <div className={styles.field}>
      <Text as="label" htmlFor="quantity">
        Menge
      </Text>
      <TextField.Root
        id="quantity"
        size="3"
        className={styles.field}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}

function ExpirationDateFormField({ value, onChange }: FormFieldProps<Date | null>) {
  return (
    <div className={styles.field}>
      <Text as="label" htmlFor="expiryDate">
        Ablaufdatum
      </Text>
      <Datepicker
        value={value}
        onChange={onChange}
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
