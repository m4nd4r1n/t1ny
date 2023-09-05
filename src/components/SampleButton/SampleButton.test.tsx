import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import SampleButton from './SampleButton';

describe('Button component', () => {
  it('should render a label', () => {
    const LABEL = 'Click me';
    render(<SampleButton label={LABEL} />);
    const label = screen.getByText(new RegExp(LABEL, 'i'));

    expect(label).toBeInTheDocument();
  });
});
