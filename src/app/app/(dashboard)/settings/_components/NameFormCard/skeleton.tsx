import type { Response } from '@/utils/server-action-response';
import type { FC } from 'react';

import { FormCard } from '@/components/FormCard';

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

export default NameFormCardSkeleton;
