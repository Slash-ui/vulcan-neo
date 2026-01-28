import type { Meta, StoryObj } from '@storybook/react-vite';
import { PieChart, PieChartDataPoint } from './PieChart';
import { Surface } from '../../../foundation/Surface';

const meta: Meta<typeof PieChart> = {
  title: 'Charts/PieChart',
  component: PieChart,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    innerRadius: { control: 'number' },
    showLabels: { control: 'boolean' },
    showLegend: { control: 'boolean' },
    showPercentages: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData: PieChartDataPoint[] = [
  { label: 'Desktop', value: 45 },
  { label: 'Mobile', value: 30 },
  { label: 'Tablet', value: 15 },
  { label: 'Other', value: 10 },
];

const revenueData: PieChartDataPoint[] = [
  { label: 'Products', value: 450, color: '#6C5CE7' },
  { label: 'Services', value: 280, color: '#00B894' },
  { label: 'Subscriptions', value: 180, color: '#E17055' },
  { label: 'Other', value: 90, color: '#0984E3' },
];

export const Default: Story = {
  args: {
    data: sampleData,
    width: 400,
    height: 400,
  },
};

export const DonutChart: Story = {
  args: {
    data: sampleData,
    width: 400,
    height: 400,
    innerRadius: 100,
  },
};

export const WithPercentages: Story = {
  args: {
    data: sampleData,
    width: 400,
    height: 400,
    showPercentages: true,
  },
};

export const CustomColors: Story = {
  args: {
    data: revenueData,
    width: 400,
    height: 400,
  },
};

export const WithoutLabels: Story = {
  args: {
    data: sampleData,
    width: 400,
    height: 400,
    showLabels: false,
  },
};

export const WithoutLegend: Story = {
  args: {
    data: sampleData,
    width: 400,
    height: 400,
    showLegend: false,
  },
};

export const SmallDonut: Story = {
  args: {
    data: sampleData,
    width: 200,
    height: 200,
    innerRadius: 40,
    showLabels: false,
  },
};

export const DarkTheme: Story = {
  args: {
    data: revenueData,
    width: 400,
    height: 400,
    innerRadius: 80,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
