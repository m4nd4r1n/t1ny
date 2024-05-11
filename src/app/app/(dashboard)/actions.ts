'use server';

import { cookies } from 'next/headers';

import { createServerActionClient } from '@/libs/supabase/server';
import { successResponse } from '@/utils/server-action-response';

export const logout = async () => {
  const cookieStore = cookies();
  const supabase = createServerActionClient(cookieStore);

  await supabase.auth.signOut();
  return successResponse();
};
