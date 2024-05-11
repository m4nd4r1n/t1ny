import type { Metadata } from 'next';

import { cookies } from 'next/headers';

import { useSupabaseServer } from '@/libs/supabase/server';
import { checkUserSignedOut } from '@/utils/check-user';
import Auth from '../Auth';
import Form from '../Form';
import MessageToaster from './MessageToaster';

const SignInPage = async () => {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await checkUserSignedOut(supabase);

  return (
    <>
      <Auth type='signin' form={<Form type='signin' />} />
      <MessageToaster />
    </>
  );
};

export default SignInPage;

export const metadata: Metadata = {
  title: 't1ny | Sign in',
};
