import { Suspense } from 'react';

import { BarList } from '@/components/BarList';
import CardWithTitle from '@/components/CardWithTitle';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Skeleton } from '@/components/Skeleton';
import { FALLBACK_IMAGE_URL } from '@/constants/urls';
import { getTrending } from '@/libs/supabase/db';

const TrendingLinks = () => {
  return (
    <CardWithTitle title='Trending links'>
      <Suspense fallback={<Skeleton className='h-[140px]' />}>
        <TrendingLinksImpl />
      </Suspense>
    </CardWithTitle>
  );
};

const TrendingLinksImpl = async () => {
  const trending = await getTrending();
  const trendingWithIcon = trending.map((item) => ({
    ...item,
    icon: () => (
      <ImageWithFallback
        key={item.href}
        className='shrink-0 rounded-full'
        src={item.icon}
        alt='trending icon'
        fallbackSrc={FALLBACK_IMAGE_URL}
        width={20}
        height={20}
      />
    ),
  }));

  return (
    <>
      <div className='mb-2 flex justify-between text-sm font-bold'>
        <span>Title</span>
        <span>Clicks</span>
      </div>
      <BarList data={trendingWithIcon} />
    </>
  );
};

export default TrendingLinks;
