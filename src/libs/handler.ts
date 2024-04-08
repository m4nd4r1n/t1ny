import { type NextRequest, NextResponse } from 'next/server';

import { OAuthRequestError } from '@lucia-auth/oauth';

import { HttpError } from '@/utils/error';

type WithErrorHandler<T> = (
  request: NextRequest,
  context: T,
) => Promise<Response>;

export const withErrorHandler =
  <T>(handler: WithErrorHandler<T>) =>
  async (request: NextRequest, context: T) => {
    try {
      return await handler(request, context);
    } catch (e) {
      if (e instanceof HttpError) {
        return NextResponse.json({ message: e.message }, { status: e.status });
      }
      if (e instanceof OAuthRequestError) {
        return NextResponse.json({ message: e.message }, { status: 400 });
      }
      if (e instanceof Error) {
        return NextResponse.json({ message: e.message }, { status: 500 });
      }

      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 },
      );
    }
  };
