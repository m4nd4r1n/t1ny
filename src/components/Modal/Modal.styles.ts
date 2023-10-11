import { tv } from 'tailwind-variants';

export const modal = tv({
  slots: {
    wrapper: [
      'fixed',
      'inset-0',
      'z-50',
      'flex',
      'items-center',
      'justify-center',
      'h-[100dvh]',
      'w-screen',
    ],
    content: [
      'relative',
      'flex',
      'flex-col',
      'mx-4',
      'w-full',
      'rounded-lg',
      'border',
      'border-gray-light',
      'bg-white',
      'p-8',
      'shadow-md',
      'max-h-[calc(100%-7.5rem)]',
    ],
    closeButton: [
      'absolute',
      'right-1',
      'top-1',
      'select-none',
      'appearance-none',
      'rounded-full',
      'p-2',
      'text-default-500',
      'hover:bg-default-100',
      'active:bg-default-200',
      'transition-colors',
    ],
    backdrop: [
      'fixed',
      'inset-0',
      'z-40',
      'bg-dark-gray',
      'bg-opacity-10',
      'backdrop-blur',
    ],
  },
  variants: {
    size: {
      xs: {
        content: 'max-w-xs',
      },
      sm: {
        content: 'max-w-sm',
      },
      md: {
        content: 'max-w-md',
      },
      lg: {
        content: 'max-w-lg',
      },
      xl: {
        content: 'max-w-xl',
      },
      '2xl': {
        content: 'max-w-2xl',
      },
      '3xl': {
        content: 'max-w-3xl',
      },
      '4xl': {
        content: 'max-w-4xl',
      },
      '5xl': {
        content: 'max-w-5xl',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
