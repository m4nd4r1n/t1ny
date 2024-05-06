import type { FC, PropsWithChildren } from 'react';

import { Toaster } from 'sonner';

interface AppLayoutProps extends PropsWithChildren {}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster richColors position='top-center' closeButton />
    </>
  );
};

export default AppLayout;
