import type { Meta, StoryObj } from '@storybook/react-vite';
import { LineChart, LineChartSeries } from './LineChart';
import { Surface } from '../../../foundation/Surface';

const meta: Meta<typeof LineChart> = {
  title: 'Molecules/Charts/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    showGrid: { control: 'boolean' },
    showLegend: { control: 'boolean' },
    showDots: { control: 'boolean' },
    areaFill: { control: 'boolean' },
    curveType: {
      control: 'select',
      options: ['linear', 'monotone', 'step'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const singleSeriesData: LineChartSeries[] = [
  {
    name: 'Revenue',
    data: [
      { x: 1, y: 30 },
      { x: 2, y: 45 },
      { x: 3, y: 35 },
      { x: 4, y: 60 },
      { x: 5, y: 55 },
      { x: 6, y: 70 },
      { x: 7, y: 65 },
      { x: 8, y: 85 },
      { x: 9, y: 80 },
      { x: 10, y: 95 },
    ],
  },
];

const multiSeriesData: LineChartSeries[] = [
  {
    name: 'Revenue',
    data: [
      { x: 1, y: 30 },
      { x: 2, y: 45 },
      { x: 3, y: 35 },
      { x: 4, y: 60 },
      { x: 5, y: 55 },
      { x: 6, y: 70 },
    ],
    color: '#6C5CE7',
  },
  {
    name: 'Expenses',
    data: [
      { x: 1, y: 20 },
      { x: 2, y: 25 },
      { x: 3, y: 30 },
      { x: 4, y: 35 },
      { x: 5, y: 40 },
      { x: 6, y: 45 },
    ],
    color: '#E17055',
  },
  {
    name: 'Profit',
    data: [
      { x: 1, y: 10 },
      { x: 2, y: 20 },
      { x: 3, y: 5 },
      { x: 4, y: 25 },
      { x: 5, y: 15 },
      { x: 6, y: 25 },
    ],
    color: '#00B894',
  },
];

export const Default: Story = {
  args: {
    data: singleSeriesData,
    width: 600,
    height: 400,
    xAxisLabel: 'Month',
    yAxisLabel: 'Value ($K)',
  },
};

export const MultiSeries: Story = {
  args: {
    data: multiSeriesData,
    width: 600,
    height: 400,
    xAxisLabel: 'Month',
    yAxisLabel: 'Amount ($K)',
  },
};

export const AreaChart: Story = {
  args: {
    data: singleSeriesData,
    width: 600,
    height: 400,
    areaFill: true,
  },
};

export const WithoutDots: Story = {
  args: {
    data: multiSeriesData,
    width: 600,
    height: 400,
    showDots: false,
  },
};

export const WithoutGrid: Story = {
  args: {
    data: singleSeriesData,
    width: 600,
    height: 400,
    showGrid: false,
  },
};

export const CurveTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Monotone (Default)</p>
        <LineChart data={singleSeriesData} width={400} height={250} curveType="monotone" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Linear</p>
        <LineChart data={singleSeriesData} width={400} height={250} curveType="linear" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Step</p>
        <LineChart data={singleSeriesData} width={400} height={250} curveType="step" />
      </div>
    </div>
  ),
};

export const SmallChart: Story = {
  args: {
    data: singleSeriesData,
    width: 300,
    height: 200,
    showLegend: false,
  },
};

export const DarkTheme: Story = {
  args: {
    data: multiSeriesData,
    width: 600,
    height: 400,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
