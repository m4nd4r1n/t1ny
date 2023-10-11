import type { Metadata } from 'next';

import { Link } from '@/components/Link';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarLogo,
} from '@/components/Navbar';
import { httpScheme } from '@/libs/constants';

const HomeLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Navbar>
        <NavbarContent>
          <NavbarLogo>
            <Link href='/' color='default' isBlock>
              <span className='font-icon text-4xl antialiased  after:h-6 after:w-6 after:content-logo'></span>
              <span className='ml-2 text-2xl font-medium'>t1ny</span>
            </Link>
          </NavbarLogo>
        </NavbarContent>
        <NavbarContent justify='end'>
          <NavbarItem>
            <Link
              href={`${httpScheme}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
              color='default'
            >
              Go to dashboard
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <main className='h-screen-header max-w-nav p-8'>{children}</main>
    </div>
  );
};

export const metadata: Metadata = {
  title: 't1ny | URL Shortener - Short URLs',
};

export default HomeLayout;
