import { createRef } from 'react';

import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';

import { Input } from '.';

describe('Input component', () => {
  it('should render correctly', () => {
    const wrapper = render(<Input label='test input' />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should forward ref', () => {
    const ref = createRef<HTMLInputElement>();

    render(<Input ref={ref} label='test input' />);
    expect(ref.current).not.toBeNull();
  });

  it('should have disabled attribute when isDisabled', () => {
    const { container } = render(<Input isDisabled label='test input' />);

    expect(container.querySelector('input')).toHaveAttribute('disabled');
  });

  it('should have required attribute when isRequired', () => {
    const { container } = render(<Input isRequired label='test input' />);

    expect(container.querySelector('input')).toHaveAttribute('required');
    expect(container.querySelector('input')).toHaveAttribute(
      'aria-required',
      'true',
    );
  });

  it('should have aria-describedby when description is provided', () => {
    const { container } = render(
      <Input description='help text' label='test input' />,
    );

    expect(container.querySelector('input')).toHaveAttribute(
      'aria-describedby',
    );
  });

  it('should have aria-describedby when errorMessage is provided', () => {
    const { container } = render(
      <Input errorMessage='error text' label='test input' />,
    );

    expect(container.querySelector('input')).toHaveAttribute(
      'aria-describedby',
    );
  });

  it('should have the same aria-labelledby as label id', () => {
    const { container } = render(<Input label='test input' />);

    const labelId = container.querySelector('label')?.id;
    const labelledBy = container
      .querySelector('input')
      ?.getAttribute('aria-labelledby');

    expect(labelledBy?.includes(labelId as string)).toBeTruthy();
  });

  test.each(['email', 'number', 'password', 'search', 'tel', 'text'])(
    'should have the correct type attribute type %s',
    (type) => {
      const { container } = render(<Input label='test input' type={type} />);
      expect(container.querySelector('input')).toHaveAttribute('type', type);
    },
  );

  it('should call dom event handlers only once', () => {
    const onFocus = jest.fn();

    const { container } = render(
      <Input label='test input' onFocus={onFocus} />,
    );

    container.querySelector('input')?.focus();
    container.querySelector('input')?.blur();

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('should be able to update the value via ref', async () => {
    const ref = createRef<HTMLInputElement>();
    const value = 'value';

    render(<Input ref={ref} type='text' />);

    if (!ref.current) {
      throw new Error('ref is null');
    }

    ref.current.value = value;

    await waitFor(() => {
      return expect(ref.current?.value)?.toBe(value);
    });
  });
});
