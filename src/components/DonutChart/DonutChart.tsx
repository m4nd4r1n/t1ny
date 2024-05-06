'use client';

import type { ValueFormatter } from '@/types';

import {
  Pie,
  PieChart as ReChartsDonutChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { NoData } from '@/components/NoData';
import { colors } from '@/constants/colors';
import { donutChart } from './DonutChart.styles';
import DonutChartTooltip from './DonutChartTooltip';

interface DonutChartProps<T> {
  /** @default [] */
  data: T[];
  /** @default value */
  category: keyof T & string;
  /** @default name */
  index: keyof T & string;
  /** @default true */
  showTooltip?: boolean;
  /** @default 900 */
  animationDuration?: number;
  /** @default false */
  showAnimation?: boolean;
  valueFormatter?: ValueFormatter;
  className?: string;
  label?: string;
}

const DonutChart = <T extends Record<string, string | number>>({
  data = [],
  valueFormatter = (value) => `${value}`,
  showTooltip = true,
  showAnimation = false,
  animationDuration = 900,
  className,
  index = 'name',
  category = 'value',
  label,
}: DonutChartProps<T>) => {
  const slots = donutChart();
  const parsedData = data.map((item, index) => ({
    ...item,
    color: colors[index % colors.length],
    className: `fill-${colors[index % colors.length]} opacity-90`,
    fill: '',
  }));

  return (
    <div className={slots.wrapper({ className })}>
      <ResponsiveContainer className={slots.responsiveContainer()}>
        {data.length ? (
          <ReChartsDonutChart margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
            {label && (
              <text
                className={slots.label()}
                x='50%'
                y='50%'
                textAnchor='middle'
                dominantBaseline='middle'
              >
                {label}
              </text>
            )}
            <Pie
              className={slots.pie()}
              data={parsedData}
              cx='50%'
              cy='50%'
              startAngle={90}
              endAngle={-270}
              innerRadius='75%'
              outerRadius='100%'
              stroke=''
              strokeLinejoin='round'
              dataKey={category}
              nameKey={index}
              isAnimationActive={showAnimation}
              animationDuration={animationDuration}
              style={{ outline: 'none' }}
            />
            <Tooltip
              wrapperStyle={{ outline: 'none' }}
              isAnimationActive={showAnimation}
              content={
                showTooltip ? (
                  ({ active, payload }) => (
                    <DonutChartTooltip
                      active={active}
                      payload={payload}
                      valueFormatter={valueFormatter}
                    />
                  )
                ) : (
                  <></>
                )
              }
            />
          </ReChartsDonutChart>
        ) : (
          <NoData />
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;
