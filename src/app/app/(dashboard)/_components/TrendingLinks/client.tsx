'use client';

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import { BarList } from '@/components/BarList';
import ImageWithFallback from '@/components/ImageWithFallback';
import { FALLBACK_IMAGE_URL } from '@/constants/urls';
import { useSupabaseBrowser } from '@/libs/supabase/client';
import { getTrending } from '@/libs/supabase/queries';

const TrendingLinksClient = () => {
  const supabase = useSupabaseBrowser();
  const { data: trending } = useQuery(getTrending(supabase));

  if (!trending) return null;

  const trendingWithIcon = trending.map(
    ({ clicks, target_title, id, target_favicon }) => {
      const href = `/links/detail/${id}`;
      const icon = target_favicon ?? '';
      return {
        name: target_title ?? '',
        value: clicks,
        href,
        icon: () => (
          <ImageWithFallback
            key={href}
            className='shrink-0 rounded-full'
            src={icon}
            alt='trending icon'
            fallbackSrc={FALLBACK_IMAGE_URL}
            width={20}
            height={20}
          />
        ),
      };
    },
  );

  return <BarList data={trendingWithIcon} />;
};

export default TrendingLinksClient;
