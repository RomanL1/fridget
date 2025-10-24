import { Inset } from '@radix-ui/themes';

import styles from './ProductImage.module.css';

interface ProductImageProps {
  imageUrl?: string;
}

export function ProductImage({ imageUrl }: ProductImageProps) {
  if (imageUrl) {
    return (
      <Inset clip="padding-box" side="top" pb="current">
        <div className={styles.imageContainer}>
          <img src={imageUrl} className={styles.image} />
        </div>
      </Inset>
    );
  }

  return <></>;
}
