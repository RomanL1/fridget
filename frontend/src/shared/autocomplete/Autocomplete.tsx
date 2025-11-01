import { JSX, useEffect, useState } from 'react';

import { Popover, TextField } from '@radix-ui/themes';

interface AutocompleteProps {
  inputElement?: JSX.Element;
}

export function Autocomplete({ inputElement }: AutocompleteProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopoverVisible, setPopoverVisibility] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPopoverVisibility(true);
    }, 1000);
  }, [searchTerm]);

  return (
    <Popover.Root open={isPopoverVisible}>
      {/* <Popover.Anchor>{inputElement}</Popover.Anchor> */}
      <Popover.Anchor asChild>
        <TextField.Root placeholder="Suchen..." onChange={(e) => setSearchTerm(e.target.value)} />
      </Popover.Anchor>
      {isPopoverVisible}
      {/* <Popover.Content>gugus</Popover.Content> */}
    </Popover.Root>
  );
}
