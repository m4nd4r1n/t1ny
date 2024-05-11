'use client';

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { AreaChart } from '@/components/AreaChart';
import { useSupabaseBrowser } from '@/libs/supabase/client';
import {
  getAnalyticsCountByDay,
  getAnalyticsCountByMonth,
} from '@/libs/supabase/queries';

const COUNT_KEY = 'Link clicks';

const TotalLinkClicksClient = () => {
  const supabase = useSupabaseBrowser();
  const { data: countByMonth } = useQuery(getAnalyticsCountByMonth(supabase));
  const { data: countByDay } = useQuery(getAnalyticsCountByDay(supabase));

  if (!countByMonth || !countByDay) return null;

  let data: { count: number; date: string }[];

  if (countByMonth.length <= 1) data = countByDay;
  else data = countByMonth;

  const formattedData = data.map(({ count, date }) => ({
    [COUNT_KEY]: Number(count),
    date: Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: '2-digit',
      day: date.length !== 7 ? '2-digit' : undefined,
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

export default TotalLinkClicksClient;
