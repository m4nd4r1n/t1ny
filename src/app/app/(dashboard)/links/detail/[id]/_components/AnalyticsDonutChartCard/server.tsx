import type { TypedSupabaseClient } from '@/types/supabase';

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
import { useSupabaseServer } from '@/libs/supabase/server';
import AnalyticsDonutChartCardClient from './client';

export type QueryFn = (
  client: TypedSupabaseClient,
  id: string,
) => ReturnType<TypedSupabaseClient['rpc']>;

export interface AnalyticsDonutChartCardProps<T extends QueryFn> {
  urlId: string;
  getData: T;
  category: keyof Exclude<Awaited<ReturnType<T>>['data'], null>[number] &
    string;
  index: keyof Exclude<Awaited<ReturnType<T>>['data'], null>[number] & string;
  title: string;
  label: string;
}

const AnalyticsDonutChartCard = <T extends QueryFn>({
  title,
  ...props
}: AnalyticsDonutChartCardProps<T>) => {
  return (
    <CardWithTitle title={title}>
      <Suspense fallback={<Skeleton className='h-40 w-full' />}>
        <AnalyticsDonutChartCardImpl {...props} />
      </Suspense>
    </CardWithTitle>
  );
};

const AnalyticsDonutChartCardImpl = async <T extends QueryFn>({
  urlId,
  getData,
  ...props
}: Omit<AnalyticsDonutChartCardProps<T>, 'title'>) => {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await prefetchQuery(queryClient, getData(supabase, urlId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnalyticsDonutChartCardClient urlId={urlId} {...props} />
    </HydrationBoundary>
  );
};

export default AnalyticsDonutChartCard;
