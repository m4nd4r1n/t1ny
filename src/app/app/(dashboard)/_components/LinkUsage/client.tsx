'use client';

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { ProgressBar } from '@/components/ProgressBar';
import { useSupabaseBrowser } from '@/libs/supabase/client';
import { getUrlLimits } from '@/libs/supabase/queries';

const DAY_MAX = 20;
const TOTAL_MAX = 500;

const LinkUsageClient = () => {
  const supabase = useSupabaseBrowser();
  const { data: limit } = useQuery(getUrlLimits(supabase));

  if (!limit) return null;

  const { day_limit, total_limit } = limit;

  return (
    <div className='space-y-8'>
      <ProgressBar
        value={DAY_MAX - day_limit}
        max={DAY_MAX}
        label="Today's usage"
        unit='used'
      />
      <ProgressBar
        value={TOTAL_MAX - total_limit}
        max={TOTAL_MAX}
        label='Total usage'
        unit='used'
      />
    </div>
  );
};

export default LinkUsageClient;
