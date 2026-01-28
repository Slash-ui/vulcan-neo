import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LineChart } from './LineChart';

const defaultData = [
  {
    name: 'Series A',
    data: [
      { x: 0, y: 10 },
      { x: 1, y: 20 },
      { x: 2, y: 15 },
    ],
  },
];

const multiSeriesData = [
  {
    name: 'Series A',
    data: [
      { x: 0, y: 10 },
      { x: 1, y: 20 },
    ],
  },
  {
    name: 'Series B',
    data: [
      { x: 0, y: 15 },
      { x: 1, y: 25 },
    ],
  },
];

describe('LineChart', () => {
  it('renders SVG element', () => {
    render(<LineChart data={defaultData} data-testid="chart" />);
    const chart = screen.getByTestId('chart');
    expect(chart.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with custom dimensions', () => {
    render(<LineChart data={defaultData} width={800} height={500} data-testid="chart" />);
    const svg = screen.getByTestId('chart').querySelector('svg');
    expect(svg).toHaveAttribute('width', '800');
    expect(svg).toHaveAttribute('height', '500');
  });

  it('renders legend for multiple series', () => {
    render(<LineChart data={multiSeriesData} showLegend />);
    expect(screen.getByText('Series A')).toBeInTheDocument();
    expect(screen.getByText('Series B')).toBeInTheDocument();
  });

  it('hides legend when showLegend is false', () => {
    render(<LineChart data={multiSeriesData} showLegend={false} />);
    expect(screen.queryByText('Series A')).not.toBeInTheDocument();
  });

  it('does not show legend for single series', () => {
    render(<LineChart data={defaultData} showLegend />);
    expect(screen.queryByText('Series A')).not.toBeInTheDocument();
  });

  it('renders with custom series color', () => {
    const dataWithColor = [
      {
        name: 'Custom',
        data: [{ x: 0, y: 10 }],
        color: '#FF0000',
      },
    ];
    render(<LineChart data={dataWithColor} data-testid="chart" />);
    expect(screen.getByTestId('chart')).toBeInTheDocument();
  });

  it('renders with date x-values', () => {
    const dateData = [
      {
        name: 'Dates',
        data: [
          { x: new Date(2024, 0, 1), y: 10 },
          { x: new Date(2024, 0, 2), y: 20 },
        ],
      },
    ];
    render(<LineChart data={dateData} data-testid="chart" />);
    expect(screen.getByTestId('chart').querySelector('svg')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<LineChart data={defaultData} className="custom-chart" data-testid="chart" />);
    expect(screen.getByTestId('chart')).toHaveClass('custom-chart');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<LineChart ref={ref} data={defaultData} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('handles empty data', () => {
    render(<LineChart data={[]} data-testid="chart" />);
    expect(screen.getByTestId('chart').querySelector('svg')).toBeInTheDocument();
  });
});
