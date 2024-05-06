import { Suspense } from 'react';

import { getUrlLimits } from '@/libs/supabase/db';

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
  const { day_limit, total_limit } = await getUrlLimits();

  return (
    <>
      <div>
        You can create{' '}
        <span className='font-bold text-default'>{day_limit}</span> more links
        today.
      </div>
      <div>
        You can create{' '}
        <span className='font-bold text-default'>{total_limit}</span> more links
        in total.
      </div>
    </>
  );
};

export default LimitsText;
