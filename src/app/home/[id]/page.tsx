import type { Metadata } from 'next';

import { cookies, headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import UAParser from 'ua-parser-js';

import {
  createAnalytics,
  getLinkById,
  updateUrlClick,
} from '@/libs/supabase/queries';
import { createSupabaseAdmin, useSupabaseAdmin } from '@/libs/supabase/server';
import { TypedSupabaseClient } from '@/types/supabase';

interface RedirectProps {
  params: { id: string };
}

const Redirect = async ({ params: { id } }: RedirectProps) => {
  const cookieStore = cookies();
  const supabase = useSupabaseAdmin(cookieStore);
  const { data: link } = await getLinkById(supabase, id);

  if (!link) {
    notFound();
  } else {
    await createAnalytic(supabase, id);
    redirect(link.target_url);
  }
};

const createAnalytic = async (client: TypedSupabaseClient, id: string) => {
  const header = headers();
  const userAgent = header.get('user-agent') ?? undefined;
  const ip = header.get('x-real-ip') ?? undefined;
  const country = header.get('x-geoip-country') ?? undefined;
  const parser = new UAParser(userAgent ?? '');
  const { name: browser } = parser.getBrowser();
  const { name: os } = parser.getOS();
  const { model: device } = parser.getDevice();

  const { data } = await getLinkById(client, id);

  if (!data) return;

  await Promise.all([
    updateUrlClick(client, id, data.clicks + 1),
    createAnalytics(client, {
      browser,
      url_id: id,
      device,
      ip_address: ip,
      country,
      os,
      user_agent: userAgent,
    }),
  ]);
};

export const generateMetadata = async ({
  params: { id },
}: RedirectProps): Promise<Metadata> => {
  const cookieStore = cookies();
  const supabase = createSupabaseAdmin(cookieStore);
  const { data: link } = await getLinkById(supabase, id);
  if (!link) return {};

  const {
    target_title: title,
    target_description: description,
    target_og_image: image,
  } = link;

  return {
    title,
    description,
    openGraph: {
      title: title ?? undefined,
      description: description ?? undefined,
      images: image ?? undefined,
    },
  };
};

export default Redirect;
