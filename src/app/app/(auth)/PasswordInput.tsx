'use client';

import type { FormInputProps } from './types';

import { forwardRef } from 'react';

import { Input } from '@/components/Input';

const PasswordInput = forwardRef<HTMLInputElement, FormInputProps>(
  (props, ref) => {
    return (
      <Input
        size='md'
        id='password'
        type='password'
        label='Password'
        isRequired
        placeholder='••••••••'
        ref={ref}
        {...props}
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
