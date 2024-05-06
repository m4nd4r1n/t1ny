import type { Metadata } from 'next';

import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import UAParser from 'ua-parser-js';

import {
  createAnalytics,
  getLinkByIdAdmin,
  increaseUrlClick,
} from '@/libs/supabase/db';

interface RedirectProps {
  params: { id: string };
}

const Redirect = async ({ params: { id } }: RedirectProps) => {
  const link = await getLinkByIdAdmin(id);

  if (!link) {
    notFound();
  } else {
    await createAnalytic(id);
    redirect(link.target_url);
  }
};

const createAnalytic = async (id: string) => {
  const header = headers();
  const userAgent = header.get('user-agent') ?? undefined;
  const ip = header.get('x-real-ip') ?? undefined;
  const country = header.get('x-geoip-country') ?? undefined;
  const parser = new UAParser(userAgent ?? '');
  const { name: browser } = parser.getBrowser();
  const { name: os } = parser.getOS();
  const { model: device } = parser.getDevice();

  await Promise.all([
    increaseUrlClick(id),
    createAnalytics({
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
  const link = await getLinkByIdAdmin(id);
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
