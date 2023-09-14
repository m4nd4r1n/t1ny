import type { VariantProps } from 'tailwind-variants';

import { Spinner, SpinnerProps } from '../Spinner';
import { button } from './Button.styles';

type ButtonVariants = VariantProps<typeof button>;
type HTMLButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonProps
  extends Omit<ButtonVariants, 'isDisabled'>,
    Omit<HTMLButtonProps, 'color'>,
    React.PropsWithChildren {
  isLoading?: boolean;
}

const loadingSpinnerSizeMap: Record<string, SpinnerProps['size']> = {
  small: 'small',
  medium: 'small',
  large: 'medium',
};

const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  isLoading = false,
  color,
  fullWidth,
  children,
  className,
  disabled,
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  const loadingSpinnerSize = loadingSpinnerSizeMap[size];

  return (
    <button
      className={button({ size, className, color, isDisabled, fullWidth })}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && <Spinner size={loadingSpinnerSize} color='current' />}
      {children}
    </button>
  );
};

export default Button;
