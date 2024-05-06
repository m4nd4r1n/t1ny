import type { ValueFormatter } from '@/types';
import type { TooltipProps } from 'recharts';
import type {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

import { chartTooltip } from './ChartTooltip.styles';

interface ChartTooltipProps<TValue extends ValueType, TName extends NameType>
  extends TooltipProps<TValue, TName> {
  categoryColorMap: Map<string, string>;
  valueFormatter: ValueFormatter;
}

const slots = chartTooltip();

const ChartTooltip = <TValue extends ValueType, TName extends NameType>({
  active,
  label,
  categoryColorMap,
  payload,
  valueFormatter,
}: ChartTooltipProps<TValue, TName>) => {
  if (!active || !payload) return null;

  return (
    <ChartTooltipWrapper>
      <div className={slots.labelWrapper()}>
        <p className={slots.label()}>{label}</p>
      </div>
      <div className={slots.rowBox()}>
        {payload.map(({ value, name }, index) => (
          <ChartTooltipRow
            key={`id-${index}`}
            value={valueFormatter(Number(value))}
            name={`${name}`}
            color={categoryColorMap.get(`${name}`) ?? ''}
          />
        ))}
      </div>
    </ChartTooltipWrapper>
  );
};

interface ChartTooltipRowProps {
  name: string;
  value: string;
  color: string;
}

export const ChartTooltipRow: React.FC<ChartTooltipRowProps> = ({
  name,
  value,
  color,
}) => (
  <div className={slots.rowWrapper()}>
    <div className={slots.rowNameWrapper()}>
      {name && (
        <span
          className={slots.rowNameIcon({
            className: `bg-${color}`,
          })}
        />
      )}
      <p className={slots.rowName()}>{name}</p>
    </div>
    <p className={slots.rowValue()}>{value}</p>
  </div>
);

export const ChartTooltipWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => <div className={slots.wrapper()}>{children}</div>;

export default ChartTooltip;
