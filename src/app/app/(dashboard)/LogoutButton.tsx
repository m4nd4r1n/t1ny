'use client';

import { redirect } from 'next/navigation';
import { useTransition } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { toast } from 'sonner';

import { Button } from '@/components/Button';
import { SIGN_IN_PATH } from '@/constants/urls';
import { logout } from './actions';

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  const onLogoutClick = () => {
    startTransition(async () => {
      const res = await logout().catch(() => {
        toast.error('Server error occurred.');
      });
      if (!res) return;
      redirect(SIGN_IN_PATH);
    });
  };

  return (
    <Button
      color='primary'
      fullWidth
      onClick={onLogoutClick}
      isLoading={isPending}
    >
      Logout
      <FiLogOut className='h-4 w-4 text-white' />
    </Button>
  );
};

export default LogoutButton;
