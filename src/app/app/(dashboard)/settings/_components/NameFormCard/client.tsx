'use client';

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { useSupabaseBrowser } from '@/libs/supabase/client';
import { getProfile } from '@/libs/supabase/queries';
import { updateName } from '../../actions';
import NameFormCardSkeleton from './skeleton';

const NameFormCardClient = () => {
  const supabase = useSupabaseBrowser();
  const { data: profile } = useQuery(getProfile(supabase));

  if (!profile) return null;

  const { name } = profile;

  return <NameFormCardSkeleton name={name} submit={updateName} />;
};

export default NameFormCardClient;
