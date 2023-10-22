import { NextResponse } from 'next/server';

import { withErrorHandler } from '@/libs/handler';
import { withAuth } from '@/libs/lucia';
import prisma from '@/libs/prisma';

import { getClicksByDay, getClicksByMonth } from './queries';

type QueryResult = {
  count: bigint;
  date: string;
}[];

const COUNT_KEY = 'Link clicks';

export const GET = withErrorHandler(
  withAuth(async (request, { session }) => {
    const { userId } = session.user;

    let includesDay = false;
    let result = await prisma.$queryRaw<QueryResult>(getClicksByMonth(userId));

    if (result.length <= 1) {
      includesDay = true;
      result = await prisma.$queryRaw<QueryResult>(getClicksByDay(userId));
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
