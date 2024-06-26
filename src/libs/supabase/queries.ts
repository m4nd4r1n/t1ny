import type { Database, Link } from '@/types';
import type { TypedSupabaseClient } from '@/types/supabase';

export const getUrlLimits = (client: TypedSupabaseClient) =>
  client
    .from('url_limit')
    .select('day_limit, total_limit')
    .throwOnError()
    .single();

export const getAnalyticsCountByMonth = (client: TypedSupabaseClient) =>
  client.rpc('get_analytics_count_by_month').throwOnError();

export const getAnalyticsCountByDay = (client: TypedSupabaseClient) =>
  client.rpc('get_analytics_count_by_day').throwOnError();

export const getTrending = (client: TypedSupabaseClient) =>
  client
    .from('urls')
    .select('id, target_title, clicks, target_favicon')
    .throwOnError()
    .limit(5)
    .order('clicks', { ascending: false });

export const getProfile = (client: TypedSupabaseClient) =>
  client.from('profiles').select('name, avatar').throwOnError().single();

export const updateName = (
  client: TypedSupabaseClient,
  userId: string,
  name: string,
) =>
  client.from('profiles').update({ name }).eq('user_id', userId).throwOnError();

export const deleteUser = (client: TypedSupabaseClient, userId: string) =>
  client.auth.admin.deleteUser(userId);

export const getLinkByUrl = (client: TypedSupabaseClient, url: string) =>
  client
    .from('urls')
    .select('target_url')
    .eq('target_url', url)
    .limit(1)
    .single();

export const getLinkById = (client: TypedSupabaseClient, urlId: string) =>
  client.from('urls').select('*').eq('id', urlId).single();

interface LinkData extends Omit<Link, 'created_at'> {
  target_description?: string;
  target_og_image?: string;
}

export const createLink = (
  client: TypedSupabaseClient,
  {
    id,
    target_favicon,
    target_title,
    target_url,
    target_description,
    target_og_image,
  }: LinkData,
) =>
  client
    .from('urls')
    .insert({
      id,
      target_favicon,
      target_title,
      target_url,
      target_description,
      target_og_image,
    })
    .throwOnError();

export const updateUrlLimit = (
  client: TypedSupabaseClient,
  userId: string,
  { dayLimit, totalLimit }: { dayLimit?: number; totalLimit?: number },
) =>
  client
    .from('url_limit')
    .update({ day_limit: dayLimit, total_limit: totalLimit })
    .eq('user_id', userId)
    .throwOnError();

export const getLinks = (client: TypedSupabaseClient) =>
  client
    .from('urls')
    .select('id, target_url, created_at, target_favicon, target_title')
    .throwOnError()
    .order('created_at', { ascending: false });

export const deleteLink = (client: TypedSupabaseClient, id: string) =>
  client.from('urls').delete().eq('id', id).throwOnError();

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

export const createAnalytics = (
  client: TypedSupabaseClient,
  data: AnalyticsData,
) => client.from('analytics').insert(data).throwOnError();

export const updateUrlClick = (
  client: TypedSupabaseClient,
  urlId: string,
  clicks: number,
) => client.from('urls').update({ clicks }).eq('id', urlId).throwOnError();

export const getAnalyticsCountByMonthWithId = (
  client: TypedSupabaseClient,
  urlId: string,
) =>
  client
    .rpc('get_analytics_count_by_month_with_id', {
      urlid: urlId,
    })
    .throwOnError();

export const getAnalyticsCountByDayWithId = (
  client: TypedSupabaseClient,
  urlId: string,
) =>
  client
    .rpc('get_analytics_count_by_day_with_id', {
      urlid: urlId,
    })
    .throwOnError();

export const getCountriesById = (client: TypedSupabaseClient, urlId: string) =>
  client
    .rpc('get_countries_by_id', {
      urlid: urlId,
    })
    .throwOnError();

export const getBrowsersById = (client: TypedSupabaseClient, urlId: string) =>
  client
    .rpc('get_browsers_by_id', {
      urlid: urlId,
    })
    .throwOnError();

export const getOSsById = (client: TypedSupabaseClient, urlId: string) =>
  client
    .rpc('get_oss_by_id', {
      urlid: urlId,
    })
    .throwOnError();

export const getDevicesById = (client: TypedSupabaseClient, urlId: string) =>
  client
    .rpc('get_devices_by_id', {
      urlid: urlId,
    })
    .throwOnError();

export const getRole = (client: TypedSupabaseClient) =>
  client.from('user_role').select('role').throwOnError().single();
