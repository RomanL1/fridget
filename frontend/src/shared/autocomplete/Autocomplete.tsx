import { Card } from '@radix-ui/themes';
import { Children, cloneElement, InputHTMLAttributes, isValidElement, JSX, Key, PropsWithChildren } from 'react';
import { AutocompleteOptions } from './AutocompleteOptions';

import styles from './Autocomplete.module.css';

type AutocompleteProps<O> = PropsWithChildren<{
  options: O[];
  optionDisplayFn: (option: O) => JSX.Element;
  optionKeyFn: (option: O) => Key | null | undefined;
  onSearchTermChange: (searchTerm: string) => void;
  onOptionSelected: (option: O) => void;
}>;

export function Autocomplete<O>({
  children,
  options,
  optionDisplayFn,
  optionKeyFn,
  onSearchTermChange,
  onOptionSelected,
}: AutocompleteProps<O>) {
  const areOptionsVisible = Boolean(options.length);
  const optionsDisplay = areOptionsVisible ? 'inherit' : 'none';

  // Modify input field attributes and attach respective event handlers
  const textField = Children.map(children, (child) => {
    if (!isValidElement<InputHTMLAttributes<HTMLInputElement>>(child)) {
      return child;
    }

    return cloneElement(child, {
      role: 'searchbox',
      autoComplete: 'off',
      onChange: (event) => {
        child.props.onChange?.(event);
        onSearchTermChange(event.target.value);
      },
    });
  });

  return (
    <div className={styles.container}>
      <div className={styles.textField}>{textField}</div>
      <Card className={styles.popover} style={{ display: optionsDisplay }}>
        <div className={styles.options}>
          <AutocompleteOptions
            options={options}
            displayFn={optionDisplayFn}
            keyFn={optionKeyFn}
            onOptionSelected={onOptionSelected}
          />
        </div>
      </Card>
    </div>
  );
}
