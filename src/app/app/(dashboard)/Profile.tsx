import Image from 'next/image';
import { Suspense } from 'react';

import { Skeleton } from '@/components/Skeleton';
import { getProfile } from '@/libs/supabase/db';

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
  const { name, avatar } = await getProfile();

  return (
    <>
      {avatar && (
        <Image
          src={avatar}
          width={40}
          height={40}
          alt={name}
          className='h-6 w-6 rounded-full'
        />
      )}
      <span className='truncate text-sm font-medium'>{name}</span>
    </>
  );
};

export default Profile;
