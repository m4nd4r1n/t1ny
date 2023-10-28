import type { Metadata } from 'next';
import { headers } from 'next/headers';

import { API } from '@/libs/api';

import CreateNewLink from './CreateNewLink';
import LinkList from './LinkList';

const LinksPage = async () => {
  const { day_limit, total_limit } = await API.getLinkLimits(
    Object.fromEntries(headers()),
  );

  return (
    <>
      <div className='flex w-full justify-between'>
        <h1 className='text-3xl font-bold'>All links</h1>
        <CreateNewLink day_limit={day_limit} total_limit={total_limit} />
      </div>
      <LinkList />
    </>
  );
};

export const metadata: Metadata = {
  title: 't1ny | Links',
};

export default LinksPage;
