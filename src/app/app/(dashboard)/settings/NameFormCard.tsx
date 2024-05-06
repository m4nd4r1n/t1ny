import type { Response } from '@/utils/server-action-response';
import type { FC } from 'react';

import { Suspense } from 'react';

import { FormCard } from '@/components/FormCard';
import { getProfile } from '@/libs/supabase/db';
import { updateName } from './actions';

const NameFormCard = () => {
  return (
    <Suspense fallback={<NameFormCardSkeleton isDisabled />}>
      <NameFormCardImpl />
    </Suspense>
  );
};

const NameFormCardImpl = async () => {
  const { name } = await getProfile();

  return <NameFormCardSkeleton name={name} submit={updateName} />;
};

interface NameFormCardSkeletonProps {
  name?: string;
  submit?: (values: string) => Promise<Response>;
  isDisabled?: boolean;
}

const NameFormCardSkeleton: FC<NameFormCardSkeletonProps> = ({
  name,
  submit,
  isDisabled,
}) => {
  return (
    <FormCard
      title='Name'
      description='Your name on t1ny.'
      helpText='Please use 32 characters maximum.'
      inputAttrs={{
        placeholder: 'William Shakespeare',
        name: 'name',
        type: 'text',
        defaultValue: name,
        maxLength: 32,
      }}
      submit={submit}
      isDisabled={isDisabled}
    />
  );
};

export default NameFormCard;
