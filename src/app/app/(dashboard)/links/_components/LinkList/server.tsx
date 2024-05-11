import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getLinks } from '@/libs/supabase/queries';
import { useSupabaseServer } from '@/libs/supabase/server';
import LinkListClient from './client';

const LinkList = () => {
  return (
    <div className='flex h-full flex-col gap-4 overflow-y-scroll'>
      <Suspense>
        <LinkListImpl />
      </Suspense>
    </div>
  );
};

const LinkListImpl = async () => {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await prefetchQuery(queryClient, getLinks(supabase));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LinkListClient />
    </HydrationBoundary>
  );
};

export default LinkList;
