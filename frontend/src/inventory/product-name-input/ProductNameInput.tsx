import { IconButton, TextField } from '@radix-ui/themes';
import { PlusIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';

import styles from './ProductNameInput.module.css';

interface ProductNameInputProps {
  onSubmit: (productName: string) => void;
}

export function ProductNameInput({ onSubmit }: ProductNameInputProps) {
  const [value, setValue] = useState('');

  function onProductNameEntered(event: FormEvent) {
    event.preventDefault();
    onSubmit(value);
  }

  return (
    <form className={styles.background} onSubmit={onProductNameEntered}>
      <TextField.Root
        size="3"
        placeholder="Produkt hinzufügen..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        <TextField.Slot side="right" pr="1">
          <IconButton disabled={!value}>
            <PlusIcon />
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
    </form>
  );
}
