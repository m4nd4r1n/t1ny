import type { Meta, StoryObj } from '@storybook/react';

import { DonutChart } from '.';
import { mockData } from './mock';

const meta = {
  title: 'Components/DonutChart',
  component: DonutChart,
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
    category: {
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
} satisfies Meta<typeof DonutChart>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps = {
  data: mockData,
  index: 'name',
  category: 'sales',
  showTooltip: true,
  showAnimation: false,
  className: 'h-80',
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};

export const WithLabel: Story = {
  args: {
    ...defaultProps,
    label: 'Countries',
  },
};

export const WithCustomValueFormatter: Story = {
  args: {
    ...defaultProps,
    valueFormatter: (value: number) =>
      `$${Intl.NumberFormat('us').format(value).toString()}`,
  },
};
