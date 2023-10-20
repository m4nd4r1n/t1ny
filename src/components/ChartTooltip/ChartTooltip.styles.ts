import { tv } from 'tailwind-variants';

export const chartTooltip = tv({
  slots: {
    wrapper: 'rounded-md border border-default-200 bg-white shadow-md',
    labelWrapper: 'border-b border-default-200 px-4 py-2',
    label: 'text-sm font-medium text-default',
    rowBox: 'space-y-1 px-4 py-2',
    rowWrapper: 'flex items-center justify-between space-x-8',
    rowNameWrapper: 'flex items-center space-x-2',
    rowNameIcon: 'h-3 w-3 shrink-0 rounded-full border-2 border-white shadow',
    rowName: 'whitespace-nowrap text-right text-sm text-content',
    rowValue:
      'whitespace-nowrap text-right text-sm font-medium tabular-nums text-default',
  },
});
