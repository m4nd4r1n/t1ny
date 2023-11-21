import { tv } from 'tailwind-variants';

export const donutChart = tv({
  slots: {
    wrapper: 'w-full',
    responsiveContainer: 'h-full w-full',
    label: 'fill-content',
    pie: 'stroke-white',
  },
});
