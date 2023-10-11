import type { Metadata } from 'next';
import { headers } from 'next/headers';

import { getLinkLimits } from '@/libs/api';

import CreateNewLink from './CreateNewLink';
import LinkList from './LinkList';
import type { LinkLimits } from './types';

const fetchLinkLimits = async () => {
  const res = await getLinkLimits(Object.fromEntries(headers()));

  if (!res.ok) throw new Error('Failed to fetch data');

  return (await res.json()) as LinkLimits;
};

const LinksPage = async () => {
  const { day_limit, total_limit } = await fetchLinkLimits();

  return (
    <div className='flex h-full flex-col gap-8'>
      <div className='flex w-full justify-between'>
        <h1 className='text-3xl font-bold'>All links</h1>
        <CreateNewLink day_limit={day_limit} total_limit={total_limit} />
      </div>
      <LinkList />
    </div>
  );
};

export const metadata: Metadata = {
  title: 't1ny | Links',
};

export default LinksPage;
