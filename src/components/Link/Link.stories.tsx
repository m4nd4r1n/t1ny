import type { Meta, StoryObj } from '@storybook/react';

import { Link } from '.';
import { link } from './Link.styles';

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: {
        type: 'select',
      },
      options: ['default', 'primary', 'secondary', 'danger', 'white'],
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['small', 'medium', 'large'],
    },
  },
  decorators: [
    (Story) => (
      <div className='flex w-96 justify-center'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps = {
  children: 'Link',
  ...link.defaultVariants,
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};

export const Disabled: Story = {
  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const Block: Story = {
  args: {
    ...defaultProps,
    isBlock: true,
  },
};

export const FullWidth: Story = {
  args: {
    ...defaultProps,
    isFull: true,
    isBlock: true,
  },
};

export const External: Story = {
  args: {
    ...defaultProps,
    isExternal: true,
    href: 'https://google.com',
  },
};

export const CustomClassNames: Story = {
  args: {
    ...defaultProps,
    className:
      'bg-clip-text text-transparent bg-gradient-to-r from-[#ec4899] to-[#8b5cf6]',
  },
};
