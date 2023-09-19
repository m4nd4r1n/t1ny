import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
};

export async function middleware(req: NextRequest) {
  const rootDomain = `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  const ipRegex =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
  const hostname = req.headers
    .get('host')
    ?.replace('localhost:3000', rootDomain);
  const redirectUrl = ipRegex.test(req.nextUrl.hostname)
    ? new URL(`https://${hostname}`)
    : req.url;
  const path = req.nextUrl.pathname;

  if (hostname === rootDomain) {
    return NextResponse.rewrite(
      new URL(`/home${path === '/' ? '' : path}`, req.url),
    );
  }

  if (hostname === `app.${rootDomain}`) {
    const session = await getToken({ req });
    if (!session && path !== '/login') {
      return NextResponse.redirect(new URL(`/login`, redirectUrl));
    } else if (session && path === '/login') {
      return NextResponse.redirect(new URL(`/`, redirectUrl));
    }
    return NextResponse.rewrite(
      new URL(`/app${path === '/' ? '' : path}`, req.url),
    );
  }

  if (hostname === `admin.${rootDomain}`) {
    return NextResponse.rewrite(
      new URL(`/admin${path === '/' ? '' : path}`, req.url),
    );
  }

  return NextResponse.next();
}
