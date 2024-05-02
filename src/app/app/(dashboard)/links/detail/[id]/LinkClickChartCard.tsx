import type { FC } from 'react';

import { Suspense } from 'react';

import { AreaChart } from '@/components/AreaChart';
import CardWithTitle from '@/components/CardWithTitle';
import { Skeleton } from '@/components/Skeleton';
import { getClicksById } from '@/libs/supabase/db';

interface LinkClickChartCardProps {
  id: string;
}

const LinkClickChartCard: FC<LinkClickChartCardProps> = ({ id }) => {
  return (
    <CardWithTitle title='Link clicks'>
      <Suspense
        fallback={
          <>
            <Skeleton className='mb-1 h-8 w-full' />
            <Skeleton className='h-80 w-full' />
          </>
        }
      >
        <LinkClickChartCardImpl id={id} />
      </Suspense>
    </CardWithTitle>
  );
};

const COUNT_KEY = 'Link clicks';

const LinkClickChartCardImpl: FC<LinkClickChartCardProps> = async ({ id }) => {
  const data = await getClicksById(id);

  const clicks = data.map(({ count, date }) => ({
    [COUNT_KEY]: Number(count),
    date: Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: '2-digit',
      day: date.length === 7 ? '2-digit' : undefined,
    }).format(new Date(date)),
  }));

  const totalClicks = Intl.NumberFormat().format(
    clicks.reduce((acc, { 'Link clicks': clicks }) => acc + clicks, 0),
  );

  return (
    <>
      <div className='-mt-2 mb-2 text-3xl font-bold'>{totalClicks}</div>
      <AreaChart
        className='h-80'
        data={clicks}
        categories={['Link clicks']}
        index='date'
      />
    </>
  );
};

export default LinkClickChartCard;
