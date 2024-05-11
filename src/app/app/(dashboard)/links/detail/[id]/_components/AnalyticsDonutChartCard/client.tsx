'use client';

import type { AnalyticsDonutChartCardProps, QueryFn } from './server';

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { DonutChart } from '@/components/DonutChart';
import { useSupabaseBrowser } from '@/libs/supabase/client';
import {
  getBrowsersById,
  getCountriesById,
  getDevicesById,
  getOSsById,
} from '@/libs/supabase/queries';

const AnalyticsDonutChartCardClient = <T extends QueryFn>({
  urlId,
  ...props
}: Omit<AnalyticsDonutChartCardProps<T>, 'title' | 'getData'>) => {
  const supabase = useSupabaseBrowser();
  const { data } = useQuery(getDataMap[props.index as Key](supabase, urlId));

  if (!data) return null;

  return <DonutChart className='h-40' data={data} {...props} />;
};

export default AnalyticsDonutChartCardClient;

type Key = 'country' | 'device' | 'browser' | 'os';

const getDataMap: { [key in Key]: QueryFn } = {
  country: getCountriesById,
  device: getDevicesById,
  browser: getBrowsersById,
  os: getOSsById,
};
