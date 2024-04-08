import { colors as defaultColors } from '@/constants/colors';

import { chartLegend } from './ChartLegend.styles';

interface ChartLegendProps {
  categories: string[];
  colors?: string[];
  className?: string;
}

const ChartLegend: React.FC<ChartLegendProps> = ({
  categories,
  colors = defaultColors,
  className,
}) => {
  const slots = chartLegend();

  return (
    <ul className={slots.wrapper({ className })}>
      {categories.map((category, idx) => (
        <li key={`item-${idx}`} className={slots.itemWrapper()}>
          <svg
            className={slots.itemDot({ className: `text-${colors[idx]}` })}
            fill='currentColor'
            viewBox='0 0 8 8'
          >
            <circle cx={4} cy={4} r={4} />
          </svg>
          <p className={slots.itemText()}>{category}</p>
        </li>
      ))}
    </ul>
  );
};

export default ChartLegend;
