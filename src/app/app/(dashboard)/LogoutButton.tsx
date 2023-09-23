'use client';

import { useRouter } from 'next/navigation';

import { FiLogOut } from 'react-icons/fi';

import { Button } from '@/components/Button';

const LogoutButton = () => {
  const router = useRouter();
  const onButtonClick = () => {
    fetch('/api/logout', { method: 'POST' }).then(() => router.refresh());
  };

  return (
    <Button color='primary' fullWidth onClick={onButtonClick}>
      Logout
      <FiLogOut className='h-4 w-4 text-white' />
    </Button>
  );
};

export default LogoutButton;
