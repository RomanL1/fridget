import { Inset } from '@radix-ui/themes';

import styles from './ProductImage.module.css';

interface ProductImageProps {
  imageUrl?: string;
}

export function ProductImage({ imageUrl }: ProductImageProps) {
  return (
    <Inset clip="padding-box" side="top" pb="current">
      <img src={imageUrl} className={styles.image} />
    </Inset>
  );
}
