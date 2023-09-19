import { Link } from '@/components/Link';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarLogo,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@/components/Navbar';

import LogoutButton from './LogoutButton';
import Profile from './Profile';

const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Navbar>
        <NavbarMenuToggle />
        <NavbarLogo>
          <Link href='#' color='default' isBlock>
            t1ny
          </Link>
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
