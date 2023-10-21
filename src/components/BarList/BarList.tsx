import { colors } from '@/libs/colors';

import { barList } from './BarList.styles';

type Bar = {
  key?: string;
  value: number;
  name: string;
  icon?: React.JSXElementConstructor<unknown>;
};

interface BarListProps {
  data: Bar[];
  /**
   * @default (value) => `${value}`
   */
  valueFormatter?: (value: number) => string;
  /**
   * @default false
   */
  isColorful?: boolean;
  className?: string;
}

const BarList: React.FC<BarListProps> = ({
  data,
  isColorful = false,
  valueFormatter = (value) => `${value}`,
  className,
}) => {
  const slots = barList();
  const widths = convertValuesToWidths(data.map((item) => item.value));

  if (!data || !data.length) {
    return (
      <div className={slots.noData({ className })}>No data to display.</div>
    );
  }

  return (
    <div className={slots.root({ className })}>
      <div className={slots.barWrapper()}>
        {data.map((item, index) => {
          const Icon = item.icon;
          const className = isColorful
            ? `bg-${colors[index % colors.length]}`
            : '';
          return (
            <div
              key={item.key ?? `${item.name}-${index}`}
              className={slots.bar({ isColorful, className })}
              style={{ width: `${widths[index]}%` }}
            >
              <div className={slots.barTextWrapper()}>
                {Icon && <Icon />}
                <span className={slots.text()}>{item.name}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className={slots.valueBox()}>
        {data.map((item, index) => (
          <div
            key={item.key ?? `${item.name}-${index}`}
            className={slots.valueWrapper()}
          >
            <span className={slots.text()}>{valueFormatter(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const convertValuesToWidths = (values: number[]) => {
  const maxValue = Math.max(...values);

  return values.map((value) => {
    if (value === 0) return 0;
    return Math.max((value / maxValue) * 100, 1);
  });
};

export default BarList;
