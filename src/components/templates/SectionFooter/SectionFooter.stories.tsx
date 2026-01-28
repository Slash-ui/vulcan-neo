import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionFooter } from './SectionFooter';
import { Card, CardBody } from '../../molecules/Card';
import { Button } from '../../atoms/Button';
import { Surface } from '../../foundation/Surface';

const meta: Meta<typeof SectionFooter> = {
  title: 'Templates/SectionFooter',
  component: SectionFooter,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem' }}>
        <Card style={{ maxWidth: '500px' }}>
          <CardBody>
            <p style={{ margin: 0, color: 'var(--neo-text-secondary)' }}>
              Card content goes here. This demonstrates how the footer appears below the content.
            </p>
          </CardBody>
          <Story />
        </Card>
      </Surface>
    ),
  ],
  argTypes: {
    bordered: {
      control: 'boolean',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'between'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    left: 'Last updated 2 hours ago',
    right: <Button size="sm">Save</Button>,
  },
};

export const WithMultipleActions: Story = {
  args: {
    left: 'Changes will be saved automatically',
    right: (
      <>
        <Button variant="flat" size="sm">Cancel</Button>
        <Button size="sm">Save Changes</Button>
      </>
    ),
  },
};

export const ActionsOnly: Story = {
  args: {
    align: 'end',
    right: (
      <>
        <Button variant="flat" size="sm">Cancel</Button>
        <Button size="sm">Confirm</Button>
      </>
    ),
  },
};

export const Centered: Story = {
  args: {
    align: 'center',
    children: (
      <>
        <Button variant="flat" size="sm">Previous</Button>
        <span style={{ color: 'var(--neo-text-secondary)', fontSize: '14px' }}>Page 1 of 10</span>
        <Button variant="flat" size="sm">Next</Button>
      </>
    ),
  },
};

export const NoBorder: Story = {
  args: {
    bordered: false,
    right: <Button size="sm">Continue</Button>,
  },
};

export const DarkTheme: Story = {
  args: {
    left: 'Auto-saving enabled',
    right: <Button size="sm">Publish</Button>,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Card style={{ maxWidth: '500px' }}>
          <CardBody>
            <p style={{ margin: 0, color: 'var(--neo-text-secondary)' }}>
              Card content goes here.
            </p>
          </CardBody>
          <Story />
        </Card>
      </Surface>
    ),
  ],
};
