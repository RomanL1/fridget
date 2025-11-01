import { Heading } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';

import styles from './PageShell.module.css';

type PageShellProps = PropsWithChildren<{
  title: string;
}>;

export function PageShell({ title, children }: PageShellProps) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar} />
      <main className={styles.main}>
        <Heading>{title}</Heading>
        <div className={styles.pageContent}>{children}</div>
      </main>
    </div>
  );
}
