'use client';

import Image from 'next/image';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { useSupabaseBrowser } from '@/libs/supabase/client';
import { getLinks } from '@/libs/supabase/queries';
import LinkCard from '../LinkCard';

const LinkListClient = () => {
  const supabase = useSupabaseBrowser();
  const { data: links } = useQuery(getLinks(supabase));

  if (!links) return null;

  return (
    <>
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
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
    </>
  );
};

export default LinkListClient;
