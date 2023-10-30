import { Prisma } from '@prisma/client';

export const getClicksByMonthWithId = (
  userId: string,
  id: string,
) => Prisma.sql`
  SELECT 
    COUNT(A.id) as count,
    DATE_FORMAT(A.created_at, '%Y-%m') AS date
  FROM 
    Analytics AS A 
    JOIN Url AS B ON A.url_id = B.id
    JOIN User AS C ON B.user_id = C.id
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
    DATE_FORMAT(A.created_at, '%Y-%m-%d') AS date
  FROM 
    Analytics AS A 
    JOIN Url AS B ON A.url_id = B.id
    JOIN User AS C ON B.user_id = C.id
  WHERE
    B.id = ${id} AND
    C.id = ${userId}
  GROUP BY
    date
  ORDER BY
    date ASC;
`;
