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
