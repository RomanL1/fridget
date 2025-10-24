import { BarcodeScannerActions } from './BarcodeScannerActions';
import { BarcodeScannerLens } from './lens/BarcodeScannerLens';

import styles from './BarcodeScannerOverlay.module.css';

export function BarcodeScannerOverlay() {
  return (
    <div className={styles.overlay}>
      {/* Backdrop fragments */}
      <div className={`${styles.backdrop} ${styles.backdropTop}`}></div>
      <div className={`${styles.backdrop} ${styles.backdropRight}`}></div>
      <div className={`${styles.backdrop} ${styles.backdropLeft}`}></div>

      {/* Lens */}
      <div className={styles.lens}>
        <BarcodeScannerLens />
      </div>

      {/* Scanner actions */}
      <div className={styles.actions}>
        <BarcodeScannerActions />
      </div>
    </div>
  );
}
