export const httpScheme =
  process.env.NEXT_PUBLIC_HTTP_SCHEME ||
  (process.env.NODE_ENV === 'development' ? 'http' : 'https');

export const BLOCKED_REDIRECT_URL = `/login?error=${encodeURIComponent(
  "You're blocked",
)}`;

export const FALLBACK_IMAGE = 'https://www.notion.so/icons/globe_gray.svg';
