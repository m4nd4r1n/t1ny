'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FaGithub, FaGoogle } from 'react-icons/fa';
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
        <FaGithub className='h-4 w-4 text-white ' />
        Login with GitHub
      </Button>
      <Button
        isLoading={loading && login === 'google'}
        disabled={loading}
        className='bg-white text-default shadow-gray/30'
        onClick={onGoogleClick}
      >
        <FaGoogle className='h-4 w-4' />
        Login with Google
      </Button>
    </>
  );
};

export default LoginButton;
