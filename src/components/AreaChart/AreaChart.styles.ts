import { tv } from 'tailwind-variants';

export const areaChart = tv({
  slots: {
    wrapper: 'h-80 w-full',
    responsiveContainer: 'h-full w-full',
    gridLine: 'stroke-default-500 stroke-1',
    axis: 'fill-content text-xs',
    dot: 'stroke-white',
    noDataWrapper:
      'flex h-full w-full items-center justify-center rounded border border-dashed border-default-300',
    noDataText: 'text-content',
  },
});
