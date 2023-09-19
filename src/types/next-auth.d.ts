import type { DefaultSession } from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession['user'];
  }

  interface Profile {
    id: string;
    name: string;
    gh_username: string;
    email: string;
    image: string;
  }

  interface User {
    id: string;
    name: string;
    gh_username: string;
    email: string | null;
    image: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    username: string;
  }
}
