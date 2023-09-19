import type { VariantProps } from 'tailwind-variants';

import { spinner } from './Spinner.styles';

type SpinnerVariants = VariantProps<typeof spinner>;

export interface SpinnerProps extends SpinnerVariants {
  label?: string;
  'aria-label'?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  label,
  size,
  labelColor,
  color,
  'aria-label': ariaLabel,
}) => {
  const slots = spinner({ size, labelColor, color });

  return (
    <div
      className={slots.container()}
      aria-label={ariaLabel ?? label ?? 'Loading'}
    >
      <div className={slots.icon()}>
        <i className={slots.circle1()}></i>
        <i className={slots.circle2()}></i>
      </div>
      {label && <span className={slots.label()}>{label}</span>}
    </div>
  );
};

export default Spinner;
