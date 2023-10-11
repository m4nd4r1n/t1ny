import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
};

export async function middleware(req: NextRequest) {
  const rootDomain = `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  const hostname = req.headers
    .get('host')
    ?.replace('localhost:3000', rootDomain);
  const path = req.nextUrl.pathname;

  if (hostname === rootDomain) {
    return NextResponse.rewrite(
      new URL(`/home${path === '/' ? '' : path}`, req.url),
    );
  }

  if (hostname === `app.${rootDomain}`) {
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
