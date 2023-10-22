'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { FiLogOut } from 'react-icons/fi';

import { Button } from '@/components/Button';
import { API } from '@/libs/api';

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onButtonClick = async () => {
    setLoading(true);
    try {
      await API.logout();
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      color='primary'
      fullWidth
      onClick={onButtonClick}
      isLoading={loading}
    >
      Logout
      <FiLogOut className='h-4 w-4 text-white' />
    </Button>
  );
};

export default LogoutButton;
