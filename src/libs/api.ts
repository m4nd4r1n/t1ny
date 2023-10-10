import { httpScheme } from '@/libs/constants';

export const api = (path: `/${string}`, init?: RequestInit) =>
  fetch(
    `${httpScheme}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/api${path}`,
    init,
  );

export const createLink = (body: { destination: string }) =>
  api('/link', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });

export const getLinks = (headers?: HeadersInit) => api(`/links`, { headers });

export const deleteLink = (id: string) =>
  api(`/link/${id}`, { method: 'DELETE' });

export const getLinkLimits = (headers?: HeadersInit) =>
  api(`/link/limits`, { headers });
