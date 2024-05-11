import { cookies } from 'next/headers';

import { Link } from '@/components/Link';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarLogo,
} from '@/components/Navbar';
import { APP_URL, SIGN_IN_URL } from '@/constants/urls';
import { useSupabaseServer } from '@/libs/supabase/server';

const Header = async () => {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

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
            <Link href={SIGN_IN_URL} color='default'>
              Sign in
            </Link>
          </NavbarItem>
        )}
        <NavbarItem>
          <Link
            className='font-medium'
            href={isLoggedIn ? APP_URL : SIGN_IN_URL}
          >
            {isLoggedIn ? 'Go to dashboard' : 'Get started'}
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
