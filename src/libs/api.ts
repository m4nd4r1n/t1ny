import { httpScheme } from '@/libs/constants';

export const api = (path: `/${string}`, init?: RequestInit) =>
  fetch(
    `${httpScheme}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/api${path}`,
    init,
  );
