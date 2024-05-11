import type { EmailOtpType } from '@supabase/supabase-js';
import type { NextRequest } from 'next/server';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { APP_URL, HOME_PATH, SIGN_IN_URL } from '@/constants/urls';
import { createServerActionSupabaseClient } from '@/libs/supabase/server';

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? HOME_PATH;

  if (token_hash && type) {
    const cookieStore = cookies();
    const supabase = createServerActionSupabaseClient(cookieStore);

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      return NextResponse.redirect(`${APP_URL}${next}`);
    }

    return NextResponse.redirect(`${SIGN_IN_URL}?error=${error.message}`);
  }

  return NextResponse.redirect(
    `${SIGN_IN_URL}?error=Could not authenticate user`,
  );
};
