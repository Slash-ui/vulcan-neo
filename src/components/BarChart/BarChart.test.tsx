import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BarChart } from './BarChart';

const defaultData = [
  { label: 'January', value: 100 },
  { label: 'February', value: 150 },
  { label: 'March', value: 120 },
];

describe('BarChart', () => {
  it('renders SVG element', () => {
    render(<BarChart data={defaultData} data-testid="chart" />);
    const chart = screen.getByTestId('chart');
    expect(chart.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with custom dimensions', () => {
    render(<BarChart data={defaultData} width={800} height={500} data-testid="chart" />);
    const svg = screen.getByTestId('chart').querySelector('svg');
    expect(svg).toHaveAttribute('width', '800');
    expect(svg).toHaveAttribute('height', '500');
  });

  it('renders bars', () => {
    render(<BarChart data={defaultData} data-testid="chart" />);
    const svg = screen.getByTestId('chart').querySelector('svg');
    const bars = svg?.querySelectorAll('.bar');
    expect(bars?.length).toBe(3);
  });

  it('renders horizontal bars', () => {
    render(<BarChart data={defaultData} horizontal data-testid="chart" />);
    expect(screen.getByTestId('chart').querySelector('svg')).toBeInTheDocument();
  });

  it('renders with custom color', () => {
    render(<BarChart data={defaultData} color="#FF0000" data-testid="chart" />);
    expect(screen.getByTestId('chart').querySelector('svg')).toBeInTheDocument();
  });

  it('renders bars with individual colors', () => {
    const dataWithColors = [
      { label: 'A', value: 10, color: '#FF0000' },
      { label: 'B', value: 20, color: '#00FF00' },
    ];
    render(<BarChart data={dataWithColors} data-testid="chart" />);
    expect(screen.getByTestId('chart').querySelector('svg')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<BarChart data={defaultData} className="custom-chart" data-testid="chart" />);
    expect(screen.getByTestId('chart')).toHaveClass('custom-chart');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<BarChart ref={ref} data={defaultData} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('handles empty data', () => {
    render(<BarChart data={[]} data-testid="chart" />);
    expect(screen.getByTestId('chart').querySelector('svg')).toBeInTheDocument();
  });
});
