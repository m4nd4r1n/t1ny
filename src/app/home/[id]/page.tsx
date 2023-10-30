import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import UAParser from 'ua-parser-js';

import prisma from '@/libs/prisma';

interface RedirectProps {
  params: { id: string };
}

const Redirect = async ({ params: { id } }: RedirectProps) => {
  const link = await getLink(id);

  if (!link) {
    notFound();
  } else {
    await createAnalytics(id);
    redirect(link.target_url);
  }
};

const getLink = (id: string) => {
  return prisma.url.findUnique({
    where: { id },
  });
};

const createAnalytics = async (id: string) => {
  const header = headers();
  const userAgent = header.get('user-agent');
  const ip = header.get('x-real-ip');
  const country = header.get('x-geoip-countries');
  const parser = new UAParser(userAgent ?? '');
  const { name: browser } = parser.getBrowser();
  const { name: os } = parser.getOS();
  const { model: device } = parser.getDevice();

  await Promise.all([
    prisma.url.update({
      where: { id },
      data: { clicks: { increment: 1 } },
    }),
    prisma.analytics.create({
      data: {
        ip_address: ip,
        user_agent: userAgent,
        country,
        url: { connect: { id } },
        browser,
        os,
        device,
      },
    }),
  ]);
};

export const generateMetadata = async ({
  params,
}: RedirectProps): Promise<Metadata> => {
  const { id } = params;
  const link = await getLink(id);
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
