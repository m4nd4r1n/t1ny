import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from '.';
import { spinner } from './Spinner.styles';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
      options: [
        'current',
        'white',
        'default',
        'primary',
        'secondary',
        'danger',
      ],
    },
    labelColor: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary', 'secondary', 'danger', 'white'],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps = {
  ...spinner.defaultVariants,
};

export const Default: Story = {
  args: {
    ...defaultProps,
    size: 'medium',
  },
};

export const WithLabel: Story = {
  args: {
    ...defaultProps,
    label: 'Loading...',
  },
};
