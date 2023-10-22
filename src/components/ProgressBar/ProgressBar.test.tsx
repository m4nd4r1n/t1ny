import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { ProgressBar } from '.';

describe('ProgressBar component', () => {
  it('should render correctly', () => {
    const wrapper = render(<ProgressBar value={1} max={2} />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render correctly with label text', () => {
    const { getByText } = render(
      <ProgressBar value={1} max={2} label='This is label' />,
    );
    const text = getByText(/label/i);

    expect(text).toBeInTheDocument();
  });

  it('should render correctly with unit text', () => {
    const { getByText } = render(<ProgressBar value={1} max={2} unit='used' />);
    const text = getByText(/used/i);

    expect(text).toBeInTheDocument();
  });
});
