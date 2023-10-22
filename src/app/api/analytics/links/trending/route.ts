import { NextResponse } from 'next/server';

import { withErrorHandler } from '@/libs/handler';
import { withAuth } from '@/libs/lucia';
import prisma from '@/libs/prisma';

export const GET = withErrorHandler(
  withAuth(async (request, { session }) => {
    const { userId } = session.user;

    const result = await prisma.url.findMany({
      where: { user: { id: userId } },
      select: {
        id: true,
        target_title: true,
        clicks: true,
        target_favicon: true,
      },
      orderBy: {
        clicks: 'desc',
      },
      take: 5,
    });

    const formattedResult = result.map(
      ({ clicks, target_title, id, target_favicon }) => ({
        name: target_title,
        value: clicks,
        href: `/links/detail/${id}`,
        icon: target_favicon,
      }),
    );

    return NextResponse.json(formattedResult);
  }),
);
