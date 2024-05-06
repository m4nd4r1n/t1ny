'use server';

import { createClient } from '@/libs/supabase/server';
import { successResponse } from '@/utils/server-action-response';

export const logout = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return successResponse();
};
