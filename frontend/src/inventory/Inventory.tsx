import { PageShell } from '../shared/page/PageShell';
import { BarcodeScannerToggle } from './barcode-scanner-toggle/BarcodeScannerToggle';

export function Inventory() {
  return (
    <PageShell title="Produktübersicht">
      <BarcodeScannerToggle />
    </PageShell>
  );
}
