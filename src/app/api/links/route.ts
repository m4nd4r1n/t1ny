import { NextResponse } from 'next/server';

import { withErrorHandler } from '@/libs/handler';
import { withAuth } from '@/libs/lucia';
import prisma from '@/libs/prisma';

export const GET = withErrorHandler(
  withAuth(async (request, { session }) => {
    const { userId } = session.user;

    const links = await prisma.url.findMany({
      where: { user: { id: userId } },
      select: {
        id: true,
        target_url: true,
        created_at: true,
        target_favicon: true,
        target_title: true,
      },
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json(links);
  }),
);
