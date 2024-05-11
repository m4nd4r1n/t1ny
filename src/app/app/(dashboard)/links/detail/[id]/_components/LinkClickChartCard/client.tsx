'use client';

import type { FC } from 'react';
import type { LinkClickChartCardProps } from './server';

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { AreaChart } from '@/components/AreaChart';
import { useSupabaseBrowser } from '@/libs/supabase/client';
import {
  getAnalyticsCountByDayWithId,
  getAnalyticsCountByMonthWithId,
} from '@/libs/supabase/queries';

const COUNT_KEY = 'Link clicks';

const LinkClickChartCardClient: FC<LinkClickChartCardProps> = ({ id }) => {
  const supabase = useSupabaseBrowser();
  const { data: countByMonth } = useQuery(
    getAnalyticsCountByMonthWithId(supabase, id),
  );
  const { data: countByDay } = useQuery(
    getAnalyticsCountByDayWithId(supabase, id),
  );

  if (!countByMonth || !countByDay) return null;

  let data: { count: number; date: string }[];

  if (countByMonth.length <= 1) data = countByDay;
  else data = countByMonth;

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

export default LinkClickChartCardClient;
