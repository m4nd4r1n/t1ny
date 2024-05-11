import type { Metadata } from 'next';

import { cookies } from 'next/headers';

import { useSupabaseServer } from '@/libs/supabase/server';
import { checkUserSignedIn } from '@/utils/check-user';
import Auth from '../Auth';
import Form from './Form';

const ChangePasswordPage = async () => {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await checkUserSignedIn(supabase);

  return <Auth type='change' form={<Form />} />;
};

export default ChangePasswordPage;

export const metadata: Metadata = {
  title: 't1ny | Change password',
};
