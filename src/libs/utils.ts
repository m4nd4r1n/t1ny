export const formatDate = (date: Date): string =>
  Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);

export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
