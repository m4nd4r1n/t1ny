import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const rootDomain = `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  const hostname = req.headers
    .get('host')
    ?.replace('localhost:3000', rootDomain);
  const path = url.pathname;

  if (hostname === rootDomain) {
    return NextResponse.rewrite(
      new URL(`/home${path === '/' ? '' : path}`, req.url),
    );
  }

  if (hostname === `app.${rootDomain}`) {
    const session = await getToken({ req });
    if (!session && path !== '/login') {
      return NextResponse.redirect(new URL(`/login`, req.url));
    } else if (session && path === '/login') {
      return NextResponse.redirect(new URL(`/`, req.url));
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
