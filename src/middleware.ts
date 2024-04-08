import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { ROOT_DOMAIN } from '@/constants/urls';

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|monitoring|[\\w-]+\\.\\w+).*)'],
};

export async function middleware(req: NextRequest) {
  const hostname = req.headers
    .get('host')
    ?.replace('localhost:3000', ROOT_DOMAIN);
  const { pathname } = req.nextUrl;
  const rewriteTo = req.nextUrl.clone();
  const path = pathname === '/' ? '' : pathname;

  const rewriteMap = {
    [ROOT_DOMAIN]: () => {
      rewriteTo.pathname = `/home${path}`;
    },
    [`app.${ROOT_DOMAIN}`]: () => {
      rewriteTo.pathname = `/app${path}`;
    },
    [`admin.${ROOT_DOMAIN}`]: () => {
      rewriteTo.pathname = `/admin${path}`;
    },
  };

  if (hostname) {
    const setPath = rewriteMap[hostname];
    if (typeof setPath === 'function') {
      setPath();
      return NextResponse.rewrite(rewriteTo);
    }
  }

  return NextResponse.next();
}
