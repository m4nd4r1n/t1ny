import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { BarList } from '.';
import { mockData } from './mock';

describe('BarList component', () => {
  it('should render correctly', () => {
    const wrapper = render(<BarList data={mockData} />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render No data when data is empty', () => {
    const { getByText } = render(<BarList data={[]} />);
    const text = getByText(/No data/i);

    expect(text).toBeInTheDocument();
  });

  it('should render correctly with icon', () => {
    const iconTestId = 'icon';
    const mockDataWithIcon = mockData.map((item) => ({
      ...item,
      icon: () => <div data-testid={iconTestId}>icon</div>,
    }));
    const { getAllByTestId } = render(<BarList data={mockDataWithIcon} />);
    const icons = getAllByTestId(iconTestId);

    expect(icons.length).toBe(mockDataWithIcon.length);
  });

  it('should render correctly with link', () => {
    const mockDataWithLink = mockData.map((item) => ({
      ...item,
      href: '#',
    }));
    const { container } = render(<BarList data={mockDataWithLink} />);
    const links = container.querySelectorAll('a');

    expect(links.length).toBe(mockDataWithLink.length);
  });
});
