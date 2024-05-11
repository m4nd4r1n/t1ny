'use client';

import Image from 'next/image';
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { useSupabaseBrowser } from '@/libs/supabase/client';
import { getProfile } from '@/libs/supabase/queries';

const ProfileClient = () => {
  const supabase = useSupabaseBrowser();
  const { data: profile } = useQuery(getProfile(supabase));

  if (!profile) return null;

  const { avatar, name } = profile;

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

export default ProfileClient;
