import type { Metadata } from 'next';

import { checkUserSignedIn } from '@/utils/check-user';
import Auth from '../Auth';
import Form from './Form';

const ChangePasswordPage = async () => {
  await checkUserSignedIn();

  return <Auth type='change' form={<Form />} />;
};

export default ChangePasswordPage;

export const metadata: Metadata = {
  title: 't1ny | Change password',
};
