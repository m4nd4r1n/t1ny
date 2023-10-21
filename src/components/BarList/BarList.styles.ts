import { tv } from 'tailwind-variants';

export const barList = tv({
  slots: {
    root: 'flex w-full justify-between gap-6',
    barWrapper: 'relative w-full space-y-2',
    bar: 'flex h-9 items-center rounded-md bg-opacity-30',
    barTextWrapper: 'absolute left-2 flex max-w-full items-center space-x-2.5',
    valueBox: 'min-w-min space-y-2 text-right',
    valueWrapper: 'flex h-9 items-center justify-end',
    text: 'truncate text-sm text-default',
    noData:
      'flex h-64 items-center justify-center rounded-md border border-dashed border-default-300',
  },
  variants: {
    isColorful: {
      false: {
        bar: 'bg-primary',
      },
    },
  },
  defaultVariants: {
    showAnimation: false,
    isColorful: false,
  },
});
