import { NextResponse } from 'next/server';

import { withErrorHandler } from '@/libs/handler';
import { withAuth } from '@/libs/lucia';
import prisma from '@/libs/prisma';

type Params = {
  id: string;
};

export const GET = withErrorHandler(
  withAuth<Params>(async (request, { session, params }) => {
    const { userId } = session.user;
    const { id } = params;

    const result = await prisma.analytics.groupBy({
      take: 5,
      by: ['browser'],
      _count: {
        _all: true,
      },
      where: {
        url_id: id,
        url: {
          user_id: userId,
        },
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    const formattedResult = result.map(({ browser, _count }) => ({
      value: _count._all,
      name: browser ?? 'unknown',
    }));

    return NextResponse.json(formattedResult);
  }),
);
