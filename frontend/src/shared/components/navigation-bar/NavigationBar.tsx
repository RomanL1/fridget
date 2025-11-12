import { ReactElement } from 'react';
import styles from './NavigationBar.module.css';
import Logo from '../../../assets/logo_light-dark.svg?react';
import { NavLink } from 'react-router';
import { LucideRefrigerator } from 'lucide-react';
import { LucideBookOpen } from 'lucide-react';
import { LucideShoppingCart } from 'lucide-react';

const NavigationBar = (): ReactElement => (
  <nav className={styles.container}>
    <div className={styles.navLogo}>
      <Logo />
    </div>
    <div className={styles.navContainer}>
      <NavLink to="/" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
        <LucideRefrigerator size="35" />
        Kühlschrank
      </NavLink>
      <NavLink to="/recipes" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
        <LucideBookOpen size="35" />
        Rezepte
      </NavLink>
      <NavLink to="/grocery-list" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
        <LucideShoppingCart size="35" />
        Einkaufsliste
      </NavLink>
    </div>
  </nav>
);

export default NavigationBar;
