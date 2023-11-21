import type { TooltipProps } from 'recharts';
import type {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

import type { ValueFormatter } from '@/libs/types';

import { chartTooltip } from './ChartTooltip.styles';

interface ChartTooltipProps<TValue extends ValueType, TName extends NameType>
  extends TooltipProps<TValue, TName> {
  categoryColorMap: Map<string, string>;
  valueFormatter: ValueFormatter;
}

const ChartTooltip = <TValue extends ValueType, TName extends NameType>({
  active,
  label,
  categoryColorMap,
  payload,
  valueFormatter,
}: ChartTooltipProps<TValue, TName>) => {
  if (!active || !payload) return null;

  const slots = chartTooltip();

  return (
    <div className={slots.wrapper()}>
      <div className={slots.labelWrapper()}>
        <p className={slots.label()}>{label}</p>
      </div>
      <div className={slots.rowBox()}>
        {payload.map(({ value, name }, index) => (
          <div key={`id-${index}`} className={slots.rowWrapper()}>
            <div className={slots.rowNameWrapper()}>
              {name && (
                <span
                  className={slots.rowNameIcon({
                    className: `bg-${categoryColorMap.get(`${name}`)}`,
                  })}
                />
              )}
              <p className={slots.rowName()}>{name}</p>
            </div>
            {value && (
              <p className={slots.rowValue()}>
                {valueFormatter(Number(value))}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartTooltip;
