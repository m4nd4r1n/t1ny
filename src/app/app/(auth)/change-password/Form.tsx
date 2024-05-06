'use client';

import type { ChangePasswordForm } from '../schema';

import { redirect } from 'next/navigation';
import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { HOME_PATH } from '@/constants/urls';
import { changePassword } from '../actions';
import FormSubmitButton from '../FormSubmitButton';
import PasswordInput from '../PasswordInput';
import { changePasswordFormSchema } from '../schema';

const Form = () => {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordFormSchema),
    mode: 'all',
  });

  const handleFormSubmit = (values: ChangePasswordForm) => {
    startTransition(async () => {
      const res = await changePassword(values).catch(() => {
        toast.error('Server error occurred.');
      });
      if (!res) return;
      if (res.ok) {
        toast.success(res.message);
        redirect(HOME_PATH);
      } else toast.error(res.message);
    });
  };

  return (
    <form className='space-y-5' onSubmit={handleSubmit(handleFormSubmit)}>
      <PasswordInput
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        {...register('password')}
      />
      <FormSubmitButton isLoading={isPending}>Change password</FormSubmitButton>
    </form>
  );
};

export default Form;
