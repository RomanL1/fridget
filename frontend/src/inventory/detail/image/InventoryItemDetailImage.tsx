import styles from './InventoryItemDetailImage.module.css';

interface InventoryItemDetailImageProps {
  imageUrl?: string;
}

export function InventoryItemDetailImage({ imageUrl }: InventoryItemDetailImageProps) {
  if (!imageUrl) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <img className={styles.image} src={imageUrl} />
    </div>
  );
}
