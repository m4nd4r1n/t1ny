import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import ProfileClient from '@/app/app/(dashboard)/_components/Profile/client';
import { Skeleton } from '@/components/Skeleton';
import { getProfile } from '@/libs/supabase/queries';
import { useSupabaseServer } from '@/libs/supabase/server';

const Profile = () => {
  return (
    <div className='flex w-full flex-1 items-center gap-2 rounded-lg px-2 py-1.5'>
      <Suspense
        fallback={
          <>
            <Skeleton className='h-5 w-5 rounded-full bg-default-200' />
            <Skeleton className='h-5 w-20 bg-default-200' />
          </>
        }
      >
        <ProfileImpl />
      </Suspense>
    </div>
  );
};

const ProfileImpl = async () => {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await prefetchQuery(queryClient, getProfile(supabase));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileClient />
    </HydrationBoundary>
  );
};

export default Profile;
