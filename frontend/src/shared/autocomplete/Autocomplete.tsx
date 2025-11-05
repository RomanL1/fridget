import { TextField } from '@radix-ui/themes';
import { JSX, Key, useEffect, useState } from 'react';

import styles from './Autocomplete.module.css';

interface AutocompleteProps<O> {
  options: O[];
  optionDisplayFn: (option: O) => JSX.Element;
  optionKeyFn: (option: O) => Key | null | undefined;
  onSearchTermChange: (searchTerm: string) => void;
  onOptionSelected: (option: O) => unknown;
}

export function Autocomplete<O>({
  options,
  optionDisplayFn,
  optionKeyFn,
  onSearchTermChange,
  onOptionSelected,
}: AutocompleteProps<O>) {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const cssDisplay = isPopoverVisible ? 'inherit' : 'none';

  // Close popover when escape is pressed
  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isPopoverVisible) {
        setIsPopoverVisible(false);
      }
    };
    if (isPopoverVisible) {
      document.addEventListener('keydown', keydownHandler);
      return () => {
        document.removeEventListener('keydown', keydownHandler);
      };
    }
  }, [isPopoverVisible]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.textField}>
          <TextField.Root
            role="searchbox"
            placeholder="Suchen..."
            onFocus={() => setIsPopoverVisible(true)}
            onBlur={() => setIsPopoverVisible(false)}
            onChange={(e) => onSearchTermChange(e.target.value)}
          />
        </div>
        <div className={styles.popover} style={{ display: cssDisplay }}>
          <div className={styles.options}>
            <AutocompleteOptions
              options={options}
              displayFn={optionDisplayFn}
              keyFn={optionKeyFn}
              onOptionSelected={onOptionSelected}
            />
          </div>
        </div>
      </div>
    </>
  );
}

interface AutocompleteOptionProps<O> {
  options: O[];
  displayFn: (option: O) => JSX.Element;
  keyFn: (option: O) => Key | null | undefined;
  onOptionSelected: (option: O) => unknown;
}

function AutocompleteOptions<O>({ options, displayFn, keyFn, onOptionSelected }: AutocompleteOptionProps<O>) {
  if (!options.length) {
    return <></>;
  }

  return options.map((option) => (
    <div className={styles.option} key={keyFn(option)} onClick={onOptionSelected}>
      {displayFn(option)}
    </div>
  ));
}
