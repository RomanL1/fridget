import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import styles from './ThemeSwitcher.module.css';

export function ThemeSwitcher() {
  const iconSize = 35;
  const { theme, setTheme } = useTheme();

  switch (theme) {
    case 'light':
      return (
        <button type="button" className={styles.toggle} onClick={() => setTheme('dark')}>
          <SunIcon size={iconSize} />
        </button>
      );
    case 'dark':
      return (
        <button type="button" className={styles.toggle} onClick={() => setTheme('system')}>
          <MoonIcon size={iconSize} />
        </button>
      );
    default:
      return (
        <button type="button" className={styles.toggle} onClick={() => setTheme('light')}>
          <SunMoonIcon size={iconSize} />
        </button>
      );
  }
}
