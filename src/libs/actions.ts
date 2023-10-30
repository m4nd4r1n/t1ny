'use server';

import * as context from 'next/headers';

import { load } from 'cheerio';
import { customAlphabet } from 'nanoid';
import puppeteer from 'puppeteer-core';

import { BadRequestError, UnauthorizedError } from '@/libs/error';
import { auth } from '@/libs/lucia';
import prisma from '@/libs/prisma';

export const updateUser = async (formData: FormData) => {
  const authRequest = auth.handleRequest('POST', context);
  const session = await authRequest.validate();
  if (!session) throw new UnauthorizedError();

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  if (!name && !email) throw new BadRequestError('Invalid form data');
  if (name) {
    if (name.length > 32) throw new BadRequestError('Name is too long');

    await prisma.user.update({
      where: { id: session.user.userId },
      data: { name },
    });
  }
  if (email) {
    await prisma.user.update({
      where: { id: session.user.userId },
      data: { email },
    });
  }
};

export const deleteUser = async () => {
  const authRequest = auth.handleRequest('POST', context);
  const session = await authRequest.validate();
  if (!session) throw new UnauthorizedError();

  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);

  await prisma.user.delete({ where: { id: session.user.userId } });
};

export const createLink = async (formData: FormData) => {
  const authRequest = auth.handleRequest('POST', context);
  const session = await authRequest.validate();
  if (!session) throw new UnauthorizedError();

  const dest = formData.get('destination') as string;
  const userId = session.user.userId;

  const limit = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { day_limit: true, total_limit: true },
  });

  if (limit.day_limit === 0) throw new BadRequestError('Daily limits reached');
  if (limit.total_limit === 0)
    throw new BadRequestError('Total limits reached');

  const destination = new URL(dest).toString();
  const link = await prisma.url.findFirst({
    where: {
      user: { id: userId },
      target_url: destination,
    },
  });
  if (link) throw new BadRequestError('Already exists');

  const DESCRIPTION_SELECTOR = 'meta[name="description"]';
  const IMAGE_SELECTOR = 'meta[property="og:image"]';

  const id = await generateId();
  const browser = await puppeteer.connect({
    browserWSEndpoint: process.env.BROWSER_WS_ENDPOINT,
  });
  const page = await browser.newPage();
  await page.goto(destination);
  await Promise.race([
    page.waitForSelector(DESCRIPTION_SELECTOR),
    page.waitForSelector(IMAGE_SELECTOR),
    page.waitForNetworkIdle({ idleTime: 1000, timeout: 5000 }),
  ]);
  const html = await page.content();
  await browser.close();
  const $ = load(html);
  const getMetadata = (selector: string) => $(selector).attr('content');
  const title = $('title').text();
  const description = getMetadata(DESCRIPTION_SELECTOR);
  const image = getMetadata(IMAGE_SELECTOR);
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
};

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const generateId = async (): Promise<string> => {
  const nanoid = customAlphabet(alphabet, 7);
  const id = nanoid();
  const link = await prisma.url.findUnique({ where: { id } });

  if (link) return generateId();
  else return id;
};
