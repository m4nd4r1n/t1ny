'use client';

import type { FormInputProps } from './types';

import { forwardRef } from 'react';

import { Input } from '@/components/Input';

const EmailInput = forwardRef<HTMLInputElement, FormInputProps>(
  (props, ref) => {
    return (
      <Input
        size='md'
        id='email'
        type='email'
        label='Email'
        isRequired
        placeholder='you@example.com'
        ref={ref}
        {...props}
      />
    );
  },
);

EmailInput.displayName = 'EmailInput';

export default EmailInput;
