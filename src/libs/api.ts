import { APP_URL } from '@/constants/urls';
import type { BarList, Clicks, LinkLimits, Links, Trending } from '@/types';

export class API {
  private static api = async <T>(path: `/${string}`, init?: RequestInit) => {
    const isServer = typeof window === 'undefined';
    const { NEXT_PUBLIC_HTTP_SCHEME, HOSTNAME, PORT } = process.env;
    const url = isServer
      ? `${NEXT_PUBLIC_HTTP_SCHEME || 'http'}://${HOSTNAME || '127.0.0.1'}:${
          PORT || 3000
        }/api${path}`
      : `${APP_URL}/api${path}`;
    const res = await fetch(url, init);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data as T;
  };

  public static getLinks = (headers?: HeadersInit) =>
    API.api<Links>(`/links`, { headers });

  public static deleteLink = (id: string) =>
    API.api(`/link/${id}`, { method: 'DELETE' });

  public static getLinkLimits = (headers?: HeadersInit) =>
    API.api<LinkLimits>(`/link/limits`, { headers });

  public static logout = () => API.api('/auth/logout', { method: 'POST' });

  public static getClicks = (headers?: HeadersInit) =>
    API.api<Clicks>(`/analytics/links/clicks`, { headers });

  public static getTrending = (headers?: HeadersInit) =>
    API.api<Trending>(`/analytics/links/trending`, { headers });

  public static getClicksById = (id: string, headers?: HeadersInit) =>
    API.api<Clicks>(`/analytics/links/${id}/clicks`, { headers });

  public static getCountriesById = (id: string, headers?: HeadersInit) =>
    API.api<BarList>(`/analytics/links/${id}/countries`, { headers });

  public static getDevicesById = (id: string, headers?: HeadersInit) =>
    API.api<BarList>(`/analytics/links/${id}/devices`, { headers });

  public static getOSsById = (id: string, headers?: HeadersInit) =>
    API.api<BarList>(`/analytics/links/${id}/oss`, { headers });

  public static getBrowsersById = (id: string, headers?: HeadersInit) =>
    API.api<BarList>(`/analytics/links/${id}/browsers`, { headers });
}
