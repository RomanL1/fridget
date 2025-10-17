import { Button } from '@radix-ui/themes';
import { cancel } from '@tauri-apps/plugin-barcode-scanner';
import { useNavigate } from 'react-router';

export function BarcodeScannerActions() {
  const navigate = useNavigate();

  async function cancelScanner() {
    await cancel();
    await navigate('/');
  }

  return (
    <Button type="button" onClick={() => cancelScanner()}>
      Abbrechen
    </Button>
  );
}
