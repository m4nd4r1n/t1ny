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
import LogoutButton from './LogoutButton';
import MenuItemLinks from './MenuItemLinks';
import Profile from './Profile';

const Header = () => {
  const menu = (
    <NavbarMenu>
      <LogoLink className='hidden w-fit sm:inline-flex' />
      <MenuItemLinks />
      <NavbarMenuItem justify='end'>
        <LogoutButton />
      </NavbarMenuItem>
    </NavbarMenu>
  );
  return (
    <Navbar menu={menu}>
      <NavbarMenuToggle />
      <NavbarLogo>
        <LogoLink className='sm:hidden' />
      </NavbarLogo>
      <NavbarContent justify='end'>
        <NavbarItem>
          <Profile />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
