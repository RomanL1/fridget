import { DropdownMenu, Popover, TextField, VisuallyHidden } from '@radix-ui/themes';
import { JSX, Key, useEffect, useState } from 'react';

import styles from './Autocomplete.module.css';

interface AutocompleteProps<O> {
  options: O[];
  optionDisplayFn: (option: O) => JSX.Element;
  optionKeyFn: (option: O) => Key | null | undefined;
  onSearchTermChange: (searchTerm: string) => void;
}

export function Autocomplete<O>({ options, optionDisplayFn, optionKeyFn, onSearchTermChange }: AutocompleteProps<O>) {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const popoverVisibility = isPopoverVisible ? 'inherit' : 'hidden';

  // Close popover when escape is pressed
  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isPopoverVisible) {
        setIsPopoverVisible(false);
      }
    };

    if (isPopoverVisible) {
      window.addEventListener('keydown', keydownHandler);
      return () => {
        window.removeEventListener('keydown', keydownHandler);
      };
    }
  }, [isPopoverVisible]);

  return (
    <>
      <TextField.Root
        placeholder="Suchen..."
        onFocus={() => setIsPopoverVisible(true)}
        // onBlur={() => setIsPopoverVisible(false)}
        onChange={(e) => onSearchTermChange(e.target.value)}
      />

      <Popover.Root open>
        <Popover.Trigger>
          <VisuallyHidden />
        </Popover.Trigger>
        <Popover.Content width="300px" style={{ visibility: popoverVisibility }}>
          <AutocompleteOptions options={options} displayFn={optionDisplayFn} keyFn={optionKeyFn} />
        </Popover.Content>
      </Popover.Root>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button style={{ cursor: 'pointer' }}>gugus</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item shortcut="Naturaplan">Champignons Bio braun</DropdownMenu.Item>
          <DropdownMenu.Item shortcut="El Tony">El Tony Mate</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
}

interface AutocompleteOptionProps<O> {
  options: O[];
  displayFn: (option: O) => JSX.Element;
  keyFn: (option: O) => Key | null | undefined;
}

function AutocompleteOptions<O>({ options, displayFn, keyFn }: AutocompleteOptionProps<O>) {
  if (!options.length) {
    return <></>;
  }

  return options.map((option) => (
    <div className={styles.option} key={keyFn(option)}>
      {displayFn(option)}
    </div>
  ));
}
