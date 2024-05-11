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
import { getUrlLimits } from '@/libs/supabase/queries';
import { useSupabaseServer } from '@/libs/supabase/server';
import LinkUsageClient from './client';

const LinkUsage = () => {
  return (
    <CardWithTitle title='Link usage'>
      <Suspense fallback={<Skeleton className='h-[140px]' />}>
        <LinkUsageImpl />
      </Suspense>
    </CardWithTitle>
  );
};

const LinkUsageImpl = async () => {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await prefetchQuery(queryClient, getUrlLimits(supabase));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LinkUsageClient />
    </HydrationBoundary>
  );
};

export default LinkUsage;
