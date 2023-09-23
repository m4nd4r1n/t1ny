import * as context from 'next/headers';
import { cookies, headers } from 'next/headers';
import type { NextRequest } from 'next/server';

import { OAuthRequestError } from '@lucia-auth/oauth';

import { auth, googleAuth } from '@/libs/lucia';

export const GET = async (request: NextRequest) => {
  const authRequest = auth.handleRequest(request.method, context);
  const session = await authRequest.validate();
  if (session) {
    return new Response(null, { status: 302, headers: { Location: '/' } });
  }

  const storedState = cookies().get('google_oauth_state')?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get('state');
  const code = url.searchParams.get('code');
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const { getExistingUser, googleUser, createUser } =
      await googleAuth.validateCallback(code);

    const getUser = async () => {
      const existingUser = await getExistingUser();
      if (existingUser) return existingUser;
      const user = await createUser({
        attributes: {
          email: googleUser.email ?? null,
          email_verified: googleUser.email_verified,
          image: googleUser.picture,
          name: googleUser.name,
          role: 'USER',
        },
      });
      return user;
    };

    const user = await getUser();
    if (user.role === 'BLOCKED') return new Response(null, { status: 403 });

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest(request.method, {
      cookies,
      headers,
    });
    authRequest.setSession(session);

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
};
