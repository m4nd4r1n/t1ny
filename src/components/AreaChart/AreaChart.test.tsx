import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ResizeObserver from 'resize-observer-polyfill';

import { AreaChart } from '.';
import { mockData } from './mock';

global.ResizeObserver = ResizeObserver;

const categories: (keyof (typeof mockData)[0])[] = [
  'Mock A',
  'Mock B',
  'Mock C',
  'Mock D',
];
const index = 'date';

describe('AreaChart component', () => {
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
      <AreaChart data={mockData} index={index} categories={categories} />,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should render No data when chart data is empty', () => {
    const { getByText } = render(
      <AreaChart data={[]} index='' categories={[]} />,
    );
    const text = getByText(/No data/i);

    expect(text).toBeInTheDocument();
  });

  it('should hide xAxis', () => {
    const { container } = render(
      <AreaChart
        data={mockData}
        index={index}
        categories={categories}
        showXAxis={false}
      />,
    );

    expect(container.querySelector('.xAxis')).not.toBeInTheDocument();
  });

  it('should hide yAxis', () => {
    const { container } = render(
      <AreaChart
        data={mockData}
        index={index}
        categories={categories}
        showYAxis={false}
      />,
    );

    expect(container.querySelector('.yAxis')).not.toBeInTheDocument();
  });

  it('should hide legend', () => {
    const { container } = render(
      <AreaChart
        data={mockData}
        index={index}
        categories={categories}
        showLegend={false}
      />,
    );

    expect(
      container.querySelector('.recharts-legend-wrapper'),
    ).not.toBeInTheDocument();
  });

  it('should hide grid lines', () => {
    const { container } = render(
      <AreaChart
        data={mockData}
        index={index}
        categories={categories}
        showGridLines={false}
      />,
    );

    expect(
      container.querySelector('.recharts-cartesian-grid'),
    ).not.toBeInTheDocument();
  });
});
