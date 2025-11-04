import { Box } from '@radix-ui/themes';
import { Autocomplete } from './shared/autocomplete/Autocomplete';

export function Whatever() {
  return (
    <div style={{ padding: '50px' }}>
      <Box maxWidth="500px">
        <Autocomplete
          options={['one', 'two']}
          optionDisplayFn={(o) => <p>{o}</p>}
          optionKeyFn={(o) => o}
          onSearchTermChange={console.log}
        />
      </Box>
    </div>
  );
}
