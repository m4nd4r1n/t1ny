import { headers } from 'next/headers';
import Image from 'next/image';

import { getLinks } from '@/libs/api';

import LinkListItem from './LinkListItem';
import type { Links } from './types';

const fetchLinks = async () => {
  const res = await getLinks(Object.fromEntries(headers()));

  if (!res.ok) throw new Error('Failed to fetch data');

  return (await res.json()) as Links;
};

const LinkList = async () => {
  const links = await fetchLinks();

  return (
    <div className='flex h-full flex-col gap-4 overflow-y-scroll'>
      {links.map((link) => (
        <LinkListItem key={link.id} link={link} />
      ))}
      {!!links.length && (
        <div className='flex items-center justify-center gap-4 before:h-px before:w-16 before:border-b before:border-default-500 after:h-px after:w-16 after:border-b after:border-default-500'>
          End of your links
        </div>
      )}
      {!links.length && (
        <div className='flex flex-col items-center gap-4'>
          <h1 className='text-4xl font-bold'>No Links Yet</h1>
          <Image
            src='https://illustrations.popsy.co/gray/app-launch.svg'
            alt='Link banner'
            width={400}
            height={400}
          />
          <p className='text-lg text-default-500'>
            You do not have any links yet. Create one to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default LinkList;
