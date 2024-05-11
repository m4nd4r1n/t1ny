import type { Database } from '@/types';
import type { TypedSupabaseClient } from '@/types/supabase';
import type { SupabaseClientOptions } from '@supabase/supabase-js';
import type { cookies } from 'next/headers';

import { CookieOptions, createServerClient } from '@supabase/ssr';

interface ClientFactory {
  (
    key: string,
    auth?: SupabaseClientOptions<Database>['auth'],
  ): (cookieStore: ReturnType<typeof cookies>) => TypedSupabaseClient;
}

const createSupabaseClient: ClientFactory =
  (
    key,
    auth = {
      detectSessionInUrl: true,
      persistSession: true,
    },
  ) =>
  (cookieStore) =>
    createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
      auth: {
        autoRefreshToken: false,
        ...auth,
      },
      cookieOptions: {
        domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
      },
    });

export const useSupabaseAdmin = createSupabaseClient(
  process.env.SERVICE_ROLE_KEY!,
  {
    detectSessionInUrl: false,
    persistSession: false,
  },
);

export const createSupabaseAdmin = createSupabaseClient(
  process.env.SERVICE_ROLE_KEY!,
  {
    detectSessionInUrl: false,
    persistSession: false,
  },
);

export const useSupabaseServer = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const createServerActionSupabaseClient: ClientFactory =
  (
    key,
    auth = {
      detectSessionInUrl: true,
      persistSession: true,
    },
  ) =>
  (cookieStore) =>
    createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
      auth: {
        autoRefreshToken: false,
        ...auth,
      },
      cookieOptions: {
        domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
      },
    });

export const createServerActionClient = createServerActionSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const createServerActionAdmin = createServerActionSupabaseClient(
  process.env.SERVICE_ROLE_KEY!,
  {
    detectSessionInUrl: false,
    persistSession: false,
  },
);
