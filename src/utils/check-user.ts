import { redirect } from 'next/navigation';

import { BANNED_PATH, HOME_PATH, SIGN_IN_PATH } from '@/constants/urls';
import { createClient } from '@/libs/supabase/server';

export const checkUserSignedOut = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    user &&
    (!user.banned_until || user.banned_until < new Date().toISOString())
  ) {
    redirect(HOME_PATH);
  }
};

export const checkUserSignedIn = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(SIGN_IN_PATH);
  }
  if (user.banned_until && user.banned_until > new Date().toISOString()) {
    await supabase.auth.signOut();
    redirect(BANNED_PATH);
  }
};
