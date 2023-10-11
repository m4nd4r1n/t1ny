/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import('./auth/lucia').Auth;
  type DatabaseUserAttributes = {
    name: string | null;
    gh_username?: string;
    email: string | null;
    image?: string;
    role: 'USER' | 'ADMIN' | 'BLOCKED';
    email_verified?: boolean;
  };
}
