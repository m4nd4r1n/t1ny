'use client';

import {
  Area,
  CartesianGrid,
  Dot,
  Legend,
  AreaChart as ReChartsAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { AxisDomain } from 'recharts/types/util/types';

import { NoData } from '@/components/NoData';
import { colors } from '@/libs/colors';
import type { ValueFormatter } from '@/libs/types';

import { ChartLegend } from '../ChartLegend';
import { ChartTooltip } from '../ChartTooltip';
import { areaChart } from './AreaChart.styles';

interface AreaChartProps<T> {
  /** @default [] */
  data: T[];
  /** @default [] */
  categories: (keyof T & string)[];
  index: keyof T & string;
  /** @default false */
  startEndOnly?: boolean;
  /** @default true */
  showXAxis?: boolean;
  /** @default true */
  showYAxis?: boolean;
  /** @default 56 */
  yAxisWidth?: number;
  /** @default true */
  showTooltip?: boolean;
  /** @default true */
  showLegend?: boolean;
  /** @default true */
  showGridLines?: boolean;
  /** @default false */
  autoMinValue?: boolean;
  minValue?: number;
  maxValue?: number;
  /** @default false */
  connectNulls?: boolean;
  /** @default 900 */
  animationDuration?: number;
  /** @default false */
  showAnimation?: boolean;
  valueFormatter?: ValueFormatter;
  className?: string;
}

const AreaChart = <T extends Record<string, string | number>>({
  data = [],
  categories = [],
  index,
  startEndOnly = false,
  showXAxis = true,
  showYAxis = true,
  yAxisWidth = 56,
  showAnimation = false,
  animationDuration = 900,
  showTooltip = true,
  showLegend = true,
  showGridLines = true,
  autoMinValue = false,
  minValue,
  maxValue,
  connectNulls = false,
  className,
  valueFormatter = (value) => `${value}`,
}: AreaChartProps<T>) => {
  const slots = areaChart();
  const categoryColorMap = new Map<string, string>();
  categories.forEach((category, idx) => {
    categoryColorMap.set(category, colors[idx]);
  });

  const yAxisDomain: AxisDomain = [
    autoMinValue ? 'auto' : minValue ?? 0,
    maxValue ?? 'auto',
  ];

  const gridLines = showGridLines ? (
    <CartesianGrid
      className={slots.gridLine()}
      horizontal={true}
      vertical={false}
      strokeDasharray='3'
    />
  ) : null;

  const legend = showLegend ? (
    <Legend
      verticalAlign='top'
      height={60}
      content={({ payload }) => {
        if (!payload) return <></>;

        return (
          <div className='flex items-center justify-end'>
            <ChartLegend
              categories={payload.map((entry) => entry.value)}
              colors={payload.map(
                (entry) => categoryColorMap.get(entry.value) ?? '',
              )}
            />
          </div>
        );
      }}
    />
  ) : null;

  const tooltip = (
    <Tooltip<number, string>
      wrapperStyle={{ outline: 'none' }}
      isAnimationActive={showAnimation}
      content={
        showTooltip ? (
          ({ active, payload, label }) => (
            <ChartTooltip
              active={active}
              payload={payload}
              label={label}
              valueFormatter={valueFormatter}
              categoryColorMap={categoryColorMap}
            />
          )
        ) : (
          <></>
        )
      }
      position={{ y: 0 }}
    />
  );

  return (
    <div className={slots.wrapper({ className })}>
      <ResponsiveContainer className={slots.responsiveContainer()}>
        {data?.length ? (
          <ReChartsAreaChart data={data}>
            {gridLines}
            <XAxis
              hide={!showXAxis}
              dataKey={index}
              tick={{ transform: 'translate(0, 6)' }}
              ticks={
                startEndOnly
                  ? [data[0][index], data[data.length - 1][index]]
                  : undefined
              }
              fill=''
              stroke=''
              className={slots.axis()}
              interval='preserveStartEnd'
              tickLine={false}
              axisLine={false}
              padding={{ left: 10, right: 10 }}
              minTickGap={5}
            />
            <YAxis
              width={yAxisWidth}
              hide={!showYAxis}
              axisLine={false}
              tickLine={false}
              type='number'
              domain={yAxisDomain}
              tick={{ transform: 'translate(-3, 0)' }}
              fill=''
              stroke=''
              className={slots.axis()}
              tickFormatter={valueFormatter}
              allowDecimals={false}
            />
            {tooltip}
            {legend}
            {categories.map((category) => (
              <defs key={category}>
                <linearGradient
                  className={`text-${categoryColorMap.get(category)}`}
                  id={categoryColorMap.get(category)}
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'
                >
                  <stop
                    offset='5%'
                    stopColor='currentColor'
                    stopOpacity={0.5}
                  />
                  <stop offset='95%' stopColor='currentColor' stopOpacity={0} />
                </linearGradient>
              </defs>
            ))}
            {categories.map((category) => (
              <Area
                className={`stroke-${categoryColorMap.get(category)}`}
                strokeOpacity={1}
                activeDot={({
                  cx,
                  cy,
                  stroke,
                  strokeLinecap,
                  strokeLinejoin,
                  strokeWidth,
                }) => (
                  <Dot
                    className={slots.dot({
                      className: `fill-${categoryColorMap.get(category)}`,
                    })}
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill=''
                    stroke={stroke}
                    strokeLinecap={strokeLinecap}
                    strokeLinejoin={strokeLinejoin}
                    strokeWidth={strokeWidth}
                  />
                )}
                key={category}
                name={category}
                type='linear'
                dataKey={category}
                stroke=''
                fill={`url(#${categoryColorMap.get(category)})`}
                strokeWidth={2}
                strokeLinejoin='round'
                strokeLinecap='round'
                isAnimationActive={showAnimation}
                animationDuration={animationDuration}
                connectNulls={connectNulls}
              />
            ))}
          </ReChartsAreaChart>
        ) : (
          <NoData />
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChart;
