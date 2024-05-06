
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA "pg_catalog";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "moddatetime" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."role" AS ENUM (
    'user',
    'admin'
);

ALTER TYPE "public"."role" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_analytics_count_by_day"("userid" "uuid") RETURNS TABLE("count" bigint, "date" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY
    SELECT
      COUNT(A.id) as count,
      to_char(A.created_at, 'yyyy-mm-dd') AS date
    FROM
      public.analytics AS A
      JOIN public.urls AS B ON A.url_id = B.id
    WHERE
      B.user_id = userid
    GROUP BY
      date
    ORDER BY
      date ASC;
    END;
    $$;

ALTER FUNCTION "public"."get_analytics_count_by_day"("userid" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_analytics_count_by_day_with_id"("userid" "uuid", "urlid" "text") RETURNS TABLE("count" bigint, "date" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY
    SELECT
      COUNT(A.id) as count,
      to_char(A.created_at, 'yyyy-mm-dd') AS date
    FROM
      public.analytics AS A
      JOIN public.urls AS B ON A.url_id = B.id
    WHERE
      B.user_id = userid AND
      B.id = urlid
    GROUP BY
      date
    ORDER BY
      date ASC;
    END;

    $$;

ALTER FUNCTION "public"."get_analytics_count_by_day_with_id"("userid" "uuid", "urlid" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_analytics_count_by_month"("userid" "uuid") RETURNS TABLE("count" bigint, "date" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY
    SELECT
      COUNT(A.id) as count,
      to_char(A.created_at, 'yyyy-mm') AS date
    FROM
      public.analytics AS A
      JOIN public.urls AS B ON A.url_id = B.id
    WHERE
      B.user_id = userid
    GROUP BY
      date
    ORDER BY
      date ASC;
    END;
    $$;

ALTER FUNCTION "public"."get_analytics_count_by_month"("userid" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_analytics_count_by_month_with_id"("userid" "uuid", "urlid" "text") RETURNS TABLE("count" bigint, "date" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  RETURN QUERY
    SELECT
      COUNT(A.id) as count,
      to_char(A.created_at, 'yyyy-mm') AS date
    FROM
      public.analytics AS A
      JOIN public.urls AS B ON A.url_id = B.id
    WHERE
      B.user_id = userid AND
      B.id = urlid
    GROUP BY
      date
    ORDER BY
      date ASC;
    END;

    $$;

ALTER FUNCTION "public"."get_analytics_count_by_month_with_id"("userid" "uuid", "urlid" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_browsers_by_id"("userid" "uuid", "urlid" "text") RETURNS TABLE("count" bigint, "browser" "text")
    LANGUAGE "plpgsql"
    AS $$BEGIN
  RETURN QUERY
    SELECT
      COUNT(*) as count,
      A.browser AS browser
    FROM
      public.analytics AS A
      JOIN public.urls AS B ON A.url_id = B.id
    WHERE
      B.user_id = userid AND
      B.id = urlid
    GROUP BY
      A.browser
    ORDER BY
      count DESC;
    END;$$;

ALTER FUNCTION "public"."get_browsers_by_id"("userid" "uuid", "urlid" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_countries_by_id"("userid" "uuid", "urlid" "text") RETURNS TABLE("count" bigint, "country" "text")
    LANGUAGE "plpgsql"
    AS $$BEGIN
  RETURN QUERY
    SELECT
      COUNT(*) as count,
      A.country AS country
    FROM
      public.analytics AS A
      JOIN public.urls AS B ON A.url_id = B.id
    WHERE
      B.user_id = userid AND
      B.id = urlid
    GROUP BY
      A.country
    ORDER BY
      count DESC;
    END;$$;

ALTER FUNCTION "public"."get_countries_by_id"("userid" "uuid", "urlid" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_devices_by_id"("userid" "uuid", "urlid" "text") RETURNS TABLE("count" bigint, "device" "text")
    LANGUAGE "plpgsql"
    AS $$BEGIN
  RETURN QUERY
    SELECT
      COUNT(*) as count,
      A.device AS device
    FROM
      public.analytics AS A
      JOIN public.urls AS B ON A.url_id = B.id
    WHERE
      B.user_id = userid AND
      B.id = urlid
    GROUP BY
      A.device
    ORDER BY
      count DESC;
    END;$$;

ALTER FUNCTION "public"."get_devices_by_id"("userid" "uuid", "urlid" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_oss_by_id"("userid" "uuid", "urlid" "text") RETURNS TABLE("count" bigint, "os" "text")
    LANGUAGE "plpgsql"
    AS $$BEGIN
  RETURN QUERY
    SELECT
      COUNT(*) as count,
      A.os AS os
    FROM
      public.analytics AS A
      JOIN public.urls AS B ON A.url_id = B.id
    WHERE
      B.user_id = userid AND
      B.id = urlid
    GROUP BY
      A.os
    ORDER BY
      count DESC;
    END;$$;

ALTER FUNCTION "public"."get_oss_by_id"("userid" "uuid", "urlid" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$begin
  insert into public.profiles (user_id, name, avatar)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.email), new.raw_user_meta_data->>'avatar_url');
  insert into public.url_limit (user_id) values (new.id);
  insert into public.user_role (user_id) values (new.id);
  return new;
end;$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."analytics" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "url_id" "text" NOT NULL,
    "ip_address" "text",
    "user_agent" "text",
    "country" "text",
    "browser" "text",
    "os" "text",
    "device" "text"
);

ALTER TABLE "public"."analytics" OWNER TO "postgres";

COMMENT ON TABLE "public"."analytics" IS 'Analytics for URLs';

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "name" "text" NOT NULL,
    "avatar" "text",
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

COMMENT ON TABLE "public"."profiles" IS 'User profiles';

CREATE TABLE IF NOT EXISTS "public"."url_limit" (
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "day_limit" smallint DEFAULT '20'::smallint NOT NULL,
    "total_limit" smallint DEFAULT '500'::smallint NOT NULL
);

ALTER TABLE "public"."url_limit" OWNER TO "postgres";

COMMENT ON TABLE "public"."url_limit" IS 'Number of URL creation limits';

CREATE TABLE IF NOT EXISTS "public"."urls" (
    "id" "text" NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "target_url" "text" NOT NULL,
    "clicks" integer DEFAULT 0 NOT NULL,
    "target_og_image" "text",
    "target_title" "text",
    "target_description" "text",
    "target_favicon" "text" NOT NULL
);

ALTER TABLE "public"."urls" OWNER TO "postgres";

COMMENT ON TABLE "public"."urls" IS 'Shortened URLs';

CREATE TABLE IF NOT EXISTS "public"."user_role" (
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "role" "public"."role" DEFAULT 'user'::"public"."role" NOT NULL
);

ALTER TABLE "public"."user_role" OWNER TO "postgres";

ALTER TABLE ONLY "public"."analytics"
    ADD CONSTRAINT "analytics_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("user_id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_user_id_key1" UNIQUE ("user_id");

ALTER TABLE ONLY "public"."url_limit"
    ADD CONSTRAINT "url_limit_pkey" PRIMARY KEY ("user_id");

ALTER TABLE ONLY "public"."url_limit"
    ADD CONSTRAINT "url_limit_user_id_key" UNIQUE ("user_id");

ALTER TABLE ONLY "public"."urls"
    ADD CONSTRAINT "urls_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."user_role"
    ADD CONSTRAINT "user_role_pkey" PRIMARY KEY ("user_id");

ALTER TABLE ONLY "public"."user_role"
    ADD CONSTRAINT "user_role_user_id_key" UNIQUE ("user_id");

CREATE INDEX "analytics_url_id_idx" ON "public"."analytics" USING "btree" ("url_id");

CREATE UNIQUE INDEX "profiles_name_key" ON "public"."profiles" USING "btree" ("name");

CREATE INDEX "profiles_user_id_idx" ON "public"."profiles" USING "btree" ("user_id");

CREATE UNIQUE INDEX "profiles_user_id_key" ON "public"."profiles" USING "btree" ("user_id");

CREATE INDEX "urls_user_id_idx" ON "public"."urls" USING "btree" ("user_id");

CREATE OR REPLACE TRIGGER "handle_updated_at" BEFORE UPDATE ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "extensions"."moddatetime"('updated_at');

CREATE OR REPLACE TRIGGER "handle_updated_at" BEFORE UPDATE ON "public"."urls" FOR EACH ROW EXECUTE FUNCTION "extensions"."moddatetime"('updated_at');

CREATE OR REPLACE TRIGGER "on_auth_user_created" AFTER INSERT ON "auth"."users" FOR EACH ROW EXECUTE PROCEDURE "public"."handle_new_user"();

ALTER TABLE ONLY "public"."analytics"
    ADD CONSTRAINT "analytics_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "public"."urls"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."url_limit"
    ADD CONSTRAINT "url_limit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."urls"
    ADD CONSTRAINT "urls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."user_role"
    ADD CONSTRAINT "user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Enable delete for users based on user_id" ON "public"."urls" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."urls" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));

CREATE POLICY "Enable read access for all users" ON "public"."urls" FOR SELECT USING (true);

CREATE POLICY "Enable read for users based on user_id" ON "public"."profiles" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable read for users based on user_id" ON "public"."url_limit" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable read for users based on user_id" ON "public"."user_role" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable read for users based on user_id in urls" ON "public"."analytics" FOR SELECT TO "authenticated" USING (("url_id" IN ( SELECT "urls"."id"
   FROM "public"."urls"
  WHERE ("urls"."user_id" = "auth"."uid"()))));

