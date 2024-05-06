import { tv } from 'tailwind-variants';

export const alertVariants = tv({
  base: [
    'relative',
    'w-full',
    'rounded-lg',
    'border',
    'p-4',
    '[&>svg~*]:pl-7',
    '[&>svg,div]:translate-y-[-3px]',
    '[&>svg]:absolute',
    '[&>svg]:left-4',
    '[&>svg]:top-4',
    '[&>svg]:text-default',
  ],
  variants: {
    variant: {
      default: 'bg-white text-default',
      primary:
        'border-primary/50 text-primary dark:border-primary [&>svg]:text-primary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const alertTitle = tv({
  base: 'mb-1 font-medium leading-none tracking-tight',
});

export const alertDescription = tv({
  base: 'text-sm [&_p]:leading-relaxed',
});
