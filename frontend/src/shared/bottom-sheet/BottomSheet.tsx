import { PropsWithChildren } from 'react';

import styles from './BottomSheet.module.css';

export type BottomSheetProps = PropsWithChildren<{
  isVisible: boolean;
  onBackdropClick?: () => void;
}>;

export function BottomSheet({ isVisible, children, onBackdropClick }: BottomSheetProps) {
  const backdropAnimationClass = isVisible ? styles.backdropEntered : styles.backdropExited;
  const bottomSheetAnimationClass = isVisible ? styles.bottomSheetEntered : styles.bottomSheetExited;

  return (
    <div className={styles.container}>
      <div className={`${styles.backdrop} ${backdropAnimationClass}`} onClick={onBackdropClick}>
        <div className={`${styles.bottomSheet} ${bottomSheetAnimationClass}`} onClick={(e) => e.stopPropagation()}>
          <div className={styles.bottomSheetContent}>{children}</div>
        </div>
      </div>
    </div>
  );
}
