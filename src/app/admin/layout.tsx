import { redirect } from 'next/navigation';

import { APP_URL } from '@/constants/urls';
import { getPageSession } from '@/libs/lucia';

const AdminLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const session = await getPageSession();
  if (!session || session.user.role !== 'ADMIN') redirect(APP_URL);

  return <>{children}</>;
};

export default AdminLayout;
