'use client';

import type { ForgotPasswordForm } from '../schema';

import { redirect } from 'next/navigation';
import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { SIGN_IN_PATH } from '@/constants/urls';
import { forgotPassword } from '../actions';
import EmailInput from '../EmailInput';
import FormSubmitButton from '../FormSubmitButton';
import { forgotPasswordFormSchema } from '../schema';

const Form = () => {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordFormSchema),
    mode: 'all',
  });

  const handleFormSubmit = (values: ForgotPasswordForm) => {
    startTransition(async () => {
      const res = await forgotPassword(values).catch(() => {
        toast.error('Server error occurred.');
      });
      if (!res) return;
      if (res.ok) redirect(SIGN_IN_PATH);
      else toast.error(res.message);
    });
  };

  return (
    <form className='space-y-5' onSubmit={handleSubmit(handleFormSubmit)}>
      <EmailInput
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        {...register('email')}
      />
      <FormSubmitButton isLoading={isPending}>
        Send Reset Email
      </FormSubmitButton>
    </form>
  );
};

export default Form;
