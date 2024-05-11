import type { Database } from '@/types';

import { useMemo } from 'react';
import { createBrowserClient } from '@supabase/ssr';

import { TypedSupabaseClient } from '@/types/supabase';

let client: TypedSupabaseClient | undefined;

const getClient = () => {
  if (client) return client;
  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
      },
    },
  );
  return client;
};

export const useSupabaseBrowser = () => {
  return useMemo(getClient, []);
};
