import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { Spinner } from '.';

describe('Spinner component', () => {
  const DEFAULT_LABEL = 'Loading';
  const LABEL = 'Custom label';

  it('should render correctly', () => {
    const wrapper = render(<Spinner />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render label', () => {
    const { getByText } = render(<Spinner label={LABEL} />);

    expect(getByText(LABEL)).toBeInTheDocument();
  });

  it('should render with default aria-label', () => {
    const { getByLabelText } = render(<Spinner />);

    expect(getByLabelText(DEFAULT_LABEL)).toBeInTheDocument();
  });

  describe('should replace default aria-label', () => {
    it('when aria-label is provided', () => {
      const { getByLabelText } = render(<Spinner aria-label={LABEL} />);

      expect(getByLabelText(LABEL)).toBeInTheDocument();
    });

    it('when label is provided', () => {
      const { getByLabelText } = render(<Spinner label={LABEL} />);

      expect(getByLabelText(LABEL)).toBeInTheDocument();
    });
  });
});
