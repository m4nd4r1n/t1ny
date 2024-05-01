import type { Metadata } from 'next';

import { checkUserSignedOut } from '@/utils/check-user';
import Auth from '../Auth';
import Form from './Form';

const ForgotPasswordPage = async () => {
  await checkUserSignedOut();

  return <Auth type='forgot' form={<Form />} />;
};

export default ForgotPasswordPage;

export const metadata: Metadata = {
  title: 't1ny | Forgot password',
};
