'use server';

import {
  deleteUser as db_deleteUser,
  updateName as db_updateName,
} from '@/libs/supabase/db';
import { createClient } from '@/libs/supabase/server';
import { successResponse } from '@/utils/server-action-response';

export const updateName = async (name: string) => {
  await db_updateName(name);
  return successResponse('Successfully updated name');
};

export const deleteUser = async () => {
  await db_deleteUser();
  const supabase = createClient();

  await supabase.auth.signOut();

  return successResponse();
};
