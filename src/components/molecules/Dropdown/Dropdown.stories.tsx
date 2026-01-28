import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from './Dropdown';
import { Button } from '../../atoms/Button';
import { IconButton } from '../../atoms/IconButton';
import { Surface } from '../../foundation/Surface';

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem', minHeight: '300px' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

const defaultItems = [
  { id: 'edit', label: 'Edit', icon: <EditIcon /> },
  { id: 'copy', label: 'Duplicate', icon: <CopyIcon /> },
  { id: 'divider', label: '', divider: true },
  { id: 'delete', label: 'Delete', icon: <TrashIcon />, danger: true },
];

export const Default: Story = {
  args: {
    trigger: <Button label="Open Menu" />,
    items: defaultItems,
    onSelect: (id) => console.log('Selected:', id),
  },
};

export const WithIconButton: Story = {
  args: {
    trigger: <IconButton aria-label="More options"><MoreIcon /></IconButton>,
    items: defaultItems,
    onSelect: (id) => console.log('Selected:', id),
  },
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'space-between', padding: '4rem 0' }}>
      <Dropdown
        trigger={<Button label="Bottom Start" />}
        items={defaultItems}
        placement="bottom-start"
      />
      <Dropdown
        trigger={<Button label="Bottom End" />}
        items={defaultItems}
        placement="bottom-end"
      />
    </div>
  ),
};

export const WithDisabledItems: Story = {
  args: {
    trigger: <Button label="Actions" />,
    items: [
      { id: 'view', label: 'View' },
      { id: 'edit', label: 'Edit' },
      { id: 'archive', label: 'Archive', disabled: true },
      { id: 'divider', label: '', divider: true },
      { id: 'delete', label: 'Delete', danger: true, disabled: true },
    ],
  },
};

export const SimpleMenu: Story = {
  args: {
    trigger: <Button label="Select Option" />,
    items: [
      { id: 'option1', label: 'Option 1' },
      { id: 'option2', label: 'Option 2' },
      { id: 'option3', label: 'Option 3' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    trigger: <Button label="Disabled Menu" />,
    items: defaultItems,
    disabled: true,
  },
};

export const DarkTheme: Story = {
  args: {
    trigger: <Button label="Open Menu" />,
    items: defaultItems,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem', minHeight: '300px' }}>
        <Story />
      </Surface>
    ),
  ],
};
