import { random } from '@/libs/utils';

const names = ['X', 'Google', 'GitHub', 'Reddit', 'Youtube'];

const base = names.map((name) => ({
  name,
  value: random(1000, 4000),
}));

export const mockData = base.sort((a, b) => b.value - a.value);
