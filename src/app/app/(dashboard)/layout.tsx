import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import LogoLink from '@/components/LogoLink';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarLogo,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@/components/Navbar';
import { BLOCKED_REDIRECT_URL } from '@/libs/constants';
import { getPageSession } from '@/libs/lucia';

import LogoutButton from './LogoutButton';
import MenuItemLinks from './MenuItemLinks';
import Profile from './Profile';

export const metadata: Metadata = {
  title: 't1ny | Dashboard',
};

const DashboardLayout: React.FC<React.PropsWithChildren> = async ({
  children,
}) => {
  const session = await getPageSession();

  if (!session) {
    redirect('/login');
  }
  if (session.user.role === 'BLOCKED') redirect(BLOCKED_REDIRECT_URL);

  const menu = (
    <NavbarMenu>
      <MenuItemLinks />
      <NavbarMenuItem justify='end'>
        <LogoutButton />
      </NavbarMenuItem>
    </NavbarMenu>
  );

  return (
    <div>
      <Navbar menu={menu}>
        <NavbarMenuToggle />
        <NavbarLogo>
          <LogoLink />
        </NavbarLogo>
        <NavbarContent justify='end'>
          <NavbarItem>
            <Profile />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <main className='h-screen-header max-w-screen-xl p-8 sm:ml-60 2xl:ml-96'>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
