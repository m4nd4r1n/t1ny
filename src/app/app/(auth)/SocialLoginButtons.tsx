'use client';

import type { OAuthProvider } from './types';

import { redirect } from 'next/navigation';
import { useState, useTransition } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';

import { Button } from '@/components/Button';
import { SIGN_IN_PATH } from '@/constants/urls';
import { oauthLogin } from './actions';

const SocialLoginButtons = () => {
  const [isPending, startTransition] = useTransition();
  const [login, setLogin] = useState<'github' | 'google'>('github');

  const onClick = (provider: OAuthProvider) => () => {
    setLogin(provider);
    startTransition(async () => {
      const res = await oauthLogin(provider).catch(() => {
        toast.error('Server error occurred.');
      });
      if (res && !res.ok) {
        redirect(`${SIGN_IN_PATH}?error=${res.message}`);
      }
    });
  };

  return (
    <>
      <Button
        isLoading={isPending && login === 'github'}
        disabled={isPending}
        onClick={onClick('github')}
        fullWidth
        size='large'
      >
        <FaGithub className='h-5 w-5 text-white ' />
        Continue with GitHub
      </Button>
      <Button
        isLoading={isPending && login === 'google'}
        disabled={isPending}
        className='bg-white text-default shadow-gray/30'
        onClick={onClick('google')}
        fullWidth
        size='large'
      >
        <FcGoogle className='h-5 w-5' />
        Continue with Google
      </Button>
    </>
  );
};

export default SocialLoginButtons;
