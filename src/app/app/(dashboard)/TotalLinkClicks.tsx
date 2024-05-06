import { Suspense } from 'react';

import { AreaChart } from '@/components/AreaChart';
import CardWithTitle from '@/components/CardWithTitle';
import { Skeleton } from '@/components/Skeleton';
import { getClicks } from '@/libs/supabase/db';

const COUNT_KEY = 'Link clicks';

const TotalLinkClicks = () => {
  return (
    <CardWithTitle title='Total link clicks'>
      <Suspense fallback={<Skeleton className='h-[228px]' />}>
        <TotalLinkClicksImpl />
      </Suspense>
    </CardWithTitle>
  );
};

const TotalLinkClicksImpl = async () => {
  const data = await getClicks();

  const formattedData = data.map(({ count, date }) => ({
    [COUNT_KEY]: Number(count),
    date: Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: '2-digit',
      day: date.length === 7 ? '2-digit' : undefined,
    }).format(new Date(date)),
  }));

  const totalClicks = Intl.NumberFormat().format(
    formattedData.reduce((acc, { 'Link clicks': clicks }) => acc + clicks, 0),
  );

  return (
    <>
      <div className='-mt-2 mb-2 text-3xl font-bold'>{totalClicks}</div>
      <AreaChart
        className='h-48'
        data={formattedData}
        categories={[COUNT_KEY]}
        index='date'
        showLegend={false}
        showGridLines={false}
        startEndOnly
        showYAxis={false}
      />
    </>
  );
};

export default TotalLinkClicks;
