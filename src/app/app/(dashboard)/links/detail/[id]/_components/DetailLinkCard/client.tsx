'use client';

import type { FC } from 'react';
import type { DetailLinkCardProps } from './server';

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';

import LinkCard from '@/app/app/(dashboard)/links/_components/LinkCard';
import { useSupabaseBrowser } from '@/libs/supabase/client';
import { getLinkById } from '@/libs/supabase/queries';

const DetailLinkCardClient: FC<DetailLinkCardProps> = ({ id }) => {
  const supabase = useSupabaseBrowser();
  const { data: link } = useQuery(getLinkById(supabase, id));

  if (!link) return null;

  return <LinkCard link={link} isTitleLink={false} />;
};

export default DetailLinkCardClient;
