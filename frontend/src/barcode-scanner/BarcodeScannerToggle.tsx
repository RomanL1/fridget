import { Button } from '@radix-ui/themes';
import { checkPermissions, requestPermissions } from '@tauri-apps/plugin-barcode-scanner';
import { platform } from '@tauri-apps/plugin-os';
import { useNavigate } from 'react-router';

export function BarcodeScannerToggle() {
  const navigate = useNavigate();

  async function openBarcodeScanner() {
    await ensurePermissions();
    await navigate('/scan');
  }

  if (!supportsBarcodeScanning()) {
    return <></>;
  }

  return (
    <Button type="button" onClick={() => openBarcodeScanner()}>
      Scan Product
    </Button>
  );
}

function supportsBarcodeScanning() {
  try {
    return platform() === 'android';
  } catch {
    return false;
  }
}

async function ensurePermissions() {
  let permissionState = await checkPermissions();

  if (permissionState === 'granted') {
    return;
  }

  try {
    permissionState = await requestPermissions();
    if (permissionState === 'granted') {
      return;
    }
  } catch (error) {
    console.error(error);
  }
}
