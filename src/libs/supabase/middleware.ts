import type { CookieOptions } from '@supabase/ssr';
import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export const updateSession = async (request: NextRequest, rewriteTo: URL) => {
  let response = NextResponse.rewrite(rewriteTo, {
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
            ...options,
          });
          response = NextResponse.rewrite(rewriteTo, {
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.rewrite(rewriteTo, {
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
      cookieOptions: {
        domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
      },
    },
  );

  await supabase.auth.getUser();

  return response;
};
