import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs, BreadcrumbItem, BreadcrumbItemVariant, BreadcrumbsSize } from './Breadcrumbs';
import { Surface } from '../../foundation/Surface';
import {
  iconMapSm,
  createIconArgType,
  House,
  ArrowRight,
  Minus,
  ChevronRight,
} from '../../../../.storybook/icons';

/**
 * A navigation component that shows the user's location within a site hierarchy.
 * Helps users understand where they are and navigate back to parent pages.
 *
 * ## When to Use
 *
 * - **Deep navigation**: Sites with more than 2 levels of hierarchy
 * - **Content-heavy sites**: E-commerce, documentation, file systems
 * - **User orientation**: Help users understand their location
 *
 * ## Key Features
 *
 * - **Custom separators**: Use any icon as a separator between items
 * - **Home icon options**: Display home as text, icon, or both
 * - **Collapsible**: Automatically collapse long paths with ellipsis
 * - **Accessible**: Full keyboard navigation and ARIA support
 *
 * ## Best Practices
 *
 * - Always include a link to the home/root page
 * - Keep breadcrumb labels short and descriptive
 * - The current page should not be a link
 */
const meta: Meta<typeof Breadcrumbs> = {
  title: 'Molecules/Breadcrumbs',
  component: Breadcrumbs,
  subcomponents: {
    BreadcrumbItem: BreadcrumbItem as React.ComponentType<unknown>,
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Content
    children: {
      control: false,
      description: 'BreadcrumbItem children',
      table: { category: 'Content' },
    },

    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the breadcrumbs',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },

    // Behavior
    maxItems: {
      control: { type: 'number', min: 2, max: 10 },
      description: 'Maximum items before collapsing middle items',
      table: { category: 'Behavior' },
    },

    // Icons
    separator: {
      ...createIconArgType(iconMapSm, 'Separator icon between items'),
      table: { category: 'Icons', defaultValue: { summary: 'ChevronRight' } },
    },
    // @ts-expect-error - custom arg for demo
    homeIcon: {
      ...createIconArgType(iconMapSm, 'Home item icon'),
      table: { category: 'Icons', defaultValue: { summary: 'House' } },
    },
    // @ts-expect-error - custom arg for demo
    variant: {
      control: 'select',
      options: ['both', 'icon', 'text'] as BreadcrumbItemVariant[],
      description:
        'How to display the home icon: text only, icon only, or both',
      table: {
        category: 'BreadcrumbItem Props',
        defaultValue: { summary: 'both' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default breadcrumbs with chevron separator. The last item is automatically marked as current.
 */
export const Default: Story = {
  args: {
    size: 'md' as BreadcrumbsSize,
    separator: <ChevronRight size={16} />,
    // @ts-expect-error - custom args for demo
    homeIcon: <House size={16} />,
    variant: 'both' as BreadcrumbItemVariant,
  },
  render: (args) => {
    // @ts-expect-error - custom args for demo
    const { separator, homeIcon, variant, size, ...rest } = args;
    return (
      <Breadcrumbs separator={separator} size={size} {...rest}>
        <BreadcrumbItem href="#" icon={homeIcon} variant={variant}>
          Home
        </BreadcrumbItem>
        <BreadcrumbItem href="#">Products</BreadcrumbItem>
        <BreadcrumbItem>Category</BreadcrumbItem>
      </Breadcrumbs>
    );
  },
};

// =============================================================================
// HOME DISPLAY OPTIONS
// =============================================================================

/**
 * Home item with both icon and text (default).
 */
export const HomeWithIconAndText: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="#" icon={<House size={16} />} variant="both">
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem>Details</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

/**
 * Home item with icon only - compact navigation style.
 */
export const HomeIconOnly: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="#" icon={<House size={16} />} variant="icon">
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem>Details</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

/**
 * Home item with text only - traditional style.
 */
export const HomeTextOnly: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="#" icon={<House size={16} />} variant="text">
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem>Details</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

/**
 * Comparison of all home display options.
 */
export const HomeDisplayOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Icon and Text (both)
        </p>
        <Breadcrumbs>
          <BreadcrumbItem href="#" icon={<House size={16} />} variant="both">
            Home
          </BreadcrumbItem>
          <BreadcrumbItem href="#">Products</BreadcrumbItem>
          <BreadcrumbItem>Details</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Icon Only
        </p>
        <Breadcrumbs>
          <BreadcrumbItem href="#" icon={<House size={16} />} variant="icon">
            Home
          </BreadcrumbItem>
          <BreadcrumbItem href="#">Products</BreadcrumbItem>
          <BreadcrumbItem>Details</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Text Only
        </p>
        <Breadcrumbs>
          <BreadcrumbItem href="#" icon={<House size={16} />} variant="text">
            Home
          </BreadcrumbItem>
          <BreadcrumbItem href="#">Products</BreadcrumbItem>
          <BreadcrumbItem>Details</BreadcrumbItem>
        </Breadcrumbs>
      </div>
    </div>
  ),
};

// =============================================================================
// CUSTOM SEPARATORS
// =============================================================================

/**
 * Arrow right separator for a different visual style.
 */
export const ArrowSeparator: Story = {
  render: () => (
    <Breadcrumbs separator={<ArrowRight size={16} />}>
      <BreadcrumbItem href="#" icon={<House size={16} />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem>Details</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

/**
 * Minus separator for minimal design.
 */
export const MinusSeparator: Story = {
  render: () => (
    <Breadcrumbs separator={<Minus size={16} />}>
      <BreadcrumbItem href="#" icon={<House size={16} />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem>Details</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

/**
 * Text separator using a slash character.
 */
export const TextSeparator: Story = {
  render: () => (
    <Breadcrumbs separator="/">
      <BreadcrumbItem href="#" icon={<House size={16} />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem>Details</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

/**
 * Comparison of different separator styles.
 */
export const SeparatorOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          ChevronRight (default)
        </p>
        <Breadcrumbs>
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Products</BreadcrumbItem>
          <BreadcrumbItem>Details</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          ArrowRight
        </p>
        <Breadcrumbs separator={<ArrowRight size={16} />}>
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Products</BreadcrumbItem>
          <BreadcrumbItem>Details</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Slash
        </p>
        <Breadcrumbs separator="/">
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Products</BreadcrumbItem>
          <BreadcrumbItem>Details</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Dash
        </p>
        <Breadcrumbs separator={<Minus size={16} />}>
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Products</BreadcrumbItem>
          <BreadcrumbItem>Details</BreadcrumbItem>
        </Breadcrumbs>
      </div>
    </div>
  ),
};

// =============================================================================
// LONG PATHS
// =============================================================================

/**
 * Long navigation path without collapsing.
 */
export const LongPath: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="#" icon={<House size={16} />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Category</BreadcrumbItem>
      <BreadcrumbItem href="#">Subcategory</BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem href="#">Item</BreadcrumbItem>
      <BreadcrumbItem>Details</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

/**
 * Collapsed path showing ellipsis for middle items.
 */
export const CollapsedPath: Story = {
  render: () => (
    <Breadcrumbs maxItems={4}>
      <BreadcrumbItem href="#" icon={<House size={16} />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Category</BreadcrumbItem>
      <BreadcrumbItem href="#">Subcategory</BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem href="#">Item</BreadcrumbItem>
      <BreadcrumbItem>Details</BreadcrumbItem>
    </Breadcrumbs>
  ),
};

// =============================================================================
// SIZES
// =============================================================================

/**
 * Three size options for different contexts.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Small
        </p>
        <Breadcrumbs size="sm">
          <BreadcrumbItem href="#" icon={<House size={14} />}>
            Home
          </BreadcrumbItem>
          <BreadcrumbItem href="#">Products</BreadcrumbItem>
          <BreadcrumbItem>Details</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Medium (default)
        </p>
        <Breadcrumbs size="md">
          <BreadcrumbItem href="#" icon={<House size={16} />}>
            Home
          </BreadcrumbItem>
          <BreadcrumbItem href="#">Products</BreadcrumbItem>
          <BreadcrumbItem>Details</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          Large
        </p>
        <Breadcrumbs size="lg">
          <BreadcrumbItem href="#" icon={<House size={20} />}>
            Home
          </BreadcrumbItem>
          <BreadcrumbItem href="#">Products</BreadcrumbItem>
          <BreadcrumbItem>Details</BreadcrumbItem>
        </Breadcrumbs>
      </div>
    </div>
  ),
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Breadcrumbs adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="#" icon={<House size={16} />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Settings</BreadcrumbItem>
      <BreadcrumbItem>Account</BreadcrumbItem>
    </Breadcrumbs>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

/**
 * Dark theme with icon-only home.
 */
export const DarkThemeIconOnly: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="#" icon={<House size={16} />} variant="icon">
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Settings</BreadcrumbItem>
      <BreadcrumbItem>Account</BreadcrumbItem>
    </Breadcrumbs>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '3rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

// =============================================================================
// BREADCRUMB ITEM PROPS
// =============================================================================

/**
 * BreadcrumbItem component props demonstration.
 *
 * **Props:**
 * - `href`: Link URL (makes item clickable)
 * - `current`: Marks as current page (no link, bold text)
 * - `icon`: Icon to display (ReactNode)
 * - `variant`: How to display icon - `'text'` | `'icon'` | `'both'`
 */
export const BreadcrumbItemProps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          With href (clickable link)
        </p>
        <Breadcrumbs>
          <BreadcrumbItem href="#">Clickable</BreadcrumbItem>
          <BreadcrumbItem>Current</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          With icon prop
        </p>
        <Breadcrumbs>
          <BreadcrumbItem href="#" icon={<House size={16} />}>
            Home
          </BreadcrumbItem>
          <BreadcrumbItem>Current</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          variant="icon" (icon only)
        </p>
        <Breadcrumbs>
          <BreadcrumbItem href="#" icon={<House size={16} />} variant="icon">
            Home
          </BreadcrumbItem>
          <BreadcrumbItem>Current</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          variant="text" (text only, icon ignored)
        </p>
        <Breadcrumbs>
          <BreadcrumbItem href="#" icon={<House size={16} />} variant="text">
            Home
          </BreadcrumbItem>
          <BreadcrumbItem>Current</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div>
        <p
          style={{
            margin: '0 0 0.5rem',
            fontSize: '14px',
            color: 'var(--neo-text-secondary)',
          }}
        >
          current=true (bold, not a link)
        </p>
        <Breadcrumbs>
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem current>Explicitly Current</BreadcrumbItem>
        </Breadcrumbs>
      </div>
    </div>
  ),
};
