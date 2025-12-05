import { LucideBookOpen, LucideRefrigerator, LucideShoppingCart } from 'lucide-react';
import { ReactElement } from 'react';
import { NavLink } from 'react-router';
import Logo from '../../../assets/logo_light-dark.svg?react';
import styles from './NavigationBar.module.css';
import { ThemeSwitcher } from './ThemeSwitcher/ThemeSwitcher';

const NavigationBar = (): ReactElement => (
  <nav className={styles.container}>
    <div className={styles.navLogo}>
      <Logo />
    </div>
    <div className={styles.navItemContainer}>
      <NavLink to="/" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
        <LucideRefrigerator size="35" />
        Kühlschrank
      </NavLink>
      <NavLink to="/recipes" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
        <LucideBookOpen size="35" />
        Rezepte
      </NavLink>
      <NavLink to="/shopping-list" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
        <LucideShoppingCart size="35" />
        Einkaufsliste
      </NavLink>
    </div>
    <div className={styles.themeSwitcher}>
      <ThemeSwitcher />
    </div>
  </nav>
);

export default NavigationBar;
