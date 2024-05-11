'use server';

import type { NewLinkForm } from './schema';

import { cookies } from 'next/headers';
import { load } from 'cheerio';
import { customAlphabet } from 'nanoid';
import puppeteer from 'puppeteer-core';

import {
  createLink,
  deleteLink,
  getLinkById,
  getLinkByUrl,
  getUrlLimits,
  updateUrlLimit,
} from '@/libs/supabase/queries';
import { createServerActionClient } from '@/libs/supabase/server';
import { TypedSupabaseClient } from '@/types/supabase';
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
  const cookieStore = cookies();
  const supabase = createServerActionClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return failureResponse('Could not authenticate user');

  const { data: limit } = await getUrlLimits(supabase);
  if (!limit) return failureResponse('Server error occurred.');
  if (limit.day_limit === 0) return failureResponse('Daily limits reached.');
  if (limit.total_limit === 0) return failureResponse('Total limits reached.');

  const { destination: dest } = values;

  const destination = new URL(dest).toString();

  const { data: link } = await getLinkByUrl(supabase, destination);
  if (link && link.target_url) return failureResponse('Link already exists.');

  const DESCRIPTION_SELECTOR = 'meta[name="description"]';
  const IMAGE_SELECTOR = 'meta[property="og:image"]';

  const [id, browser] = await Promise.all([
    generateId(supabase),
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

  await createLink(supabase, {
    id,
    target_url: destination,
    target_title: title,
    target_description: description,
    target_og_image: image,
    target_favicon: `https://www.google.com/s2/favicons?domain=${targetDomain}&sz=32`,
  });

  await updateUrlLimit(supabase, user.id, {
    dayLimit: limit.day_limit - 1,
    totalLimit: limit.total_limit - 1,
  });

  return successResponse('Link created successfully!');
};

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const generateId = async (client: TypedSupabaseClient): Promise<string> => {
  const nanoid = customAlphabet(alphabet, 7);
  const id = nanoid();
  const { data: link } = await getLinkById(client, id);

  if (link) return await generateId(client);
  else return id;
};

export const deleteLinkAction = async (id: string) => {
  const cookieStore = cookies();
  const supabase = createServerActionClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return failureResponse('Could not authenticate user');

  const { data: limit } = await getUrlLimits(supabase);
  if (!limit) return failureResponse('Server error occurred.');

  let { total_limit: totalLimit } = limit;
  if (totalLimit < 500) totalLimit += 1;

  await deleteLink(supabase, id);
  await updateUrlLimit(supabase, user.id, { totalLimit });
  return successResponse('Link deleted.');
};
