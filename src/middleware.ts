import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
};

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers
    .get('host')
    ?.replace('localhost:3000', `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
  const path = url.pathname;

  if (hostname === `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(
      new URL(`/home${path === '/' ? '' : path}`, request.url),
    );
  }

  if (hostname === `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(
      new URL(`/app${path === '/' ? '' : path}`, request.url),
    );
  }

  if (hostname === `admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(
      new URL(`/admin${path === '/' ? '' : path}`, request.url),
    );
  }

  return NextResponse.next();
}
