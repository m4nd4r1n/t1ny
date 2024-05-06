import '@supabase/supabase-js';

declare module '@supabase/supabase-js' {
  interface User {
    banned_until?: string;
  }
}
