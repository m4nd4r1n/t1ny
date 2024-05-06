import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import ResizeObserver from 'resize-observer-polyfill';

import { DonutChart } from '.';
import { mockData } from './mock';

global.ResizeObserver = ResizeObserver;

const category = 'sales';
const index = 'name';

describe('DonutChart component', () => {
  beforeAll(() => {
    jest
      .spyOn(HTMLElement.prototype, 'clientHeight', 'get')
      .mockReturnValue(100);
    jest
      .spyOn(HTMLElement.prototype, 'clientWidth', 'get')
      .mockReturnValue(100);
  });

  it('should render correctly', () => {
    const wrapper = render(
      <DonutChart data={mockData} index={index} category={category} />,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render "No data" when chart data is empty', () => {
    const { getByText } = render(<DonutChart data={[]} index='' category='' />);
    const text = getByText(/No data/i);

    expect(text).toBeInTheDocument();
  });

  it('should render label', () => {
    const LABEL = 'Label';
    const { getByText } = render(
      <DonutChart
        data={mockData}
        index={index}
        category={category}
        label={LABEL}
      />,
    );
    const text = getByText(RegExp(LABEL, 'i'));

    expect(text).toBeInTheDocument();
  });
});
