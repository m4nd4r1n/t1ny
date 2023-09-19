'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { toast } from 'sonner';

import { Button } from '@/components/Button';

const LoginButton = () => {
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const onButtonClick = () => {
    setLoading(true);
    signIn('github');
  };

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && toast.error(errorMessage);
  }, [error]);

  return (
    <Button fullWidth isLoading={loading} onClick={onButtonClick}>
      <FaGithub className='h-4 w-4 text-white ' />
      Login with GitHub
    </Button>
  );
};

export default LoginButton;
