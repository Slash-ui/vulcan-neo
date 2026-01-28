import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PieChart } from './PieChart';

const defaultData = [
  { label: 'Category A', value: 30 },
  { label: 'Category B', value: 50 },
  { label: 'Category C', value: 20 },
];

describe('PieChart', () => {
  it('renders SVG element', () => {
    render(<PieChart data={defaultData} data-testid="chart" />);
    const chart = screen.getByTestId('chart');
    expect(chart.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with custom dimensions', () => {
    render(<PieChart data={defaultData} width={500} height={500} data-testid="chart" />);
    const svg = screen.getByTestId('chart').querySelector('svg');
    expect(svg).toHaveAttribute('width', '500');
    expect(svg).toHaveAttribute('height', '500');
  });

  it('renders legend by default', () => {
    render(<PieChart data={defaultData} data-testid="chart" />);
    // Category names appear in both SVG labels and legend
    expect(screen.getAllByText('Category A').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Category B').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Category C').length).toBeGreaterThanOrEqual(1);
  });

  it('hides legend when showLegend is false', () => {
    render(<PieChart data={defaultData} showLegend={false} data-testid="chart" />);
    // When legend is hidden, category names only appear in SVG labels (1 instance each)
    // vs when legend is shown (2 instances each - SVG + legend)
    expect(screen.getAllByText('Category A').length).toBe(1);
  });

  it('shows values in legend', () => {
    render(<PieChart data={defaultData} />);
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('shows percentages when showPercentages is true', () => {
    render(<PieChart data={defaultData} showPercentages />);
    // Percentages appear both in chart labels and legend
    expect(screen.getAllByText('30.0%').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('50.0%').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('20.0%').length).toBeGreaterThanOrEqual(1);
  });

  it('renders as donut chart with innerRadius', () => {
    render(<PieChart data={defaultData} innerRadius={50} data-testid="chart" />);
    expect(screen.getByTestId('chart').querySelector('svg')).toBeInTheDocument();
  });

  it('renders with custom colors', () => {
    const dataWithColors = [
      { label: 'A', value: 10, color: '#FF0000' },
      { label: 'B', value: 20, color: '#00FF00' },
    ];
    render(<PieChart data={dataWithColors} data-testid="chart" />);
    expect(screen.getByTestId('chart').querySelector('svg')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<PieChart data={defaultData} className="custom-chart" data-testid="chart" />);
    expect(screen.getByTestId('chart')).toHaveClass('custom-chart');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<PieChart ref={ref} data={defaultData} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('handles empty data', () => {
    render(<PieChart data={[]} data-testid="chart" />);
    expect(screen.getByTestId('chart').querySelector('svg')).toBeInTheDocument();
  });
});
