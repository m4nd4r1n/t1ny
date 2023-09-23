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
  return (
    <div>
      <Navbar>
        <NavbarMenuToggle />
        <NavbarLogo>
          <LogoLink />
        </NavbarLogo>
        <NavbarContent justify='end'>
          <NavbarItem>
            <Profile />
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          <NavbarMenuItem>
            <Link href='#' isBlock isFull>
              Home
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem justify='end'>
            <LogoutButton />
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
      <div className='min-h-screen-header sm:ml-60'>{children}</div>
    </div>
  );
};

export default DashboardLayout;
