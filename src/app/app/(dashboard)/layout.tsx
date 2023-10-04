import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Link } from '@/components/Link';
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
import { getPageSession } from '@/libs/lucia';

import LogoutButton from './LogoutButton';
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

  const menu = (
    <NavbarMenu>
      <NavbarMenuItem>
        <Link isBlock isFull>
          Home
        </Link>
      </NavbarMenuItem>
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
      <div className='h-screen-header max-w-screen-xl p-8 sm:ml-60 2xl:ml-96'>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
