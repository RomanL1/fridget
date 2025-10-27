import { PropsWithChildren, RefObject, useEffect, useImperativeHandle, useState } from 'react';

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

  // Clear ref when component is un-mounted
  useEffect(() => {
    return () => {
      ref.current = null;
    };
  }, [ref]);

  // Close the sheet when escape is pressed
  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        ref.current?.close();
      }
    };

    if (isVisible) {
      window.addEventListener('keydown', keydownHandler);
      return () => {
        window.removeEventListener('keydown', keydownHandler);
      };
    }
  }, [isVisible]);

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
