'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';

import { Button } from '@/components/Button';

const LoginButton = () => {
  const [login, setLogin] = useState<'github' | 'google'>('github');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const error = searchParams.get('error');

  const onGithubClick = () => {
    setLoading(true);
    setLogin('github');
    router.push('/api/auth/login/github');
  };

  const onGoogleClick = () => {
    setLoading(true);
    setLogin('google');
    router.push('/api/auth/login/google');
  };

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && toast.error(errorMessage);
  }, [error]);

  return (
    <>
      <Button
        isLoading={loading && login === 'github'}
        disabled={loading}
        onClick={onGithubClick}
      >
        <FaGithub className='h-5 w-5 text-white ' />
        Login with GitHub
      </Button>
      <Button
        isLoading={loading && login === 'google'}
        disabled={loading}
        className='bg-white text-default shadow-gray/30'
        onClick={onGoogleClick}
      >
        <FcGoogle className='h-5 w-5' />
        Login with Google
      </Button>
    </>
  );
};

export default LoginButton;
