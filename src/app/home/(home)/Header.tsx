import { Link } from '@/components/Link';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarLogo,
} from '@/components/Navbar';
import { getPageSession } from '@/libs/lucia';

import { APP_URL, LOGIN_URL } from './constants';

const Header = async () => {
  const session = await getPageSession();
  const isLoggedIn = !!session;

  return (
    <Navbar>
      <NavbarContent>
        <NavbarLogo>
          <Link href='/' color='default' isBlock>
            <span className='font-icon text-4xl antialiased after:content-logo'></span>
            <span className='ml-2 text-2xl font-medium'>t1ny</span>
          </Link>
        </NavbarLogo>
      </NavbarContent>
      <NavbarContent justify='end'>
        {!isLoggedIn && (
          <NavbarItem>
            <Link href={LOGIN_URL} color='default'>
              Sign in
            </Link>
          </NavbarItem>
        )}
        <NavbarItem>
          <Link className='font-medium' href={isLoggedIn ? APP_URL : LOGIN_URL}>
            {isLoggedIn ? 'Go to dashboard' : 'Get started'}
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
