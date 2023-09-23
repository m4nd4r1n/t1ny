import { useMemo, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Input, type InputProps } from '.';
import { input } from './Input.styles';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
    isInvalid: {
      table: {
        disable: true,
      },
    },
    isRequired: {
      table: {
        disable: true,
      },
    },
    type: {
      table: {
        disable: true,
      },
    },
    id: {
      table: {
        disable: true,
      },
    },
    name: {
      table: {
        disable: true,
      },
    },
    value: {
      table: {
        disable: true,
      },
    },
    defaultValue: {
      table: {
        disable: true,
      },
    },
    placeholder: {
      table: {
        disable: true,
      },
    },
    description: {
      table: {
        disable: true,
      },
    },
    errorMessage: {
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
      <div className='flex max-w-2xl justify-center'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps = {
  ...input.defaultVariants,
  label: 'Email',
  type: 'email',
};

const Template = (args: InputProps) => (
  <div className='flex w-full max-w-xl flex-row items-end gap-4'>
    <Input {...args} />
    <Input {...args} placeholder='Enter your email' />
  </div>
);

const RegexValidationTemplate = (args: InputProps) => {
  const [value, setValue] = useState('');

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isValid = useMemo(() => {
    if (value === '') return undefined;

    return !!validateEmail(value);
  }, [value]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <Input
      {...args}
      errorMessage={isValid === false ? 'Please enter a valid email' : ''}
      placeholder='Enter your email'
      isInvalid={isValid === false}
      value={value}
      onChange={onChange}
    />
  );
};

const INPUT_TYPES = [
  'Text',
  'Number',
  'Password',
  'Email',
  'URL',
  'Search',
  'Tel',
  'Date',
  'Time',
  'Month',
  'Week',
  'Range',
  'Color',
  'Datetime-local',
  'File',
] as const;

const InputTypesTemplate = (args: InputProps) => (
  <div className='grid grid-cols-3 gap-4'>
    {INPUT_TYPES.map((type) => (
      <Input
        key={type}
        {...args}
        label={type}
        placeholder={`Enter your ${type.toLocaleLowerCase()}`}
        type={type.toLocaleLowerCase()}
      />
    ))}
  </div>
);

export const Default: Story = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const Required: Story = {
  render: Template,
  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const Disabled: Story = {
  args: {
    ...defaultProps,
    defaultValue: 'test@example.org',
    isDisabled: true,
  },
};

export const WithDescription: Story = {
  render: Template,
  args: {
    ...defaultProps,
    description: 'This is description.',
  },
};

export const WithErrorMessage: Story = {
  render: Template,
  args: {
    ...defaultProps,
    errorMessage: 'Please enter a valid email address',
  },
};

export const IsInvalid: Story = {
  args: {
    ...defaultProps,
    isInvalid: true,
    defaultValue: 'invalid@email.com',
    placeholder: 'Enter your email',
    errorMessage: 'Please enter a valid email address',
  },
};

export const RegexValidation: Story = {
  render: RegexValidationTemplate,

  args: {
    ...defaultProps,
  },
};

export const InputTypes = {
  render: InputTypesTemplate,

  args: {
    ...defaultProps,
  },
};
