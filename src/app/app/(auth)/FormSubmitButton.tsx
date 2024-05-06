import type { ButtonProps } from '@/components/Button';
import type { FC } from 'react';

import { Button } from '@/components/Button';

interface FormSubmitButtonProps
  extends Pick<ButtonProps, 'children' | 'isLoading'> {}

const FormSubmitButton: FC<FormSubmitButtonProps> = (props) => {
  return (
    <Button type='submit' size='large' fullWidth color='primary' {...props} />
  );
};

export default FormSubmitButton;
