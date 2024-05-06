import { Suspense } from 'react';

import CardWithTitle from '@/components/CardWithTitle';
import { DonutChart } from '@/components/DonutChart';
import { Skeleton } from '@/components/Skeleton';

interface AnalyticsDonutChartCardProps<T> {
  id: string;
  getData: (id: string) => Promise<T[]>;
  category: keyof T & string;
  index: keyof T & string;
  title: string;
  label: string;
}

const AnalyticsDonutChartCard = <T extends Record<string, string | number>>({
  title,
  ...props
}: AnalyticsDonutChartCardProps<T>) => {
  return (
    <CardWithTitle title={title}>
      <Suspense fallback={<Skeleton className='h-40 w-full' />}>
        <AnalyticsDonutChartCardImpl {...props} />
      </Suspense>
    </CardWithTitle>
  );
};

const AnalyticsDonutChartCardImpl = async <
  T extends Record<string, string | number>,
>({
  id,
  getData,
  ...props
}: Omit<AnalyticsDonutChartCardProps<T>, 'title'>) => {
  const data = await getData(id);

  return <DonutChart className='h-40' data={data} {...props} />;
};

export default AnalyticsDonutChartCard;
