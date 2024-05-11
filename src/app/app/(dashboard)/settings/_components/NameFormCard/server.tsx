import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getProfile } from '@/libs/supabase/queries';
import { useSupabaseServer } from '@/libs/supabase/server';
import NameFormCardClient from './client';
import NameFormCardSkeleton from './skeleton';

const NameFormCard = () => {
  return (
    <Suspense fallback={<NameFormCardSkeleton isDisabled />}>
      <NameFormCardImpl />
    </Suspense>
  );
};

const NameFormCardImpl = async () => {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await prefetchQuery(queryClient, getProfile(supabase));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NameFormCardClient />
    </HydrationBoundary>
  );
};

export default NameFormCard;
