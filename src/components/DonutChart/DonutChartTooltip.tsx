import type {
  NameType,
  Payload,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

import {
  ChartTooltipRow,
  ChartTooltipWrapper,
} from '@/components/ChartTooltip';
import type { ValueFormatter } from '@/types';

interface DonutChartTooltipProps {
  active?: boolean;
  payload?: Payload<ValueType, NameType>[];
  valueFormatter: ValueFormatter;
}

const DonutChartTooltip: React.FC<DonutChartTooltipProps> = ({
  valueFormatter,
  payload,
  active,
}) => {
  return active && payload?.[0] ? (
    <ChartTooltipWrapper>
      <div className='px-4 py-2'>
        <ChartTooltipRow
          name={`${payload[0].name}`}
          value={valueFormatter(Number(payload[0].value))}
          color={payload[0].payload.color ?? ''}
        />
      </div>
    </ChartTooltipWrapper>
  ) : null;
};

export default DonutChartTooltip;
