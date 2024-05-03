import { redirect } from 'next/navigation';

import { APP_URL, SIGN_IN_URL } from '@/constants/urls';
import { getRole } from '@/libs/supabase/db';
import { createClient } from '@/libs/supabase/server';

const AdminLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(SIGN_IN_URL);
  const role = await getRole(user.id);
  if (role !== 'admin') redirect(APP_URL);

  return <>{children}</>;
};

export default AdminLayout;
