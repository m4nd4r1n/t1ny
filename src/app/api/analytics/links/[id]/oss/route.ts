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
      by: ['os'],
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

    const formattedResult = result.map(({ os, _count }) => ({
      value: _count._all,
      name: os ?? 'unknown',
    }));

    return NextResponse.json(formattedResult);
  }),
);
