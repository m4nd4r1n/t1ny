import { tv } from 'tailwind-variants';

export const noData = tv({
  slots: {
    wrapper:
      'flex h-full w-full items-center justify-center rounded border border-dashed border-default-300',
    text: 'text-content',
  },
});
