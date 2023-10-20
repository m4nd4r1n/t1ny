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

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const mockData = months.map((month) => ({
  date: `${month} 23`,
  'Mock A': random(1000, 4000),
  'Mock B': random(1000, 4000),
  'Mock C': random(1000, 4000),
  'Mock D': random(1000, 4000),
}));
