import { NextResponse } from 'next/server';

import { withErrorHandler } from '@/libs/handler';
import { withAuth } from '@/libs/lucia';
import prisma from '@/libs/prisma';
import { BadRequestError } from '@/utils/error';

type Params = {
  id: string;
};

export const DELETE = withErrorHandler(
  withAuth<Params>(async (request, { params, session }) => {
    const { id } = params;
    const { userId } = session.user;

    if (!id) throw new BadRequestError('No id provided');

    await prisma.$transaction([
      prisma.url.deleteMany({
        where: { id, user: { id: userId } },
      }),
      prisma.user.update({
        where: { id: userId },
        data: {
          total_limit: { increment: 1 },
        },
      }),
    ]);

    return NextResponse.json({ message: 'Deleted' });
  }),
);
