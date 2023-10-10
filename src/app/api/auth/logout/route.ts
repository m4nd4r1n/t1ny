import { withErrorHandler } from '@/libs/handler';
import { auth, withAuth } from '@/libs/lucia';

export const POST = withErrorHandler(
  withAuth(async (request, { authRequest, session }) => {
    await auth.invalidateSession(session.sessionId);

    authRequest.setSession(null);

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/login',
      },
    });
  }),
);
