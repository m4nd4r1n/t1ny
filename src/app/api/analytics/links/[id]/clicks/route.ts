import { NextResponse } from 'next/server';

import { withErrorHandler } from '@/libs/handler';
import { withAuth } from '@/libs/lucia';
import prisma from '@/libs/prisma';

import { getClicksByDayWithId, getClicksByMonthWithId } from './queries';

type QueryResult = {
  count: bigint;
  date: string;
}[];

type Params = {
  id: string;
};

const COUNT_KEY = 'Link clicks';

export const GET = withErrorHandler(
  withAuth<Params>(async (request, { session, params }) => {
    const { userId } = session.user;
    const { id } = params;

    let includesDay = false;
    let result = await prisma.$queryRaw<QueryResult>(
      getClicksByMonthWithId(userId, id),
    );

    if (result.length <= 1) {
      includesDay = true;
      result = await prisma.$queryRaw<QueryResult>(
        getClicksByDayWithId(userId, id),
      );
    }

    const formattedResult = result.map(({ count, date }) => ({
      [COUNT_KEY]: Number(count),
      date: Intl.DateTimeFormat('en-US', {
        month: 'short',
        year: '2-digit',
        day: includesDay ? '2-digit' : undefined,
      }).format(new Date(date)),
    }));

    return NextResponse.json(formattedResult);
  }),
);
