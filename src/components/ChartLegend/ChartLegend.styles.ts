import { tv } from 'tailwind-variants';

export const chartLegend = tv({
  slots: {
    wrapper: 'flex flex-wrap overflow-hidden truncate',
    itemWrapper: [
      'rounded-sm',
      'group',
      'inline-flex',
      'items-center',
      'truncate',
      'px-2',
      'py-0.5',
      'transition',
      'text-content',
    ],
    itemText: 'truncate whitespace-nowrap text-sm text-content',
    itemDot: 'mr-1.5 h-2 w-2 flex-none',
  },
});
