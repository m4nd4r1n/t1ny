import { httpScheme } from '@/libs/constants';

const api = (path: `/${string}`, init?: RequestInit) =>
  fetch(
    `${httpScheme}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/api${path}`,
    init,
  );

const serverApi = (path: `/${string}`, init?: RequestInit) =>
  fetch(
    `${process.env.NEXT_PUBLIC_HTTP_SCHEME || 'http'}://${
      process.env.HOSTNAME
    }:3000/api${path}`,
    init,
  );

export const createLink = (body: { destination: string }) =>
  api('/link', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });

export const getLinks = (headers?: HeadersInit) =>
  serverApi(`/links`, { headers });

export const deleteLink = (id: string) =>
  api(`/link/${id}`, { method: 'DELETE' });

export const getLinkLimits = (headers?: HeadersInit) =>
  serverApi(`/link/limits`, { headers });

export const logout = () => api('/auth/logout', { method: 'POST' });
