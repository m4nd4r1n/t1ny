import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { BLOCKED_REDIRECT_URL } from '@/libs/constants';
import { getPageSession } from '@/libs/lucia';

import Header from './Header';

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
  if (session.user.role === 'BLOCKED') redirect(BLOCKED_REDIRECT_URL);

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
