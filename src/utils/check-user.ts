import type { TypedSupabaseClient } from '@/types/supabase';

import { redirect } from 'next/navigation';

import { BANNED_PATH, HOME_PATH, SIGN_IN_PATH } from '@/constants/urls';

export const checkUserSignedOut = async (client: TypedSupabaseClient) => {
  const {
    data: { user },
  } = await client.auth.getUser();

  if (
    user &&
    (!user.banned_until || user.banned_until < new Date().toISOString())
  ) {
    redirect(HOME_PATH);
  }
};

export const checkUserSignedIn = async (client: TypedSupabaseClient) => {
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    redirect(SIGN_IN_PATH);
  }
  if (user.banned_until && user.banned_until > new Date().toISOString()) {
    await client.auth.signOut();
    redirect(BANNED_PATH);
  }
};
