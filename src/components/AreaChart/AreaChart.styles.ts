import { tv } from 'tailwind-variants';

export const areaChart = tv({
  slots: {
    wrapper: 'w-full',
    responsiveContainer: 'h-full w-full',
    gridLine: 'stroke-default-500 stroke-1',
    axis: 'fill-content text-xs',
    dot: 'stroke-white',
  },
});
