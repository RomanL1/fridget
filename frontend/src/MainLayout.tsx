import { Outlet } from 'react-router';
import NavigationBar from './shared/components/navigation-bar/NavigationBar';
import { ReactElement } from 'react';

const MainLayout = (): ReactElement => (
  <>
    <aside>
      <NavigationBar />
    </aside>
    <main>
      <Outlet />
    </main>
  </>
);

export default MainLayout;
