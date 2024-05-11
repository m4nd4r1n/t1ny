import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import CardWithTitle from '@/components/CardWithTitle';
import { Skeleton } from '@/components/Skeleton';
import { getTrending } from '@/libs/supabase/queries';
import { useSupabaseServer } from '@/libs/supabase/server';
import TrendingLinksClient from './client';

const TrendingLinks = () => {
  return (
    <CardWithTitle title='Trending links'>
      <div className='mb-2 flex justify-between text-sm font-bold'>
        <span>Title</span>
        <span>Clicks</span>
      </div>
      <Suspense fallback={<Skeleton className='h-[140px]' />}>
        <TrendingLinksImpl />
      </Suspense>
    </CardWithTitle>
  );
};

const TrendingLinksImpl = async () => {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await prefetchQuery(queryClient, getTrending(supabase));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TrendingLinksClient />
    </HydrationBoundary>
  );
};

export default TrendingLinks;
