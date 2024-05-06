import type { Meta, StoryObj } from '@storybook/react';
import type { ModalProps } from '.';

import { useState } from 'react';

import { Modal } from '.';
import { Button } from '../Button';
import { Input } from '../Input';
import { modal } from './Modal.styles';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClose: {
      table: {
        disable: true,
      },
    },
    isOpen: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='flex max-w-2xl justify-center'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps = {
  ...modal.defaultVariants,
};

const content = (
  <div className='space-y-4'>
    <h2 className='text-2xl'>Create a new link</h2>
    <div>
      <Input
        type='text'
        name='destination'
        id='destination'
        label='Destination'
        placeholder='https://example.com/long-url'
        isRequired
      />
    </div>
    <Button type='submit' fullWidth>
      Create
    </Button>
  </div>
);

const Template = ({ size }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={open}>Open modal</Button>
      <Modal isOpen={isOpen} onClose={close} size={size}>
        {content}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
