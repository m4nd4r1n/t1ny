import type { Meta, StoryObj } from '@storybook/react';

import { ProgressBar } from '.';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='max-w-3xl'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps = {
  value: 3,
  max: 10,
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};

export const WithLabelAndUnit: Story = {
  args: {
    ...defaultProps,
    label: 'Total',
    unit: 'used',
  },
};
