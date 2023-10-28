import type { Metadata } from 'next';

import { FormCard } from '@/components/FormCard';
import { deleteUser, updateUser } from '@/libs/actions';
import { getPageSession } from '@/libs/lucia';

const SettingsPage = async () => {
  const session = await getPageSession();

  return (
    <>
      <h1 className='text-3xl font-bold'>Settings</h1>
      <FormCard
        title={NAME.TITLE}
        description={NAME.DESCRIPTION}
        helpText={NAME.HELP_TEXT}
        inputAttrs={{
          placeholder: NAME.PLACEHOLDER,
          name: 'name',
          type: 'text',
          defaultValue: session.user.name ?? '',
          maxLength: 32,
        }}
        handleSubmit={updateUser}
      />
      <FormCard
        title={EMAIL.TITLE}
        description={EMAIL.DESCRIPTION}
        helpText={EMAIL.HELP_TEXT}
        inputAttrs={{
          placeholder: EMAIL.PLACEHOLDER,
          name: 'email',
          type: 'email',
          defaultValue: session.user.email ?? '',
        }}
        handleSubmit={updateUser}
      />
      <FormCard
        title={ACCOUNT.TITLE}
        description={ACCOUNT.DESCRIPTION}
        helpText={ACCOUNT.HELP_TEXT}
        inputAttrs={{
          placeholder: ACCOUNT.PLACEHOLDER,
          name: 'confirm',
          type: 'text',
          pattern: DELETE_CONFIRM_TEXT,
        }}
        buttonText='Confirm Delete'
        isDanger
        handleSubmit={deleteUser}
      />
    </>
  );
};

const DELETE_CONFIRM_TEXT = 'DELETE ACCOUNT';
const NAME = Object.freeze({
  TITLE: 'Name',
  DESCRIPTION: 'Your name on t1ny.',
  HELP_TEXT: 'Please use 32 characters maximum.',
  PLACEHOLDER: 'William Shakespeare',
});
const EMAIL = Object.freeze({
  TITLE: 'Email',
  DESCRIPTION: 'Your email on t1ny.',
  HELP_TEXT: 'Please enter a valid email.',
  PLACEHOLDER: 'example@t1ny.kr',
});
const ACCOUNT = Object.freeze({
  TITLE: 'Delete account',
  DESCRIPTION: `Deletes your account and all links associated with it. Type '${DELETE_CONFIRM_TEXT}' to confirm.`,
  HELP_TEXT: 'This action is irreversible. Please proceed with caution.',
  PLACEHOLDER: `Enter '${DELETE_CONFIRM_TEXT}'`,
});

export const metadata: Metadata = {
  title: 't1ny | Settings',
};

export default SettingsPage;
