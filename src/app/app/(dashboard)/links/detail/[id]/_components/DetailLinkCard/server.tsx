import type { FC } from 'react';

import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import Card from '@/components/Card';
import { Skeleton } from '@/components/Skeleton';
import { getLinkById } from '@/libs/supabase/queries';
import { useSupabaseServer } from '@/libs/supabase/server';
import DetailLinkCardClient from './client';

export interface DetailLinkCardProps {
  id: string;
}

const DetailLinkCard: FC<DetailLinkCardProps> = (props) => {
  return (
    <Suspense
      fallback={
        <Card className='flex flex-col gap-4 lg:flex-row'>
          <Skeleton className='h-[132px] w-full' />
          <Skeleton className='h-[49px] w-full lg:w-[399px]' />
        </Card>
      }
    >
      <DetailLinkCardImpl {...props} />
    </Suspense>
  );
};

const DetailLinkCardImpl: FC<DetailLinkCardProps> = async ({ id }) => {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await prefetchQuery(queryClient, getLinkById(supabase, id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailLinkCardClient id={id} />
    </HydrationBoundary>
  );
};

export default DetailLinkCard;
