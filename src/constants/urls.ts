const HTTP_SCHEME =
  process.env.NEXT_PUBLIC_HTTP_SCHEME ||
  (process.env.NODE_ENV === 'development' ? 'http' : 'https');

export const FALLBACK_IMAGE_URL = 'https://www.notion.so/icons/globe_gray.svg';

export const ROOT_DOMAIN = `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}${
  process.env.NODE_ENV === 'development' ? `:${process.env.PORT || 3000}` : ''
}`;

export const ROOT_URL = `${HTTP_SCHEME}://${ROOT_DOMAIN}`;

export const APP_URL = `${HTTP_SCHEME}://app.${ROOT_DOMAIN}`;

export const SIGN_IN_PATH = '/sign-in';
export const SIGN_IN_URL = `${APP_URL}${SIGN_IN_PATH}`;

export const SIGN_UP_PATH = '/sign-up';

export const FORGOT_PASSWORD_PATH = '/forgot-password';

export const BANNED_PATH = `${SIGN_IN_PATH}?error=${encodeURIComponent(
  "You're banned",
)}`;

export const HOME_PATH = '/';

export const LINKS_PATH = '/links';
