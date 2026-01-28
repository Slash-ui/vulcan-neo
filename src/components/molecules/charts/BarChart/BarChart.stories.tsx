import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart, BarChartDataPoint } from './BarChart';
import { Surface } from '../../../foundation/Surface';

const meta: Meta<typeof BarChart> = {
  title: 'Molecules/Charts/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    horizontal: { control: 'boolean' },
    showGrid: { control: 'boolean' },
    showValues: { control: 'boolean' },
    borderRadius: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData: BarChartDataPoint[] = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 35 },
  { label: 'Apr', value: 60 },
  { label: 'May', value: 55 },
  { label: 'Jun', value: 70 },
];

const coloredData: BarChartDataPoint[] = [
  { label: 'Product A', value: 120, color: '#6C5CE7' },
  { label: 'Product B', value: 90, color: '#00B894' },
  { label: 'Product C', value: 150, color: '#E17055' },
  { label: 'Product D', value: 80, color: '#0984E3' },
  { label: 'Product E', value: 110, color: '#FDCB6E' },
];

export const Default: Story = {
  args: {
    data: sampleData,
    width: 600,
    height: 400,
    xAxisLabel: 'Month',
    yAxisLabel: 'Sales ($K)',
  },
};

export const Horizontal: Story = {
  args: {
    data: sampleData,
    width: 600,
    height: 400,
    horizontal: true,
    xAxisLabel: 'Sales ($K)',
  },
};

export const WithValues: Story = {
  args: {
    data: sampleData,
    width: 600,
    height: 400,
    showValues: true,
  },
};

export const ColoredBars: Story = {
  args: {
    data: coloredData,
    width: 600,
    height: 400,
  },
};

export const WithoutGrid: Story = {
  args: {
    data: sampleData,
    width: 600,
    height: 400,
    showGrid: false,
  },
};

export const CustomBorderRadius: Story = {
  args: {
    data: sampleData,
    width: 600,
    height: 400,
    borderRadius: 8,
  },
};

export const SmallChart: Story = {
  args: {
    data: sampleData.slice(0, 4),
    width: 300,
    height: 200,
  },
};

export const DarkTheme: Story = {
  args: {
    data: coloredData,
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
