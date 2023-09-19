import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { type NextAuthOptions, getServerSession } from 'next-auth';
import GitHubProvider, { type GithubProfile } from 'next-auth/providers/github';

import prisma from './prisma';

const isProduction = process.env.NODE_ENV === 'production';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider<GithubProfile>({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          gh_username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    verifyRequest: '/login',
    error: '/login',
  },
  session: { strategy: 'jwt' },
  cookies: {
    sessionToken: {
      name: `${isProduction ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        domain: isProduction
          ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
          : undefined,
        secure: isProduction,
      },
    },
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.gh_username;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        id: token.sub ?? '',
        username: token.username ?? '',
      };

      return session;
    },
  },
};

export const getSession = () => getServerSession(authOptions);
