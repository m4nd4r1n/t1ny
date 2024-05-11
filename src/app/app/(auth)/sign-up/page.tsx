import type { Metadata } from 'next';

import { cookies } from 'next/headers';

import { useSupabaseServer } from '@/libs/supabase/server';
import { checkUserSignedOut } from '@/utils/check-user';
import Auth from '../Auth';
import Form from '../Form';

const SignUpPage = async () => {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await checkUserSignedOut(supabase);

  return <Auth type='signup' form={<Form type='signup' />} />;
};

export default SignUpPage;

export const metadata: Metadata = {
  title: 't1ny | Sign up',
};
