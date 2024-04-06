export const HTTP_SCHEME =
  process.env.NEXT_PUBLIC_HTTP_SCHEME ||
  (process.env.NODE_ENV === 'development' ? 'http' : 'https');

export const FALLBACK_IMAGE_URL = 'https://www.notion.so/icons/globe_gray.svg';

export const ROOT_DOMAIN = `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}${
  process.env.NODE_ENV === 'development' ? `:${process.env.PORT || 3000}` : ''
}`;

export const ROOT_URL = `${HTTP_SCHEME}://${ROOT_DOMAIN}`;

export const APP_URL = `${HTTP_SCHEME}://app.${ROOT_DOMAIN}`;

export const LOGIN_PATH = '/login';

export const BLOCKED_PATH = `${LOGIN_PATH}?error=${encodeURIComponent(
  "You're blocked",
)}`;

export const HOME_PATH = '/';

export const LOGIN_URL = `${APP_URL}${LOGIN_PATH}`;
