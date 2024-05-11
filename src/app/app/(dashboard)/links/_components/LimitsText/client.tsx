'use client';

import type { FC } from 'react';

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { useSupabaseBrowser } from '@/libs/supabase/client';
import { getUrlLimits } from '@/libs/supabase/queries';

interface LimitsTextClientProps {
  type: 'day' | 'total';
}

const LimitsTextClient: FC<LimitsTextClientProps> = ({ type }) => {
  const supabase = useSupabaseBrowser();
  const { data } = useQuery(getUrlLimits(supabase));

  if (!data) return null;

  let limit: number;

  if (type === 'day') limit = data.day_limit;
  else limit = data.total_limit;

  return <span className='font-bold text-default'>{limit}</span>;
};

export default LimitsTextClient;
