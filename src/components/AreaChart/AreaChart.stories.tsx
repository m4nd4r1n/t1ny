import type { Meta, StoryObj } from '@storybook/react';

import { AreaChart } from '.';
import { mockData } from './mock';

const meta = {
  title: 'Components/AreaChart',
  component: AreaChart,
  argTypes: {
    data: {
      table: {
        disable: true,
      },
    },
    index: {
      table: {
        disable: true,
      },
    },
    categories: {
      table: {
        disable: true,
      },
    },
    valueFormatter: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='flex max-w-3xl justify-center'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AreaChart>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps = {
  data: mockData,
  index: 'date',
  categories: ['Mock A', 'Mock B', 'Mock C'],
  startEndOnly: false,
  showXAxis: true,
  showYAxis: true,
  yAxisWidth: 56,
  showTooltip: true,
  showLegend: true,
  showGridLines: true,
  autoMinValue: false,
  connectNulls: false,
  showAnimation: false,
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};

export const WithCustomValueFormatter: Story = {
  args: {
    ...defaultProps,
    valueFormatter: (value: number) =>
      `$${Intl.NumberFormat('us').format(value).toString()}`,
  },
};
