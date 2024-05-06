import { generateRandomNumberBetween } from '@/utils/random';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const mockData = months.map((month) => ({
  date: `${month} 23`,
  'Mock A': generateRandomNumberBetween(1000, 4000),
  'Mock B': generateRandomNumberBetween(1000, 4000),
  'Mock C': generateRandomNumberBetween(1000, 4000),
  'Mock D': generateRandomNumberBetween(1000, 4000),
}));
