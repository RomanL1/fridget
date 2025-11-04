import { Combobox, ComboboxItem, ComboboxLabel, ComboboxPopover, ComboboxProvider } from '@ariakit/react';
import { JSX, Key, startTransition, useRef, useState } from 'react';

import styles from './Autocomplete.module.css';
import { DropdownMenu, TextField, VisuallyHidden } from '@radix-ui/themes';
import { useComboBoxState } from 'react-stately';
import { useComboBox } from 'react-aria';

interface AutocompleteProps<O> {
  options: O[];
  optionDisplayFn: (option: O) => JSX.Element;
  optionKeyFn: (option: O) => Key | null | undefined;
  onSearchTermChange: (searchTerm: string) => void;
}

export function Autocomplete<O>({ options, optionKeyFn, optionDisplayFn, onSearchTermChange }: AutocompleteProps<O>) {
  const [searchValue, setSearchValue] = useState('');

  const state = useComboBoxState({
    onInputChange: console.log,
    onSelectionChange: console.log,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const listBoxRef = useRef<HTMLElement>(null);

  const comboboxProps = useComboBox(
    {
      inputRef,
      listBoxRef,
      popoverRef: listBoxRef,
      label: 'whatever',
    },
    state,
  );

  return (
    <>
      <TextField.Root {...comboboxProps.inputProps} placeholder="haha lol" />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <VisuallyHidden />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content {...comboboxProps.listBoxProps}>
          <DropdownMenu.Item shortcut="Naturaplan">Champignons Bio braun</DropdownMenu.Item>
          <DropdownMenu.Item shortcut="El Tony">El Tony Mate</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );

  return (
    <ComboboxProvider
      setValue={(value) => {
        startTransition(() => setSearchValue(value));
      }}
    >
      {/* <Combobox ></Combobox>
      <TextField.Root placeholder="Produkt hinzufügen..." open/> */}
      <DropdownMenu.Root>
        <DropdownMenu.Content>
          <DropdownMenu.Item shortcut="guguseli">Gugus</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {/* <ComboboxLabel className={styles.label}>Your favorite food</ComboboxLabel>
      <Combobox placeholder="e.g., Apple" className={styles.combobox} /> */}
      <ComboboxPopover gutter={8} sameWidth className={styles.popover}>
        {options.length ? (
          options.map((option) => (
            <ComboboxItem key={optionKeyFn(option)} value={`${option}`} className={styles.comboboxItem} />
          ))
        ) : (
          <div className="no-results">No results found</div>
        )}
      </ComboboxPopover>
    </ComboboxProvider>
  );
}
