import { httpScheme } from '@/libs/constants';

export const APP_URL = `${httpScheme}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
export const LOGIN_URL = `${httpScheme}://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/login`;
