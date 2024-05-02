import { redirect } from 'next/navigation';

import { SIGN_IN_PATH } from '@/constants/urls';
import { createClient } from './server';

const getUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(SIGN_IN_PATH);

  return user;
};

export const getUrlLimits = async () => {
  const supabase = createClient();
  const user = await getUser();
  const { data, error } = await supabase
    .from('url_limit')
    .select('day_limit, total_limit')
    .eq('user_id', user.id)
    .limit(1)
    .single();

  if (error) throw error;

  return data;
};

export const getClicks = async () => {
  const supabase = createClient();
  const user = await getUser();
  const { data, error } = await supabase.rpc('get_analytics_count_by_month', {
    userid: user.id,
  });

  if (error) throw error;

  if (data.length <= 1) {
    const { data, error } = await supabase.rpc('get_analytics_count_by_day', {
      userid: user.id,
    });
    if (error) throw error;
    return data;
  }

  return data;
};

export const getTrending = async () => {
  const supabase = createClient();
  const user = await getUser();
  const { data, error } = await supabase
    .from('urls')
    .select('id, target_title, clicks, target_favicon')
    .eq('user_id', user.id)
    .limit(5)
    .order('clicks', { ascending: false });

  if (!data || error) return [];

  return data.map(({ clicks, target_title, id, target_favicon }) => ({
    name: target_title ?? '',
    value: clicks,
    href: `/links/detail/${id}`,
    icon: target_favicon ?? '',
  }));
};

export const getProfile = async () => {
  const supabase = createClient();
  const user = await getUser();
  const { data, error } = await supabase
    .from('profiles')
    .select('name, avatar')
    .eq('user_id', user.id)
    .limit(1)
    .single();

  if (error) throw error;

  return data;
};
