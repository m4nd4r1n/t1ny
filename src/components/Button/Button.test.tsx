import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';

import { Button } from '.';

describe('Button component', () => {
  it('should render correctly', () => {
    const wrapper = render(<Button />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render label', () => {
    const LABEL = 'Click me';
    const { getByRole } = render(<Button>{LABEL}</Button>);
    const label = getByRole('button', { name: new RegExp(LABEL, 'i') });

    expect(label).toBeInTheDocument();
  });

  it('should trigger onClick function', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Button onClick={onClick} />);

    act(() => {
      getByRole('button').click();
    });

    expect(onClick).toHaveBeenCalled();
  });

  it('should not trigger onClick function when disabled', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Button onClick={onClick} disabled />);

    act(() => {
      getByRole('button').click();
    });

    expect(onClick).not.toHaveBeenCalled();
  });
});
