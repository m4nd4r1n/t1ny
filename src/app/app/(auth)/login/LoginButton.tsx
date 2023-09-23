'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FaGithub } from 'react-icons/fa';
import { toast } from 'sonner';

import { Button } from '@/components/Button';

const LoginButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const error = searchParams.get('error');

  const onGithubClick = () => {
    setLoading(true);
    router.push('/api/auth/login/github');
  };

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && toast.error(errorMessage);
  }, [error]);

  return (
    <Button isLoading={loading} disabled={loading} onClick={onGithubClick}>
      <FaGithub className='h-4 w-4 text-white ' />
      Login with GitHub
    </Button>
  );
};

export default LoginButton;
