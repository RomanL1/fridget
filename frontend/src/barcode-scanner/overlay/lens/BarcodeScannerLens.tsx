import styles from './BarcodeScannerLens.module.css';

export function BarcodeScannerLens() {
  return (
    <>
      <LensCorner />
      <LensCorner />
      <LensCorner />
      <LensCorner />
    </>
  );
}

function LensCorner() {
  return <div className={styles.corner}></div>;
}
