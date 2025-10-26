import { Inset } from '@radix-ui/themes';
import { CameraIcon } from 'lucide-react';

import styles from './ProductImage.module.css';

interface ProductImageProps {
  imageUrl?: string;
  onClick?: () => void;
}

export function ProductImage({ imageUrl, onClick }: ProductImageProps) {
  if (!imageUrl) {
    return <PlaceholderImage onClick={onClick} />;
  }

  return (
    <Inset clip="padding-box" side="top" pb="current">
      <img src={imageUrl} className={styles.image} onClick={onClick} />
    </Inset>
  );
}

interface PlaceholderImageProps {
  onClick?: () => void;
}

function PlaceholderImage({ onClick }: PlaceholderImageProps) {
  return (
    <Inset clip="padding-box" side="top" pb="current">
      <div className={styles.placeholderImage} role="img" onClick={onClick}>
        <CameraIcon />
      </div>
    </Inset>
  );
}
