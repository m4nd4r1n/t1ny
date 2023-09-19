import { tv } from 'tailwind-variants';

export const spinner = tv({
  slots: {
    container:
      'relative inline-flex flex-col items-center justify-center gap-2',
    icon: 'relative flex',
    circle1:
      'absolute h-full w-full animate-spin rounded-full border-2 border-x-transparent border-t-transparent',
    circle2:
      'absolute h-full w-full animate-spin rounded-full border-2 opacity-20',
    label: 'text-default dark:text-white',
  },
  variants: {
    size: {
      small: {
        icon: 'h-5 w-5',
        circle1: 'border-2',
        circle2: 'border-2',
        label: 'text-sm',
      },
      medium: {
        icon: 'h-8 w-8',
        circle1: 'border-3',
        circle2: 'border-3',
        label: 'text-base',
      },
      large: {
        icon: 'h-10 w-10',
        circle1: 'border-4',
        circle2: 'border-4',
        label: 'text-lg',
      },
    },
    color: {
      current: {
        circle1: 'border-b-current',
        circle2: 'border-current',
      },
      white: {
        circle1: 'border-b-white',
        circle2: 'border-white',
      },
      default: {
        circle1: 'border-b-default',
        circle2: 'border-default',
      },
      primary: {
        circle1: 'border-b-primary',
        circle2: 'border-primary',
      },
      secondary: {
        circle1: 'border-b-secondary',
        circle2: 'border-secondary',
      },
      danger: {
        circle1: 'border-b-danger',
        circle2: 'border-danger',
      },
    },
    labelColor: {
      default: {
        label: 'text-default',
      },
      primary: {
        label: 'text-primary',
      },
      secondary: {
        label: 'text-secondary',
      },
      danger: {
        label: 'text-danger',
      },
      white: {
        label: 'text-white',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
    color: 'primary',
    labelColor: 'default',
  },
});
