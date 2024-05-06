import * as React from 'react';
import { render } from '@testing-library/react';

import { Link } from '.';

describe('Link component', () => {
  it('should render correctly', () => {
    const wrapper = render(<Link href='#' />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should no errors when href missing', () => {
    const wrapper = render(<Link>Link</Link>);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should have target="_blank" and rel="noopener noreferrer" when "isExternal" is true', () => {
    const { container } = render(
      <Link isExternal href='#'>
        Link
      </Link>,
    );

    expect(container.querySelector('a')?.rel).toBe('noopener noreferrer');
    expect(container.querySelector('a')?.target).toBe('_blank');
  });
});
