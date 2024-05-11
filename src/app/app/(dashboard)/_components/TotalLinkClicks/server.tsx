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
import {
  getAnalyticsCountByDay,
  getAnalyticsCountByMonth,
} from '@/libs/supabase/queries';
import { useSupabaseServer } from '@/libs/supabase/server';
import TotalLinkClicksClient from './client';

const TotalLinkClicks = () => {
  return (
    <CardWithTitle title='Total link clicks'>
      <Suspense fallback={<Skeleton className='h-[228px]' />}>
        <TotalLinkClicksImpl />
      </Suspense>
    </CardWithTitle>
  );
};

const TotalLinkClicksImpl = async () => {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await Promise.all([
    prefetchQuery(queryClient, getAnalyticsCountByMonth(supabase)),
    prefetchQuery(queryClient, getAnalyticsCountByDay(supabase)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TotalLinkClicksClient />
    </HydrationBoundary>
  );
};

export default TotalLinkClicks;
