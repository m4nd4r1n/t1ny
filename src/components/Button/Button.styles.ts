import { tv } from 'tailwind-variants';

export const button = tv({
  base: 'relative z-0 inline-flex min-w-max select-none appearance-none items-center justify-center overflow-hidden whitespace-nowrap font-normal subpixel-antialiased outline-none transition-transform duration-250 active:scale-97',
  variants: {
    color: {
      default: 'bg-default text-white shadow-lg shadow-default/50',
      primary: 'bg-primary text-white shadow-lg shadow-primary/50',
      secondary: 'bg-secondary text-white shadow-lg shadow-secondary/50',
      danger: 'bg-danger text-white shadow-lg shadow-danger/50',
    },
    size: {
      small: 'h-8 min-w-16 gap-2 rounded-lg px-3 text-xs',
      medium: 'h-10 min-w-20 gap-2 rounded-xl px-4 text-sm',
      large: 'h-12 min-w-24 gap-3 rounded-1.5xl px-6 text-base',
    },
    fullWidth: {
      true: 'w-full',
    },
    isDisabled: {
      true: 'pointer-events-none opacity-50',
    },
  },
  defaultVariants: {
    size: 'medium',
    color: 'default',
    fullWidth: false,
    disabled: false,
  },
});
