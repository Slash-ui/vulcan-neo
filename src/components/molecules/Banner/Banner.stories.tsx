import type { Meta, StoryObj } from '@storybook/react-vite';
import { iconMapXl, createIconArgType } from '../../../../.storybook/icons';
import { Banner } from './Banner';
import { Button } from '../../atoms/Button';
import { InsetField } from '../../atoms/InsetField';
import { Surface } from '../../foundation/Surface';

const meta: Meta<typeof Banner> = {
  title: 'Molecules/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A full-width banner component for displaying important announcements, promotions, or alerts.

## Features
- **Three-section layout**: Icon (FeaturedIcon) | Content (title, description, custom content) | Actions + Dismiss (optional)
- **Neomorphic variants**: \`convex\`, \`flat\`, and \`concave\` styles with matching shadows
- **FeaturedIcon integration**: Icon uses FeaturedIcon component with customizable variant, shape, size, and elevation
- **Color themes**: Supports primary, secondary, tertiary colors with light/dark variants, plus status colors (success, warning, error, info)
- **Color-matched shadows**: Icon and buttons automatically use shadows that match the banner's color
- **Automatic button styling**: CTA buttons automatically inherit the banner's color and shadow when placed inside
- **Sticky positioning**: Can be fixed to top or bottom of viewport
- **Dismissible**: Optional close button with callback

## Usage
\`\`\`tsx
<Banner
  color="primary"
  variant="convex"
  icon={<Info size={24} />}
  iconVariant="convex"
  iconShape="rounded"
  title="Welcome!"
  description="Check out our new features."
  primaryAction={<Button label="Learn more" />}
  dismissible
/>
\`\`\`
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '120px', padding: '1.5rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['convex', 'flat', 'concave'],
      description: 'The neomorphic variant of the banner. Controls outer/inner shadow appearance.',
      table: {
        defaultValue: { summary: 'convex' },
      },
    },
    iconVariant: {
      control: 'select',
      options: ['convex', 'flat', 'concave'],
      description: 'The neomorphic variant of the icon container (FeaturedIcon). Independent from the banner variant.',
      table: {
        defaultValue: { summary: 'flat' },
      },
    },
    iconShape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: 'The shape of the icon container.',
      table: {
        defaultValue: { summary: 'rounded' },
      },
    },
    iconElevation: {
      control: 'select',
      options: ['low', 'mid', 'high'],
      description: 'The elevation level of the icon shadow.',
      table: {
        defaultValue: { summary: 'low' },
      },
    },
    iconSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The size of the icon container. If not specified, derives from banner size (sm→md, md→lg, lg→xl).',
    },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'primary-light',
        'primary-dark',
        'secondary',
        'secondary-light',
        'secondary-dark',
        'tertiary',
        'tertiary-light',
        'tertiary-dark',
        'success',
        'warning',
        'error',
        'info',
      ],
      description: 'The color theme of the banner. When set, CTA buttons automatically inherit matching color and shadow.',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant affecting padding, typography, and icon container dimensions.',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    sticky: {
      control: 'boolean',
      description: 'Whether the banner is sticky (fixed position). Use with `position` prop.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    position: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'Position when sticky. Only applies when `sticky` is true.',
      table: {
        defaultValue: { summary: 'top' },
      },
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center'],
      description: 'Text alignment for the content section.',
      table: {
        defaultValue: { summary: 'center' },
      },
    },
    dismissible: {
      control: 'boolean',
      description: 'Show close button. When clicked, banner is hidden and `onDismiss` callback is triggered.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    title: {
      control: 'text',
      description: 'Banner title displayed as a heading.',
    },
    description: {
      control: 'text',
      description: 'Banner description/message displayed below the title.',
    },
    icon: createIconArgType(iconMapXl, 'Icon displayed on the left side of the banner. Select from Lucide icons.'),
    primaryAction: {
      control: false,
      description: 'Primary action button (ReactNode). Automatically inherits banner color and shadow.',
    },
    secondaryAction: {
      control: false,
      description: 'Secondary action button (ReactNode). Automatically inherits banner color and shadow.',
    },
    beforeActions: {
      control: false,
      description: 'Custom content displayed before action buttons (e.g., InsetField for email input).',
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Callback fired when the dismiss button is clicked.',
    },
    children: {
      control: 'text',
      description: 'Custom content (alternative to title/description). Displayed in the content section.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Welcome to our platform',
    description: 'Discover all the new features we have in store for you.',
    icon: iconMapXl.Info,
    dismissible: true,
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The three neomorphic variants control the shadow appearance of the banner.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Banner
        variant="convex"
        color="primary"
        title="Convex variant"
        description="Raised appearance with outer shadow"
        icon={iconMapXl.Info}
        primaryAction={<Button variant="convex" size="sm" label="Action" />}
        dismissible
      />
      <Banner
        variant="flat"
        color="primary"
        title="Flat variant"
        description="No shadow, minimal style"
        icon={iconMapXl.Info}
        primaryAction={<Button variant="convex" size="sm" label="Action" />}
        dismissible
      />
      <Banner
        variant="concave"
        color="primary"
        title="Concave variant"
        description="Pressed appearance with inner shadow"
        icon={iconMapXl.Info}
        primaryAction={<Button variant="convex" size="sm" label="Action" />}
        dismissible
      />
    </div>
  ),
};

export const IconVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The icon container has its own independent variant, allowing different combinations with the banner variant.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Banner
        variant="flat"
        iconVariant="convex"
        color="primary"
        title="Icon Convex"
        description="Flat banner with convex (raised) icon"
        icon={iconMapXl.Star}
        dismissible
      />
      <Banner
        variant="flat"
        iconVariant="flat"
        color="primary"
        title="Icon Flat"
        description="Flat banner with flat icon"
        icon={iconMapXl.Star}
        dismissible
      />
      <Banner
        variant="flat"
        iconVariant="concave"
        color="primary"
        title="Icon Concave"
        description="Flat banner with concave (pressed) icon"
        icon={iconMapXl.Star}
        dismissible
      />
    </div>
  ),
};

export const WithActions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Buttons automatically inherit the banner\'s color and shadow styling with low elevation.',
      },
    },
  },
  args: {
    color: 'primary',
    size: 'md',
    title: 'New feature available!',
    description: 'Check out our latest release with exciting updates.',
    icon: iconMapXl.Zap,
    primaryAction: <Button variant="convex" size="sm" label="Try it now" />,
    secondaryAction: <Button variant="flat" size="sm" label="Learn more" />,
    dismissible: true,
  },
};

export const WithInsetField: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use `beforeActions` to add custom content like input fields before the action buttons.',
      },
    },
  },
  args: {
    color: 'default',
    size: 'md',
    textAlign: 'left',
    title: 'Subscribe to our newsletter',
    description: 'Get the latest updates delivered to your inbox.',
    icon: iconMapXl.Mail,
    beforeActions: (
      <InsetField
        placeholder="Enter your email"
        size="sm"
        style={{ width: '200px' }}
      />
    ),
    primaryAction: <Button variant="convex" size="sm" label="Subscribe" />,
    dismissible: true,
  },
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Primary, secondary, and tertiary color themes with automatically matched shadows.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Banner
        color="primary"
        title="Primary"
        description="Primary color banner"
        icon={iconMapXl.Zap}
        primaryAction={<Button variant="convex" size="sm" label="Action" />}
        dismissible
      />
      <Banner
        color="secondary"
        title="Secondary"
        description="Secondary color banner"
        icon={iconMapXl.Bell}
        primaryAction={<Button variant="convex" size="sm" label="Action" />}
        dismissible
      />
      <Banner
        color="tertiary"
        title="Tertiary"
        description="Tertiary color banner"
        icon={iconMapXl.Gift}
        primaryAction={<Button variant="convex" size="sm" label="Action" />}
        dismissible
      />
    </div>
  ),
};

export const ColorVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Each color has light, base, and dark variants for different visual emphasis.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Banner
        color="primary-light"
        title="Primary Light"
        icon={iconMapXl.Info}
        primaryAction={<Button variant="convex" size="sm" label="Action" />}
        dismissible
      />
      <Banner
        color="primary"
        title="Primary"
        icon={iconMapXl.Info}
        primaryAction={<Button variant="convex" size="sm" label="Action" />}
        dismissible
      />
      <Banner
        color="primary-dark"
        title="Primary Dark"
        icon={iconMapXl.Info}
        primaryAction={<Button variant="convex" size="sm" label="Action" />}
        dismissible
      />
    </div>
  ),
};

export const StatusColors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Status colors for feedback messages: success, warning, error, and info.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Banner
        color="success"
        title="Success"
        description="Operation completed successfully"
        icon={iconMapXl.CheckCircle}
        dismissible
      />
      <Banner
        color="warning"
        title="Warning"
        description="Please review before continuing"
        icon={iconMapXl.AlertCircle}
        dismissible
      />
      <Banner
        color="error"
        title="Error"
        description="Something went wrong"
        icon={iconMapXl.XCircle}
        dismissible
      />
      <Banner
        color="info"
        title="Info"
        description="Here's some useful information"
        icon={iconMapXl.Info}
        dismissible
      />
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Three sizes affecting padding, typography scale, and icon container dimensions.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Banner
        color="primary"
        size="sm"
        title="Small banner"
        description="Compact size for subtle notifications"
        icon={iconMapXl.Info}
        dismissible
      />
      <Banner
        color="primary"
        size="md"
        title="Medium banner"
        description="Default size for most use cases"
        icon={iconMapXl.Info}
        dismissible
      />
      <Banner
        color="primary"
        size="lg"
        title="Large banner"
        description="Prominent size for important announcements"
        icon={iconMapXl.Info}
        dismissible
      />
    </div>
  ),
};

export const TextAlignment: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Content can be center or left aligned within the banner.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Banner
        color="primary"
        textAlign="center"
        title="Center aligned"
        description="Content is centered within the banner"
        icon={iconMapXl.Info}
        dismissible
      />
      <Banner
        color="primary"
        textAlign="left"
        title="Left aligned"
        description="Content is aligned to the left"
        icon={iconMapXl.Info}
        dismissible
      />
    </div>
  ),
};

export const ChildrenContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use `children` for custom content instead of title/description.',
      },
    },
  },
  args: {
    color: 'success',
    size: 'md',
    icon: iconMapXl.Gift,
    children: 'Get 20% off your first order! Use code WELCOME20 at checkout.',
    primaryAction: <Button variant="convex" size="sm" label="Shop now" />,
    dismissible: true,
  },
};

export const StickyTop: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sticky banners stay fixed at the top or bottom of the viewport.',
      },
    },
  },
  args: {
    color: 'primary',
    sticky: true,
    position: 'top',
    title: 'Sticky top banner',
    description: 'This banner is fixed to the top of the viewport.',
    icon: iconMapXl.Zap,
    primaryAction: <Button variant="flat" size="sm" label="Learn more" />,
    dismissible: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '400px' }}>
        <Story />
        <div style={{ padding: '80px 20px' }}>
          <p>Scroll the page to see the sticky banner stay at the top.</p>
          <p style={{ marginTop: '300px' }}>More content below...</p>
        </div>
      </Surface>
    ),
  ],
};

export const StickyBottom: Story = {
  args: {
    color: 'info',
    sticky: true,
    position: 'bottom',
    title: 'Sticky bottom banner',
    description: 'This banner is fixed to the bottom of the viewport.',
    icon: iconMapXl.Bell,
    primaryAction: <Button variant="convex" size="sm" label="Accept" />,
    dismissible: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ minHeight: '400px' }}>
        <Story />
        <div style={{ padding: '20px' }}>
          <p>Scroll the page to see the sticky banner stay at the bottom.</p>
        </div>
      </Surface>
    ),
  ],
};

export const CompleteExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A complete example with icon, title, description, input field, and action buttons.',
      },
    },
  },
  args: {
    color: 'tertiary',
    size: 'md',
    textAlign: 'left',
    title: 'Limited time offer!',
    description: 'Sign up now and get 3 months free.',
    icon: iconMapXl.Gift,
    beforeActions: (
      <InsetField
        placeholder="Email address"
        size="sm"
        style={{ width: '180px' }}
      />
    ),
    primaryAction: <Button variant="convex" size="sm" label="Sign up" />,
    secondaryAction: <Button variant="flat" size="sm" label="No thanks" />,
    dismissible: true,
  },
};

export const DarkTheme: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Banner works seamlessly with dark theme Surface.',
      },
    },
  },
  args: {
    color: 'primary',
    title: 'Join us for our virtual conference!',
    description: 'March 15th, 2024 - Register now for early bird pricing.',
    icon: iconMapXl.Zap,
    primaryAction: <Button variant="flat" size="sm" label="Register now" />,
    dismissible: true,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ minHeight: '200px', padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use the controls to experiment with all banner configurations.',
      },
    },
  },
  args: {
    title: 'Customize this banner',
    description: 'Play with the controls to see different configurations.',
    icon: iconMapXl.Info,
    primaryAction: <Button variant="convex" size="sm" label="Action" />,
    dismissible: true,
  },
};
