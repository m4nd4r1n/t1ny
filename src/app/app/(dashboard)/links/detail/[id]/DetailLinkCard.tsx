import type { FC } from 'react';

import { Suspense } from 'react';

import Card from '@/components/Card';
import { Skeleton } from '@/components/Skeleton';
import { getLinkById } from '@/libs/supabase/db';
import LinkCard from '../../LinkCard';

interface DetailLinkCardProps {
  id: string;
}

const DetailLinkCard: FC<DetailLinkCardProps> = (props) => {
  return (
    <Suspense
      fallback={
        <Card className='flex flex-col gap-4 lg:flex-row'>
          <Skeleton className='h-[132px] w-full' />
          <Skeleton className='h-[49px] w-full lg:w-[399px]' />
        </Card>
      }
    >
      <DetailLinkCardImpl {...props} />
    </Suspense>
  );
};

const DetailLinkCardImpl: FC<DetailLinkCardProps> = async ({ id }) => {
  const link = await getLinkById(id);

  return <LinkCard link={link} isTitleLink={false} />;
};

export default DetailLinkCard;
