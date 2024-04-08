import * as context from 'next/headers';
import { cookies, headers } from 'next/headers';
import type { NextRequest } from 'next/server';

import { BLOCKED_PATH, HOME_PATH } from '@/constants/urls';
import { withErrorHandler } from '@/libs/handler';
import { auth, githubAuth } from '@/libs/lucia';
import { BadRequestError } from '@/utils/error';

export const GET = withErrorHandler(async (request: NextRequest) => {
  const authRequest = auth.handleRequest(request.method, context);
  const session = await authRequest.validate();
  if (session) {
    return new Response(null, {
      status: 302,
      headers: { Location: HOME_PATH },
    });
  }

  const storedState = cookies().get('github_oauth_state')?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get('state');
  const code = url.searchParams.get('code');
  if (!storedState || !state || storedState !== state || !code) {
    throw new BadRequestError();
  }

  const { getExistingUser, githubUser, createUser } =
    await githubAuth.validateCallback(code);

  const getUser = async () => {
    const existingUser = await getExistingUser();
    if (existingUser) return existingUser;
    return await createUser({
      attributes: {
        gh_username: githubUser.login,
        email: githubUser.email,
        image: githubUser.avatar_url,
        name: githubUser.name ?? githubUser.login,
        role: 'USER',
      },
    });
  };

  const user = await getUser();
  if (user.role === 'BLOCKED') {
    return new Response(null, {
      status: 302,
      headers: { Location: BLOCKED_PATH },
    });
  }

  const newSession = await auth.createSession({
    userId: user.userId,
    attributes: {},
  });
  const newAuthRequest = auth.handleRequest(request.method, {
    cookies,
    headers,
  });
  newAuthRequest.setSession(newSession);

  return new Response(null, { status: 302, headers: { Location: HOME_PATH } });
});
