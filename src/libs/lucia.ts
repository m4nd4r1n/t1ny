import * as context from 'next/headers';
import { cache } from 'react';

import { prisma } from '@lucia-auth/adapter-prisma';
import { github, google } from '@lucia-auth/oauth/providers';
import { lucia } from 'lucia';
import { nextjs_future } from 'lucia/middleware';
import 'lucia/polyfill/node';

import client from './prisma';

const isDev = process.env.NODE_ENV === 'development';

export const auth = lucia({
  env: isDev ? 'DEV' : 'PROD',
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
    attributes: {
      domain: `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN?.split(':')[0]}`,
    },
  },
  adapter: prisma(client),
  csrfProtection: {
    allowedSubDomains: ['admin'],
  },

  getUserAttributes: (data) => {
    return {
      username: data.gh_username,
      name: data.name,
      email: data.email,
      image: data.image,
      role: data.role,
    };
  },
});

export const githubAuth = github(auth, {
  clientId: process.env.GITHUB_CLIENT_ID ?? '',
  clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
});

export const googleAuth = google(auth, {
  clientId: process.env.GOOGLE_CLIENT_ID ?? '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
  redirectUri: process.env.GOOGLE_REDIRECT_URI ?? '',
  scope: ['openid', 'profile', 'email'],
});

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest('GET', context);
  return authRequest.validate();
});

export type Auth = typeof auth;
