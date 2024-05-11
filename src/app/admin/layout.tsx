import type { FC, PropsWithChildren } from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { APP_URL, SIGN_IN_URL } from '@/constants/urls';
import { getRole } from '@/libs/supabase/queries';
import { useSupabaseServer } from '@/libs/supabase/server';

interface AdminLayoutProps extends PropsWithChildren {}

const AdminLayout: FC<AdminLayoutProps> = async ({ children }) => {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(SIGN_IN_URL);
  const { data } = await getRole(supabase);
  if (!data) redirect(SIGN_IN_URL);
  if (data.role !== 'admin') redirect(APP_URL);

  return <>{children}</>;
};

export default AdminLayout;
