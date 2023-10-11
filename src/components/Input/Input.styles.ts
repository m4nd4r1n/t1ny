import { tv } from 'tailwind-variants';

export const input = tv({
  slots: {
    wrapper: 'group flex cursor-text flex-col',
    label: [
      'block',
      'will-change-auto',
      'origin-top-left',
      'transition-all',
      'duration-200',
      'ease-out',
      'motion-reduce:transition-none',
      'cursor-text',
    ],
    inputWrapper: [
      'relative',
      'w-full',
      'inline-flex',
      'shadow-sm',
      'px-3',
      'gap-0.5',
      'rounded-xl',
      'border-2',
      'border-default-200',
      'group-hover:border-default-400',
      'group-focus-within:border-default',
      'group-focus-within:group-hover:border-default',
      'transition-background',
      'motion-reduce:transition-none',
      'duration-150',
      'flex-col',
      'items-start',
      'justify-center',
      'h-16',
      'py-2.5',
      'transition-colors',
      'min-h-[3.5rem]',
    ],
    input: [
      'w-full',
      'h-full',
      'font-normal',
      'bg-transparent',
      'outline-none',
      'placeholder:text-default-500',
      'text-base',
      'file:transition-colors',
      'file:rounded-md',
      'file:border-0',
      'file:bg-default-100',
      'file:px-1',
      'file:text-xs',
      'file:font-semibold',
      'file:text-default-700',
      'hover:file:bg-default-200',
      '[&::-webkit-color-swatch]:border-none',
      '[&::-webkit-color-swatch]:rounded',
      '[&::-webkit-color-swatch-wrapper]:p-px',
      '[&::-moz-color-swatch]:border-none',
      '[&::-moz-color-swatch]:rounded',
      '[&[type="file"]]:text-sm',
    ],
    messageWrapper: 'relative flex flex-col gap-1.5 px-1 pt-1',
    description: 'text-xs text-default-400',
    error: 'text-xs text-danger',
  },
  variants: {
    fullWidth: {
      true: {
        wrapper: 'w-full',
      },
    },
    isDisabled: {
      true: {
        wrapper: 'pointer-events-none opacity-50',
        inputWrapper: 'pointer-events-none',
        label: 'pointer-events-none',
      },
    },
    isInvalid: {
      true: {
        input: 'text-danger placeholder:text-danger',
        label: 'text-danger',
        inputWrapper: [
          'border-danger',
          'group-focus-within:border-danger',
          'group-hover:border-danger',
          'group-focus-within:group-hover:border-danger',
        ],
      },
    },
    isRequired: {
      true: {
        label: 'after:ml-0.5 after:text-danger after:content-["*"]',
      },
    },
    isLabelPlaceholder: {
      true: {
        label: [
          'absolute',
          'text-base',
          'text-default-500',
          'font-normal',
          'group-data-[filled=true]:text-sm',
          'group-data-[filled=true]:font-medium',
          'group-data-[filled=true]:text-default-600',
          'group-data-[filled=true]:-translate-y-[calc(50%+0.875rem/2-5px)]',
        ],
        input: 'pt-5',
      },
      false: {
        label: ['text-sm', 'text-default-600', 'font-medium'],
      },
    },
  },
  defaultVariants: {
    fullWidth: true,
    isDisabled: false,
    isInvalid: false,
    isRequired: false,
  },
});
