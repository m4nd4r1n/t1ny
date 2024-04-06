import { Prisma } from '@prisma/client';

export const getClicksByMonthWithId = (
  userId: string,
  id: string,
) => Prisma.sql`
  SELECT
    COUNT(A.id) as count,
    to_char(A.created_at, 'yyyy-mm') AS date
  FROM
    "Analytics" AS A
    JOIN "Url" AS B ON A.url_id = B.id
    JOIN "User" AS C ON B.user_id = C.id
  WHERE
    B.id = ${id} AND
    C.id = ${userId}
  GROUP BY
    date
  ORDER BY
    date ASC;
`;

export const getClicksByDayWithId = (userId: string, id: string) => Prisma.sql`
  SELECT
    COUNT(A.id) as count,
    to_char(A.created_at, 'yyyy-mm-dd') AS date
  FROM
    "Analytics" AS A
    JOIN "Url" AS B ON A.url_id = B.id
    JOIN "User" AS C ON B.user_id = C.id
  WHERE
    B.id = ${id} AND
    C.id = ${userId}
  GROUP BY
    date
  ORDER BY
    date ASC;
`;
