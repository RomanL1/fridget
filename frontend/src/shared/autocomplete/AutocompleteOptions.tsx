import { JSX, Key } from 'react';
import styles from './Autocomplete.module.css';

interface AutocompleteOptionProps<O> {
  options: O[];
  displayFn: (option: O) => JSX.Element;
  keyFn: (option: O) => Key | null | undefined;
  onOptionSelected: (option: O) => void;
}

export function AutocompleteOptions<O>({ options, displayFn, keyFn, onOptionSelected }: AutocompleteOptionProps<O>) {
  if (!options.length) {
    return <></>;
  }

  return options.map((option) => (
    <div className={styles.option} key={keyFn(option)} onClick={() => onOptionSelected(option)}>
      {displayFn(option)}
    </div>
  ));
}
