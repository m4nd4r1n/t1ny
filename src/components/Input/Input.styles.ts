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
      'py-2.5',
      'transition-colors',
    ],
    input: [
      'w-full',
      'h-full',
      'font-normal',
      'bg-transparent',
      'outline-none',
      'placeholder:text-default-500',
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
      true: {},
    },
    hasLabel: {
      true: {},
    },
    isLabelPlaceholder: {
      true: {
        label: [
          'absolute',
          'text-default-500',
          'font-normal',
          'group-data-[filled=true]:font-medium',
          'group-data-[filled=true]:text-default-600',
        ],
      },
      false: {
        label: ['text-sm', 'text-default-600', 'font-medium'],
      },
    },
    size: {
      sm: {
        inputWrapper: 'h-12 min-h-[2.5rem] rounded-md py-1.5',
        input: 'text-sm',
        label: 'text-xs',
      },
      md: {
        inputWrapper: 'h-14 min-h-[3rem] rounded-lg py-2',
        input: 'text-sm',
        label: 'text-xs',
      },
      lg: {
        inputWrapper: 'h-16 min-h-[3.5rem] rounded-xl py-2.5',
        input: 'text-base',
        label: 'text-sm',
      },
    },
  },
  defaultVariants: {
    fullWidth: true,
    isDisabled: false,
    isInvalid: false,
    isRequired: false,
    size: 'lg',
  },
  compoundVariants: [
    {
      isLabelPlaceholder: true,
      size: ['sm', 'md'],
      class: {
        label: 'text-sm',
        input: 'pt-4',
      },
    },
    {
      isLabelPlaceholder: true,
      size: 'sm',
      class: {
        label: [
          'group-data-[filled=true]:text-xs',
          'group-data-[filled=true]:-translate-y-[calc(50%+0.75rem/2-5.5px)]',
        ],
      },
    },
    {
      isLabelPlaceholder: true,
      size: 'md',
      class: {
        label: [
          'group-data-[filled=true]:text-xs',
          'group-data-[filled=true]:-translate-y-[calc(50%+0.75rem/2-4px)]',
        ],
      },
    },
    {
      isLabelPlaceholder: true,
      size: 'lg',
      class: {
        label: [
          'text-base',
          'group-data-[filled=true]:text-sm',
          'group-data-[filled=true]:-translate-y-[calc(50%+0.875rem/2-7px)]',
        ],
        input: 'pt-5',
      },
    },
    {
      hasLabel: true,
      isRequired: true,
      class: {
        label: 'after:ml-0.5 after:text-danger after:content-["*"]',
      },
    },
  ],
});
