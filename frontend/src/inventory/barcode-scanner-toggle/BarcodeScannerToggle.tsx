import { IconButton } from '@radix-ui/themes';
import { checkPermissions, requestPermissions } from '@tauri-apps/plugin-barcode-scanner';
import { platform } from '@tauri-apps/plugin-os';
import { ScanBarcodeIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

import styles from './BarcodeScannerToggle.module.css';

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
    <IconButton
      className={styles.iconButton}
      type="button"
      radius="full"
      variant="solid"
      onClick={() => openBarcodeScanner()}
    >
      <ScanBarcodeIcon className={styles.icon} />
    </IconButton>
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
