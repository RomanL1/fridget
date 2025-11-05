import {
  Children,
  cloneElement,
  InputHTMLAttributes,
  isValidElement,
  JSX,
  Key,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { AutocompleteOptions } from './AutocompleteOptions';

import styles from './Autocomplete.module.css';

type AutocompleteProps<O> = PropsWithChildren<{
  options: O[];
  optionDisplayFn: (option: O) => JSX.Element;
  optionKeyFn: (option: O) => Key | null | undefined;
  onSearchTermChange: (searchTerm: string) => void;
  onOptionSelected: (option: O) => unknown;
}>;

export function Autocomplete<O>({
  children,
  options,
  optionDisplayFn,
  optionKeyFn,
  onSearchTermChange,
  onOptionSelected,
}: AutocompleteProps<O>) {
  const [areOptionsVisible, setOptionsVisibility] = useState(false);
  const optionsDisplay = areOptionsVisible ? 'inherit' : 'none';

  // Close popover when escape is pressed
  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && areOptionsVisible) {
        setOptionsVisibility(false);
      }
    };
    if (areOptionsVisible) {
      document.addEventListener('keydown', keydownHandler);
      return () => {
        document.removeEventListener('keydown', keydownHandler);
      };
    }
  }, [areOptionsVisible]);

  // Modify input field attributes and attach respective event handlers
  const textField = Children.map(children, (child) => {
    if (!isValidElement<InputHTMLAttributes<HTMLInputElement>>(child)) {
      return child;
    }

    return cloneElement(child, {
      role: 'searchbox',
      autoComplete: 'off',
      onFocus: composeEventHandlers(child.props.onFocus, () => setOptionsVisibility(true)),
      onBlur: composeEventHandlers(child.props.onBlur, () => setTimeout(() => setOptionsVisibility(false), 200)),
      onChange: composeEventHandlers(child.props.onChange, (e) => onSearchTermChange(e.target.value)),
    });
  });

  return (
    <div className={styles.container}>
      <div className={styles.textField}>{textField}</div>
      <div className={styles.popover} style={{ display: optionsDisplay }}>
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
  );
}

/**
 * Executes both the previous event handler registered on a child, as well as a composed event handler
 */
function composeEventHandlers<E extends React.SyntheticEvent>(their?: (event: E) => void, ours?: (event: E) => void) {
  return (event: E) => {
    their?.(event);
    if (!event.isPropagationStopped?.()) {
      ours?.(event);
    }
  };
}
