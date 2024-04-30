import type { Database } from '@/types';
import type { CookieOptions } from '@supabase/ssr';
import type { SupabaseClientOptions } from '@supabase/supabase-js';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

const serverClientFactory =
  (
    key: string,
    auth: SupabaseClientOptions<Database>['auth'] = {
      autoRefreshToken: true,
      detectSessionInUrl: true,
      persistSession: true,
    },
  ) =>
  () => {
    const cookieStore = cookies();

    return createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      key,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set({
                name,
                value,
                domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
                ...options,
              });
            } catch (e) {
              // The `set` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.set({
                name,
                value: '',
                domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
                ...options,
              });
            } catch (e) {
              // The `delete` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
        auth,
      },
    );
  };

export const createAdminClient = serverClientFactory(
  process.env.SERVICE_ROLE_KEY!,
  {
    autoRefreshToken: false,
    detectSessionInUrl: false,
    persistSession: false,
  },
);

export const createClient = serverClientFactory(
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
