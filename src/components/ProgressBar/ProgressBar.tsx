import { progressBar } from './ProgressBar.styles';

interface ProgressProps {
  value: number;
  max: number;
  width?: string;
  label?: string;
  unit?: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressProps> = ({
  max,
  width = '100%',
  value,
  label,
  unit,
  className,
}) => {
  const slots = progressBar();

  return (
    <div className={slots.wrapper({ className })}>
      <div className={slots.textWrapper()}>
        <span>{label}</span>
        <span className={slots.text()}>
          {value} of {max} {unit}
        </span>
      </div>
      <progress
        className={slots.progress()}
        style={{ width }}
        max={max}
        value={value}
      />
    </div>
  );
};

export default ProgressBar;
