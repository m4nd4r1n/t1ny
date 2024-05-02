import type { Database, Link } from '@/types';

import { redirect } from 'next/navigation';
import * as z from 'zod';

import { SIGN_IN_PATH } from '@/constants/urls';
import { createAdminClient, createClient } from './server';

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

const nameSchema = z
  .string()
  .min(3, 'Name must be at least 3 characters.')
  .max(32, 'Name can be up to 32 characters long.');

export const updateName = async (name: string) => {
  const result = nameSchema.safeParse(name);
  if (!result.success) {
    throw result.error;
  }

  const supabase = createClient();
  const user = await getUser();

  const { error } = await supabase
    .from('profiles')
    .update({ name })
    .eq('user_id', user.id);

  if (error) throw error;
};

export const deleteUser = async () => {
  const user = await getUser();
  const supabaseAdmin = createAdminClient();

  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (error) throw error;
};

export const getLinkByUrl = async (url: string) => {
  const supabase = createClient();
  const user = await getUser();

  const { data } = await supabase
    .from('urls')
    .select('target_url')
    .eq('user_id', user.id)
    .eq('target_url', url)
    .limit(1)
    .single();

  return data;
};

export const getLinkById = async (urlId: string) => {
  const supabase = createClient();
  const user = await getUser();
  const { data, error } = await supabase
    .from('urls')
    .select('*')
    .eq('id', urlId)
    .eq('user_id', user.id)
    .limit(1)
    .single();
  if (error) throw error;

  return data;
};

interface LinkData extends Omit<Link, 'created_at'> {
  target_description?: string;
  target_og_image?: string;
}

export const createLink = async ({
  id,
  target_favicon,
  target_title,
  target_url,
  target_description,
  target_og_image,
}: LinkData) => {
  const supabase = createClient();
  const user = await getUser();

  const { error: linkCreateError } = await supabase.from('urls').insert({
    id,
    target_favicon,
    target_title,
    target_url,
    target_description,
    target_og_image,
    user_id: user.id,
  });
  if (linkCreateError) throw linkCreateError;
};

export const decreaseUrlLimit = async () => {
  const supabase = createAdminClient();
  const [user, { day_limit, total_limit }] = await Promise.all([
    getUser(),
    getUrlLimits(),
  ]);
  const decreasedDayLimit = day_limit > 0 ? day_limit - 1 : day_limit;
  const decreasedTotalLimit = total_limit > 0 ? total_limit - 1 : total_limit;
  const { error } = await supabase
    .from('url_limit')
    .update({ day_limit: decreasedDayLimit, total_limit: decreasedTotalLimit })
    .eq('user_id', user.id);

  if (error) throw error;
};

export const increaseUrlTotalLimit = async () => {
  const supabase = createAdminClient();
  const [user, { total_limit }] = await Promise.all([
    getUser(),
    getUrlLimits(),
  ]);
  const increasedTotalLimit = total_limit < 500 ? total_limit + 1 : total_limit;
  const { error } = await supabase
    .from('url_limit')
    .update({ total_limit: increasedTotalLimit })
    .eq('user_id', user.id);

  if (error) throw error;
};

export const getLinks = async () => {
  const supabase = createClient();
  const user = await getUser();

  const { data, error } = await supabase
    .from('urls')
    .select('id, target_url, created_at, target_favicon, target_title')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
};

export const deleteLink = async (id: string) => {
  const supabase = createClient();
  const user = await getUser();
  const { error } = await supabase
    .from('urls')
    .delete()
    .eq('user_id', user.id)
    .eq('id', id);

  if (error) throw error;
};

export const getLinkByIdAdmin = async (urlId: string) => {
  const supabase = createAdminClient();

  const { data } = await supabase
    .from('urls')
    .select('target_url, target_title, target_description, target_og_image')
    .eq('id', urlId)
    .limit(1)
    .single();

  return data;
};

type AnalyticsColumns = Omit<
  Database['public']['Tables']['analytics']['Row'],
  'id' | 'created_at'
>;

type StringNullToStringUndefined<T> = T extends string
  ? T
  : T extends string | null
    ? string | undefined
    : T;

type AnalyticsData = {
  [Key in keyof AnalyticsColumns]: StringNullToStringUndefined<
    AnalyticsColumns[Key]
  >;
};

export const createAnalytics = async (data: AnalyticsData) => {
  const supabase = createAdminClient();
  const { error } = await supabase.from('analytics').insert(data);

  if (error) throw error;
};

export const increaseUrlClick = async (urlId: string) => {
  const supabase = createAdminClient();
  const { data, error: getClicksError } = await supabase
    .from('urls')
    .select('clicks')
    .eq('id', urlId)
    .limit(1)
    .single();
  if (getClicksError) throw getClicksError;

  const { error } = await supabase
    .from('urls')
    .update({
      clicks: data.clicks + 1,
    })
    .eq('id', urlId);

  if (error) throw error;
};

export const getClicksById = async (urlId: string) => {
  const supabase = createClient();
  const user = await getUser();
  const { data, error } = await supabase.rpc(
    'get_analytics_count_by_month_with_id',
    {
      userid: user.id,
      urlid: urlId,
    },
  );
  if (error) throw error;

  if (data.length <= 1) {
    const { data, error } = await supabase.rpc(
      'get_analytics_count_by_day_with_id',
      {
        userid: user.id,
        urlid: urlId,
      },
    );
    if (error) throw error;
    return data;
  }

  return data;
};

export const getCountriesById = async (urlId: string) => {
  const supabase = createClient();
  const user = await getUser();
  const { data, error } = await supabase.rpc('get_countries_by_id', {
    urlid: urlId,
    userid: user.id,
  });
  if (error) throw error;

  return data;
};

export const getBrowsersById = async (urlId: string) => {
  const supabase = createClient();
  const user = await getUser();
  const { data, error } = await supabase.rpc('get_browsers_by_id', {
    urlid: urlId,
    userid: user.id,
  });
  if (error) throw error;

  return data;
};

export const getOSsById = async (urlId: string) => {
  const supabase = createClient();
  const user = await getUser();
  const { data, error } = await supabase.rpc('get_oss_by_id', {
    urlid: urlId,
    userid: user.id,
  });
  if (error) throw error;

  return data;
};

export const getDevicesById = async (urlId: string) => {
  const supabase = createClient();
  const user = await getUser();
  const { data, error } = await supabase.rpc('get_devices_by_id', {
    urlid: urlId,
    userid: user.id,
  });
  if (error) throw error;

  return data;
};
