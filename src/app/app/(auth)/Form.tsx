'use client';

import type { FC } from 'react';
import type { AuthForm } from './schema';
import type { FormType } from './types';

import { redirect } from 'next/navigation';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FiCheckCircle } from 'react-icons/fi';
import { toast } from 'sonner';

import { Alert, AlertDescription, AlertTitle } from '@/components/Alert';
import { HOME_PATH } from '@/constants/urls';
import { emailSignin, emailSignup, forgotPassword } from './actions';
import EmailInput from './EmailInput';
import FormSubmitButton from './FormSubmitButton';
import PasswordInput from './PasswordInput';
import { authSchemaMap } from './schema';

interface FormProps {
  type: FormType;
}

const Form: FC<FormProps> = ({ type }) => {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: zodResolver(authSchemaMap[type]),
    mode: 'all',
  });
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleAfterAuthSuccess = () => {
    if (type === 'signin') {
      redirect(HOME_PATH);
    } else if (type === 'signup') {
      toast.success('Signed up successfully!');
      setIsSignedUp(true);
    }
  };

  const handleFormSubmit = (values: AuthForm) => {
    startTransition(async () => {
      const res = await actionMap[type](values).catch(() => {
        toast.error('Server error occurred.');
      });
      if (!res) return;
      if (res.ok) handleAfterAuthSuccess();
      else toast.error(res.message);
    });
  };

  return (
    <>
      {isSignedUp ? (
        <Alert variant='primary'>
          <FiCheckCircle />
          <AlertTitle>Check your email to confirm</AlertTitle>
          <AlertDescription>
            You&apos;ve successfully signed up. Please check your email to
            confirm your account before signing in to the t1ny dashboard
          </AlertDescription>
        </Alert>
      ) : (
        <form className='space-y-5' onSubmit={handleSubmit(handleFormSubmit)}>
          <EmailInput
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
            {...register('email')}
          />
          <PasswordInput
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            {...register('password')}
          />
          <FormSubmitButton isLoading={isPending}>
            {submitTextMap[type]}
          </FormSubmitButton>
        </form>
      )}
    </>
  );
};

const actionMap = {
  signin: emailSignin,
  signup: emailSignup,
  forgot: forgotPassword,
};

const submitTextMap = {
  signin: 'Sign In',
  signup: 'Sign Up',
  forgot: 'Send Reset Email',
};

export default Form;
