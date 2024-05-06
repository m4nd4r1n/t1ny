import type { HTMLAttributes } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { forwardRef } from 'react';

import { alertDescription, alertTitle, alertVariants } from './Alert.styles';

const Alert = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role='alert'
    className={alertVariants({ variant, className })}
    {...props}
  />
));
Alert.displayName = 'Alert';

const AlertTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5 ref={ref} className={alertTitle({ className })} {...props} />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={alertDescription({ className })} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