CREATE POLICY "Enable update for users based on email" ON "public"."profiles" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));

CREATE POLICY "Enable update for users based on user_id" ON "public"."urls" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));

ALTER TABLE "public"."analytics" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."url_limit" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."urls" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."user_role" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."get_analytics_count_by_day"("userid" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_analytics_count_by_day"("userid" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_analytics_count_by_day"("userid" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_analytics_count_by_day_with_id"("userid" "uuid", "urlid" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_analytics_count_by_day_with_id"("userid" "uuid", "urlid" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_analytics_count_by_day_with_id"("userid" "uuid", "urlid" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_analytics_count_by_month"("userid" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_analytics_count_by_month"("userid" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_analytics_count_by_month"("userid" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_analytics_count_by_month_with_id"("userid" "uuid", "urlid" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_analytics_count_by_month_with_id"("userid" "uuid", "urlid" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_analytics_count_by_month_with_id"("userid" "uuid", "urlid" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_browsers_by_id"("userid" "uuid", "urlid" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_browsers_by_id"("userid" "uuid", "urlid" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_browsers_by_id"("userid" "uuid", "urlid" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_countries_by_id"("userid" "uuid", "urlid" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_countries_by_id"("userid" "uuid", "urlid" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_countries_by_id"("userid" "uuid", "urlid" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_devices_by_id"("userid" "uuid", "urlid" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_devices_by_id"("userid" "uuid", "urlid" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_devices_by_id"("userid" "uuid", "urlid" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."get_oss_by_id"("userid" "uuid", "urlid" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_oss_by_id"("userid" "uuid", "urlid" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_oss_by_id"("userid" "uuid", "urlid" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON TABLE "public"."analytics" TO "anon";
GRANT ALL ON TABLE "public"."analytics" TO "authenticated";
GRANT ALL ON TABLE "public"."analytics" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON TABLE "public"."url_limit" TO "anon";
GRANT ALL ON TABLE "public"."url_limit" TO "authenticated";
GRANT ALL ON TABLE "public"."url_limit" TO "service_role";

GRANT ALL ON TABLE "public"."urls" TO "anon";
GRANT ALL ON TABLE "public"."urls" TO "authenticated";
GRANT ALL ON TABLE "public"."urls" TO "service_role";

GRANT ALL ON TABLE "public"."user_role" TO "anon";
GRANT ALL ON TABLE "public"."user_role" TO "authenticated";
GRANT ALL ON TABLE "public"."user_role" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
