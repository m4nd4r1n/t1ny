import type { FC } from 'react';

import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import LinkClickChartCardClient from '@/app/app/(dashboard)/links/detail/[id]/_components/LinkClickChartCard/client';
import CardWithTitle from '@/components/CardWithTitle';
import { Skeleton } from '@/components/Skeleton';
import {
  getAnalyticsCountByDayWithId,
  getAnalyticsCountByMonthWithId,
} from '@/libs/supabase/queries';
import { useSupabaseServer } from '@/libs/supabase/server';

export interface LinkClickChartCardProps {
  id: string;
}

const LinkClickChartCard: FC<LinkClickChartCardProps> = ({ id }) => {
  return (
    <CardWithTitle title='Link clicks'>
      <Suspense
        fallback={
          <>
            <Skeleton className='mb-1 h-8 w-full' />
            <Skeleton className='h-80 w-full' />
          </>
        }
      >
        <LinkClickChartCardImpl id={id} />
      </Suspense>
    </CardWithTitle>
  );
};

const LinkClickChartCardImpl: FC<LinkClickChartCardProps> = async ({ id }) => {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await Promise.all([
    prefetchQuery(queryClient, getAnalyticsCountByMonthWithId(supabase, id)),
    prefetchQuery(queryClient, getAnalyticsCountByDayWithId(supabase, id)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LinkClickChartCardClient id={id} />
    </HydrationBoundary>
  );
};

export default LinkClickChartCard;
