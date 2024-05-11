import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getUrlLimits } from '@/libs/supabase/queries';
import { useSupabaseServer } from '@/libs/supabase/server';
import LimitsTextClient from './client';

const LimitsText = () => {
  return (
    <div className='mt-1.5 text-sm text-default-500'>
      <Suspense>
        <LimitsTextImpl />
      </Suspense>
    </div>
  );
};

const LimitsTextImpl = async () => {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await prefetchQuery(queryClient, getUrlLimits(supabase));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        You can create <LimitsTextClient type='day' /> more links today.
      </div>
      <div>
        You can create <LimitsTextClient type='total' /> more links in total.
      </div>
    </HydrationBoundary>
  );
};

export default LimitsText;
