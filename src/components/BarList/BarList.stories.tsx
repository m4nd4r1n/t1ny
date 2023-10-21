import type { Meta, StoryObj } from '@storybook/react';

import { BarList } from '.';
import { mockData, mockDataWithIcon } from './mock';

const meta = {
  title: 'Components/BarList',
  component: BarList,
  argTypes: {
    data: {
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
} satisfies Meta<typeof BarList>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps = {
  data: mockData,
  isColorful: false,
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

export const WithIcon: Story = {
  args: {
    ...defaultProps,
    data: mockDataWithIcon,
  },
};
