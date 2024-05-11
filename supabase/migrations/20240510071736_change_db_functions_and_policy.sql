DROP FUNCTION get_analytics_count_by_day;
create
or replace function get_analytics_count_by_day () returns table (count bigint, date text) as $$
BEGIN
  RETURN QUERY
    SELECT
      COUNT(A.id) as count,
      to_char(A.created_at, 'yyyy-mm-dd') AS date
    FROM
      public.analytics AS A
      JOIN public.urls AS B ON A.url_id = B.id
    WHERE
      B.user_id = auth.uid()
    GROUP BY
      date
    ORDER BY
      date ASC;
    END;
$$ language plpgsql;

DROP FUNCTION get_analytics_count_by_day_with_id;
create
or replace function get_analytics_count_by_day_with_id (urlid text) returns table (count bigint, date text) as $$
BEGIN
  RETURN QUERY
    SELECT
      COUNT(A.id) as count,
      to_char(A.created_at, 'yyyy-mm-dd') AS date
    FROM
      public.analytics AS A
      JOIN public.urls AS B ON A.url_id = B.id
    WHERE
      B.user_id = auth.uid() AND
      B.id = urlid
    GROUP BY
      date
    ORDER BY
      date ASC;
    END;
$$ language plpgsql;

DROP FUNCTION get_analytics_count_by_month;
create
or replace function get_analytics_count_by_month () returns table (count bigint, date text) as $$
BEGIN
  RETURN QUERY
    SELECT
      COUNT(A.id) as count,
      to_char(A.created_at, 'yyyy-mm') AS date
    FROM
      public.analytics AS A
      JOIN public.urls AS B ON A.url_id = B.id
    WHERE
      B.user_id = auth.uid()
    GROUP BY
      date
    ORDER BY
      date ASC;
    END;
$$ language plpgsql;

DROP FUNCTION get_analytics_count_by_month_with_id;
create
or replace function get_analytics_count_by_month_with_id (urlid text) returns table (count bigint, date text) as $$
BEGIN
  RETURN QUERY
    SELECT
      COUNT(A.id) as count,
      to_char(A.created_at, 'yyyy-mm') AS date
    FROM
      public.analytics AS A
      JOIN public.urls AS B ON A.url_id = B.id
    WHERE
      B.user_id = auth.uid() AND
      B.id = urlid
    GROUP BY
      date
    ORDER BY
      date ASC;
    END;
$$ language plpgsql;

DROP FUNCTION get_browsers_by_id;
create
or replace function get_browsers_by_id (urlid text) returns table (count bigint, browser text) as $$
BEGIN
  RETURN QUERY
    SELECT
      COUNT(*) as count,
      A.browser AS browser
    FROM
      public.analytics AS A
      JOIN public.urls AS B ON A.url_id = B.id
    WHERE
      B.user_id = auth.uid() AND
      B.id = urlid
    GROUP BY
      A.browser
    ORDER BY
      count DESC;
    END;
$$ language plpgsql;

DROP FUNCTION get_countries_by_id;
create
or replace function get_countries_by_id (urlid text) returns table (count bigint, country text) as $$
BEGIN
  RETURN QUERY
    SELECT
      COUNT(*) as count,
      A.country AS country
    FROM
      public.analytics AS A
      JOIN public.urls AS B ON A.url_id = B.id
    WHERE
      B.user_id = auth.uid() AND
      B.id = urlid
    GROUP BY
      A.country
    ORDER BY
      count DESC;
    END;
$$ language plpgsql;

DROP FUNCTION get_devices_by_id;
create
or replace function get_devices_by_id (urlid text) returns table (count bigint, device text) as $$
BEGIN
  RETURN QUERY
    SELECT
      COUNT(*) as count,
      A.device AS device
    FROM
      public.analytics AS A
      JOIN public.urls AS B ON A.url_id = B.id
    WHERE
      B.user_id = auth.uid() AND
      B.id = urlid
    GROUP BY
      A.device
    ORDER BY
      count DESC;
    END;
$$ language plpgsql;

DROP FUNCTION get_oss_by_id;
create
or replace function get_oss_by_id (urlid text) returns table (count bigint, os text) as $$
BEGIN
  RETURN QUERY
    SELECT
      COUNT(*) as count,
      A.os AS os
    FROM
      public.analytics AS A
      JOIN public.urls AS B ON A.url_id = B.id
    WHERE
      B.user_id = auth.uid() AND
      B.id = urlid
    GROUP BY
      A.os
    ORDER BY
      count DESC;
    END;
$$ language plpgsql;

alter policy "Enable read access for all users"
on "public"."urls"
to authenticated
using ((auth.uid() = user_id));
alter policy "Enable read access for all users"
on "public"."urls"
rename to "Enable read for users based on user_id";
