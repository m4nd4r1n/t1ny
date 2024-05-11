import type { Metadata } from 'next';

import { FormCard } from '@/components/FormCard';
import NameFormCard from './_components/NameFormCard';
import { deleteUser } from './actions';

const DELETE_CONFIRM_TEXT = 'DELETE ACCOUNT';

const SettingsPage = async () => {
  return (
    <>
      <h1 className='text-3xl font-bold'>Settings</h1>
      <NameFormCard />
      <FormCard
        title='Delete account'
        description={`Deletes your account and all links associated with it. Type '${DELETE_CONFIRM_TEXT}' to confirm.`}
        helpText='This action is irreversible. Please proceed with caution.'
        inputAttrs={{
          placeholder: `Enter '${DELETE_CONFIRM_TEXT}'`,
          name: 'confirm',
          type: 'text',
          pattern: DELETE_CONFIRM_TEXT,
        }}
        buttonText='Confirm Delete'
        isDanger
        submit={deleteUser}
      />
    </>
  );
};

export default SettingsPage;

export const metadata: Metadata = {
  title: 't1ny | Settings',
};
