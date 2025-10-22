import { PropsWithChildren, RefObject, useImperativeHandle, useState } from 'react';

import styles from './BottomSheet.module.css';

export interface BottomSheetRef {
  open(): void;
  close(): void;
}

export type BottomSheetProps = PropsWithChildren<{
  ref: RefObject<BottomSheetRef | null>;
}>;

export function BottomSheet({ ref, children }: BottomSheetProps) {
  const [isVisible, setVisible] = useState(false);
  const backdropAnimationClass = isVisible ? styles.backdropEntered : styles.backdropExited;
  const bottomSheetAnimationClass = isVisible ? styles.bottomSheetEntered : styles.bottomSheetExited;

  // Expose control methods to the consumer
  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
  }));

  return (
    <div className={styles.container}>
      <div className={`${styles.backdrop} ${backdropAnimationClass}`} onClick={() => ref.current?.close()}>
        <div className={`${styles.bottomSheet} ${bottomSheetAnimationClass}`} onClick={(e) => e.stopPropagation()}>
          <div className={styles.bottomSheetContent}>{children}</div>
        </div>
      </div>
    </div>
  );
}
