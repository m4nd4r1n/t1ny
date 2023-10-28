import type { Metadata } from 'next';

import Footer from './Footer';
import Header from './Header';

const HomeLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className='mx-auto w-full max-w-screen-lg p-8'>{children}</main>
      <Footer />
    </>
  );
};

export const metadata: Metadata = {
  title: 't1ny | URL Shortener - Short URLs',
};

export default HomeLayout;
