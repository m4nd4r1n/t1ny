import { tv } from 'tailwind-variants';

export const progressBar = tv({
  slots: {
    wrapper: 'space-y-4',
    textWrapper:
      'flex w-full items-center justify-between font-medium text-default',
    text: 'text-sm font-bold',
    progress: [
      'relative',
      'h-2',
      'w-full',
      'appearance-none',
      'overflow-hidden',
      'rounded-2xl',
      'bg-default/10',
      '[&::-moz-progress-bar]:bg-primary',
      '[&::-webkit-progress-bar]:bg-transparent',
      '[&::-webkit-progress-bar]:rounded-2xl',
      '[&::-webkit-progress-value]:bg-primary',
      '[&::-webkit-progress-value]:rounded-2xl',
      '[&::-webkit-progress-value]:transition-[width]',
      '[&::-webkit-progress-value]:duration-500',
    ],
  },
});
