import { NextResponse } from 'next/server';

import { withErrorHandler } from '@/libs/handler';
import { withAuth } from '@/libs/lucia';
import prisma from '@/libs/prisma';

export const GET = withErrorHandler(
  withAuth(async (request, { session }) => {
    const { userId } = session.user;

    const limits = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { day_limit: true, total_limit: true },
    });

    return NextResponse.json(limits);
  }),
);
