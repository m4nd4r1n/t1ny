import { headers } from 'next/headers';

import { AreaChart } from '@/components/AreaChart';
import { BarList } from '@/components/BarList';
import CardWithTitle from '@/components/CardWithTitle';
import ImageWithFallback from '@/components/ImageWithFallback';
import { ProgressBar } from '@/components/ProgressBar';
import { API } from '@/libs/api';

const DAY_MAX = 20;
const TOTAL_MAX = 500;

const AppPage = async () => {
  const header = Object.fromEntries(headers());
  const [{ day_limit, total_limit }, visitors, trending] = await Promise.all([
    API.getLinkLimits(header),
    API.getClicks(header),
    API.getTrending(header),
  ]);
  const trendingWithIcon = trending.map((item) => ({
    ...item,
    icon: () => (
      <ImageWithFallback
        key={item.href}
        className='shrink-0 rounded-full'
        src={item.icon}
        alt='trending icon'
        fallbackSrc='https://www.notion.so/icons/globe_gray.svg'
        width={20}
        height={20}
      />
    ),
  }));

  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <CardWithTitle title='Total link clicks'>
        <AreaChart
          className='h-48'
          data={visitors}
          categories={['Link clicks']}
          index='date'
          showLegend={false}
          showGridLines={false}
          startEndOnly
          showYAxis={false}
        />
      </CardWithTitle>
      <div className='flex flex-col gap-8 lg:grid lg:grid-cols-2'>
        <CardWithTitle title='Link usage'>
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
        </CardWithTitle>
        <CardWithTitle title='Trending links'>
          <BarList data={trendingWithIcon} />
        </CardWithTitle>
      </div>
    </div>
  );
};

export default AppPage;
