import { tv } from 'tailwind-variants';

export const formCard = tv({
  slots: {
    card: 'space-y-4 rounded-b-none border-b-default-200',
    footer: [
      'flex',
      'items-center',
      'justify-between',
      'rounded-lg',
      'rounded-t-none',
      'border-x',
      'border-b',
      'bg-gray-light',
      'px-6',
      'py-3',
    ],
    description: 'text-default-500',
    helpText: 'text-sm text-default-500',
  },
  variants: {
    isDanger: {
      true: {
        card: 'border-danger border-b-default-200',
        footer: 'border-danger',
      },
      false: {
        footer: 'border-default-200',
      },
    },
  },
  defaultVariants: {
    isDanger: false,
  },
});
