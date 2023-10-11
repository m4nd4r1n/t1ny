import { NextResponse } from 'next/server';

import { load } from 'cheerio';
import { customAlphabet } from 'nanoid';
import puppeteer from 'puppeteer-core';

import { BadRequestError } from '@/libs/error';
import { withErrorHandler } from '@/libs/handler';
import { withAuth } from '@/libs/lucia';
import prisma from '@/libs/prisma';

export const POST = withErrorHandler(
  withAuth(async (request, { session }) => {
    const { userId } = session.user;
    const [body, limit] = await Promise.all([
      request.json(),
      prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: { day_limit: true, total_limit: true },
      }),
    ]);

    if (limit.day_limit === 0)
      throw new BadRequestError('Daily limits reached');
    if (limit.total_limit === 0)
      throw new BadRequestError('Total limits reached');

    const destination = new URL(body.destination).toString();
    const link = await prisma.url.findFirst({
      where: {
        user: { id: userId },
        target_url: destination,
      },
    });
    if (link) throw new BadRequestError('Already exists');

    const id = await generateId();
    const browser = await puppeteer.connect({
      browserWSEndpoint: process.env.BROWSER_WS_ENDPOINT,
    });
    const page = await browser.newPage();
    await page.goto(destination);
    const html = await page.content();
    await browser.close();
    const $ = load(html);
    const getMetadata = (selector: string) => $(selector).attr('content');
    const title = $('title').text();
    const description = getMetadata('meta[name="description"]');
    const image = getMetadata('meta[property="og:image"]');
    const targetDomain = new URL(destination).hostname;

    await prisma.$transaction([
      prisma.url.create({
        data: {
          id,
          target_url: destination,
          target_title: title,
          target_description: description,
          target_og_image: image,
          target_favicon: `https://www.google.com/s2/favicons?domain=${targetDomain}&sz=32`,
          user: { connect: { id: userId } },
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: {
          day_limit: { decrement: 1 },
          total_limit: { decrement: 1 },
        },
      }),
    ]);

    return NextResponse.json({ id });
  }),
);

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const generateId = async (): Promise<string> => {
  const nanoid = customAlphabet(alphabet, 7);
  const id = nanoid();
  const link = await prisma.url.findUnique({ where: { id } });

  if (link) return generateId();
  else return id;
};
