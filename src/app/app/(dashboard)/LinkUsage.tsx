import { Suspense } from 'react';

import CardWithTitle from '@/components/CardWithTitle';
import { ProgressBar } from '@/components/ProgressBar';
import { Skeleton } from '@/components/Skeleton';
import { getUrlLimits } from '@/libs/supabase/db';

const DAY_MAX = 20;
const TOTAL_MAX = 500;

const LinkUsage = () => {
  return (
    <CardWithTitle title='Link usage'>
      <Suspense fallback={<Skeleton className='h-[140px]' />}>
        <LinkUsageImpl />
      </Suspense>
    </CardWithTitle>
  );
};

const LinkUsageImpl = async () => {
  const { day_limit, total_limit } = await getUrlLimits();

  return (
    <>
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
    </>
  );
};

export default LinkUsage;
