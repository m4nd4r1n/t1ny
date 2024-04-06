import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { HOME_PATH } from '@/libs/constants';
import { getPageSession } from '@/libs/lucia';

export const metadata: Metadata = {
  title: 't1ny | Login',
};

const AuthLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const session = await getPageSession();

  if (session && session.user.role !== 'BLOCKED') {
    redirect(HOME_PATH);
  }

  return (
    <div className='flex h-screen items-center justify-center'>{children}</div>
  );
};

export default AuthLayout;
