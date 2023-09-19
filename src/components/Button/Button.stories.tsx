import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '.';
import { button } from './Button.styles';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary', 'secondary', 'danger'],
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['small', 'medium', 'large'],
    },
    fullWidth: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='flex w-96 justify-center'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps = {
  children: 'Button',
  isLoading: false,
  ...button.defaultVariants,
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};

export const FullWidth: Story = {
  args: {
    ...defaultProps,
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    ...defaultProps,
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    ...defaultProps,
    isLoading: true,
  },
};

export const CustomClassNames: Story = {
  args: {
    ...defaultProps,
    className: 'bg-gradient-to-tr from-[#ff00ff] to-[#00ffff]',
  },
};
