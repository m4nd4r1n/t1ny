'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@/components/Button';

const LogoutButton = () => {
  const onButtonClick = () => {
    signOut();
  };

  return (
    <Button color='primary' fullWidth onClick={onButtonClick}>
      Logout
    </Button>
  );
};

export default LogoutButton;
