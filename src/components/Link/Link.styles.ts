import { tv } from 'tailwind-variants';

export const link = tv({
  base: 'relative inline-flex items-center outline-none transition-opacity',
  variants: {
    color: {
      default: 'text-default',
      primary: 'text-primary',
      secondary: 'text-secondary',
      danger: 'text-danger',
      white: 'text-white',
    },
    size: {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    },
    isBlock: {
      true: [
        'px-2',
        'py-1.5',
        'after:absolute',
        'after:inset-0',
        'after:h-full',
        'after:w-full',
        'after:rounded-xl',
        'after:transition-colors',
        'after:content-[""]',
        'after:duration-100',
        'after:ease-in-out',
        'active:opacity-70',
      ],
      false: 'hover:opacity-80 active:opacity-50',
    },
    isDisabled: {
      true: 'pointer-events-none select-none opacity-50',
    },
    isFull: {
      true: 'w-full justify-center',
    },
    isExternal: {
      true: 'after:ml-1 after:content-["_↗"]',
    },
  },
  compoundVariants: [
    {
      isBlock: true,
      color: 'default',
      class: 'hover:after:bg-default/10',
    },
    {
      isBlock: true,
      color: 'primary',
      class: 'hover:after:bg-primary/20',
    },
    {
      isBlock: true,
      color: 'secondary',
      class: 'hover:after:bg-secondary/20',
    },
    {
      isBlock: true,
      color: 'danger',
      class: 'hover:after:bg-danger/20',
    },
  ],
  defaultVariants: {
    color: 'primary',
    size: 'medium',
    isBlock: false,
    isDisabled: false,
    isFull: false,
    isExternal: false,
  },
});
