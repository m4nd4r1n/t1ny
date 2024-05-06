import type { FC, PropsWithChildren } from 'react';

import Header from './Header';

interface AuthLayoutProps extends PropsWithChildren {}

const AuthLayout: FC<AuthLayoutProps> = async ({ children }) => {
  return (
    <>
      <Header />
      <main className='flex flex-1 items-center justify-center'>
        <div className='mx-4 w-full max-w-sm space-y-6'>{children}</div>
      </main>
    </>
  );
};

export default AuthLayout;
