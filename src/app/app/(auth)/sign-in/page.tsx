import type { Metadata } from 'next';

import { checkUserSignedOut } from '@/utils/check-user';
import Auth from '../Auth';
import Form from '../Form';
import MessageToaster from './MessageToaster';

const SignInPage = async () => {
  await checkUserSignedOut();

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
