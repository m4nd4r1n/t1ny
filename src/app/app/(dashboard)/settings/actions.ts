'use server';

import { cookies } from 'next/headers';
import * as z from 'zod';

import {
  deleteUser as deleteUserQuery,
  updateName as updateNameQuery,
} from '@/libs/supabase/queries';
import {
  createServerActionAdmin,
  createServerActionClient,
} from '@/libs/supabase/server';
import {
  failureResponse,
  successResponse,
} from '@/utils/server-action-response';

const nameSchema = z
  .string()
  .min(3, 'Name must be at least 3 characters.')
  .max(32, 'Name can be up to 32 characters long.');

export const updateName = async (name: string) => {
  const result = nameSchema.safeParse(name);
  if (!result.success) {
    return failureResponse(result.error.message);
  }

  const cookieStore = cookies();
  const supabase = createServerActionClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return failureResponse('Could not authenticate user');

  await updateNameQuery(supabase, user.id, name);

  return successResponse('Successfully updated name');
};

export const deleteUser = async () => {
  const cookieStore = cookies();
  const supabaseAdmin = createServerActionAdmin(cookieStore);
  const supabase = createServerActionClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return failureResponse('Could not authenticate user');

  await deleteUserQuery(supabaseAdmin, user.id);
  await supabase.auth.signOut();

  return successResponse();
};
