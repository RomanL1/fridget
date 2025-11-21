import { Inset } from '@radix-ui/themes';
import { CameraIcon } from 'lucide-react';

import styles from './ProductImage.module.css';

type ImagesSizes = '1' | '2';

const sizeClasses = {
  '1': styles.size1,
  '2': styles.size2,
} satisfies Record<ImagesSizes, string>;

interface ProductImageProps {
  imageUrl?: string;
  onClick?: () => void;
  imageSize?: ImagesSizes;
}

export function ProductImage({ imageUrl, onClick, imageSize }: ProductImageProps) {
  const sizeClass = imageSize ? sizeClasses[imageSize] : sizeClasses['1'];

  if (!imageUrl) {
    return <PlaceholderImage className={sizeClass} onClick={onClick} />;
  }

  return (
    <Inset clip="padding-box" side="top" pb="current">
      <img src={imageUrl} className={`${styles.image} ${sizeClass}`} onClick={onClick} />
    </Inset>
  );
}

interface PlaceholderImageProps {
  onClick?: () => void;
  className?: string;
}

function PlaceholderImage({ onClick, className = '' }: PlaceholderImageProps) {
  return (
    <Inset clip="padding-box" side="top" pb="current">
      <div className={`${styles.placeholderImage} ${className}`} role="img" onClick={onClick}>
        <CameraIcon />
      </div>
    </Inset>
  );
}
