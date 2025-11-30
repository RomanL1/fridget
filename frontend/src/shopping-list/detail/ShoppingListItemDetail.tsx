import { FormEvent, ReactElement, useEffect, useState } from 'react';
import { ShoppingListItem } from '../ShoppingListView';
import { Label } from 'radix-ui';
import { Button, Heading, TextArea, TextField } from '@radix-ui/themes';
import styles from './ShoppingListItem.module.css';

interface ShoppingListDetailProps {
  selectedItem?: ShoppingListItem | null;
  onSave: (shoppingListItem: ShoppingListItem) => void;
  onCancel: () => void;
}

const ShoppingListItemDetail = ({ selectedItem, onSave, onCancel }: ShoppingListDetailProps): ReactElement => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!selectedItem) {
      return;
    }

    setName(selectedItem.name ?? '');
    setDescription(selectedItem.description ?? '');
  });

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSave({
      ...selectedItem,
      name,
      description,
    });
  };

  return (
    <>
      <Heading as="h2">Details</Heading>
      <form onSubmit={handleOnSubmit} className={styles.form}>
        <div className={styles.field}>
          <Label.Root htmlFor="name">Name</Label.Root>
          <TextField.Root value={name} size="3" id="name" placeholder="Name" />
        </div>
        <div className={styles.field}>
          <Label.Root htmlFor="description">Beschreibung</Label.Root>
          <TextArea value={description} size="3" id="description" placeholder="Menge oder Beschreibung" />
        </div>
        <div className={styles.actions}>
          <Button type="button" variant="ghost" color="gray" onClick={onCancel}>
            Abbrechen
          </Button>
          <Button type="submit">Speichern</Button>
        </div>
      </form>
    </>
  );
};
export default ShoppingListItemDetail;
