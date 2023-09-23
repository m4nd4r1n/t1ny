import { redirect } from 'next/navigation';

import { getPageSession } from '@/libs/lucia';

const AdminLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const session = await getPageSession();
  if (!session || session.user.role !== 'ADMIN')
    redirect(`http://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  return <>{children}</>;
};

export default AdminLayout;
