import type { Metadata } from 'next';

import { checkUserSignedIn } from '@/utils/check-user';
import Header from './Header';

export const metadata: Metadata = {
  title: 't1ny | Dashboard',
};

const DashboardLayout: React.FC<React.PropsWithChildren> = async ({
  children,
}) => {
  await checkUserSignedIn();

  return (
    <>
      <Header />
      <main className='mx-auto flex w-full min-w-0 max-w-screen-lg-menu'>
        <div className='ml-60 hidden sm:block'></div>
        <div className='flex max-h-screen-header w-full min-w-0 flex-col gap-8 p-8'>
          {children}
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;
