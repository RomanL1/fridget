import { Inset } from '@radix-ui/themes';

import styles from './ProductImage.module.css';
import { CameraIcon } from 'lucide-react';

interface ProductImageProps {
  imageUrl?: string;
}

export function ProductImage({ imageUrl }: ProductImageProps) {
  if (!imageUrl) {
    return <PlaceholderImage />;
  }

  return (
    <Inset clip="padding-box" side="top" pb="current">
      <img src={imageUrl} className={styles.image} />
    </Inset>
  );
}

function PlaceholderImage() {
  return (
    <Inset clip="padding-box" side="top" pb="current">
      <div className={styles.placeholderImage} role="img">
        <CameraIcon />
      </div>
    </Inset>
  );
}
