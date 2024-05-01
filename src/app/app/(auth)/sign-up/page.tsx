import type { Metadata } from 'next';

import { checkUserSignedOut } from '@/utils/check-user';
import Auth from '../Auth';
import Form from '../Form';

const SignUpPage = async () => {
  await checkUserSignedOut();

  return <Auth type='signup' form={<Form type='signup' />} />;
};

export default SignUpPage;

export const metadata: Metadata = {
  title: 't1ny | Sign up',
};
