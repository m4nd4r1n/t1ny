'use server';

import type { NewLinkForm } from './schema';

import { load } from 'cheerio';
import { customAlphabet } from 'nanoid';
import puppeteer from 'puppeteer-core';

import {
  createLink,
  decreaseUrlLimit,
  deleteLink,
  getLinkByIdAdmin,
  getLinkByUrl,
  getUrlLimits,
  increaseUrlTotalLimit,
} from '@/libs/supabase/db';
import {
  failureResponse,
  successResponse,
} from '@/utils/server-action-response';
import { newLinkFormSchema } from './schema';

export const createLinkAction = async (values: NewLinkForm) => {
  const result = newLinkFormSchema.safeParse(values);
  if (!result.success) {
    return failureResponse(result.error.message);
  }
  const { day_limit, total_limit } = await getUrlLimits();

  if (day_limit === 0) return failureResponse('Daily limits reached.');
  if (total_limit === 0) return failureResponse('Total limits reached.');

  const { destination: dest } = values;

  const destination = new URL(dest).toString();

  const link = await getLinkByUrl(destination);
  if (link && link.target_url) return failureResponse('Link already exists.');

  const DESCRIPTION_SELECTOR = 'meta[name="description"]';
  const IMAGE_SELECTOR = 'meta[property="og:image"]';

  const [id, browser] = await Promise.all([
    generateId(),
    puppeteer.connect({
      browserWSEndpoint: process.env.BROWSER_WS_ENDPOINT,
    }),
  ]);
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

  await createLink({
    id,
    target_url: destination,
    target_title: title,
    target_description: description,
    target_og_image: image,
    target_favicon: `https://www.google.com/s2/favicons?domain=${targetDomain}&sz=32`,
  });

  await decreaseUrlLimit();

  return successResponse('Link created successfully!');
};

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const generateId = async (): Promise<string> => {
  const nanoid = customAlphabet(alphabet, 7);
  const id = nanoid();
  const link = await getLinkByIdAdmin(id);

  if (link) return await generateId();
  else return id;
};

export const deleteLinkAction = async (id: string) => {
  await deleteLink(id);
  await increaseUrlTotalLimit();
  return successResponse('Link deleted.');
};
