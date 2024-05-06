import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { APP_URL, HOME_PATH, SIGN_IN_PATH } from '@/constants/urls';
import { createClient } from '@/libs/supabase/server';

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? HOME_PATH;

  if (code) {
    const supabase = createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    console.error(error);
    if (!error) {
      return NextResponse.redirect(`${APP_URL}${next}`);
    }
  }

  return NextResponse.redirect(
    `${APP_URL}${SIGN_IN_PATH}?error=Could not authenticate user`,
  );
};
