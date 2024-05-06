import { Link } from '@/components/Link';
import { Navbar, NavbarContent, NavbarLogo } from '@/components/Navbar';
import { ROOT_URL } from '@/constants/urls';

const Header = () => {
  return (
    <Navbar>
      <NavbarContent>
        <NavbarLogo>
          <Link href={ROOT_URL} color='default' isBlock>
            <span className='font-icon text-4xl antialiased after:content-logo'></span>
            <span className='ml-2 text-2xl font-medium'>t1ny</span>
          </Link>
        </NavbarLogo>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
