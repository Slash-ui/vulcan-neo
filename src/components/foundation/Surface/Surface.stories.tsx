import type { Meta, StoryObj } from '@storybook/react-vite';
import { Surface } from './Surface';

/**
 * The foundational container that establishes the neomorphic context.
 * Surface defines the background color, theme, and CSS variables needed
 * for all neomorphic shadow calculations.
 *
 * ## When to Use
 *
 * - **App wrapper**: Wrap your entire application or page sections
 * - **Theme switching**: Toggle between light and dark neomorphic themes
 * - **Custom backgrounds**: Apply custom background colors while maintaining shadows
 * - **Layout containers**: Create distinct themed sections within a page
 *
 * ## Key Features
 *
 * - **Theme support**: Built-in light and dark neomorphic themes
 * - **Custom colors**: Override background while maintaining shadow calculations
 * - **Full height**: Expand to fill the viewport height
 * - **CSS variables**: Provides all necessary variables for child components
 *
 * ## Best Practices
 *
 * - Always wrap neomorphic components in a Surface
 * - Use one Surface per themed section
 * - Custom colors work best with neutral, muted tones
 */
const meta: Meta<typeof Surface> = {
  title: 'Foundation/Surface',
  component: Surface,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    // Content
    children: {
      control: false,
      description: 'Content to render inside the surface',
      table: { category: 'Content' },
    },

    // Appearance
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'The color theme of the surface',
      table: { category: 'Appearance', defaultValue: { summary: 'light' } },
    },
    backgroundColor: {
      control: 'color',
      description: 'Custom background color (overrides theme)',
      table: { category: 'Appearance' },
    },
    fullHeight: {
      control: 'boolean',
      description: 'Expand to fill viewport height',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default light surface. Use controls to explore all options.
 */
export const Default: Story = {
  args: {
    theme: 'light',
    children: (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2 style={{ margin: '0 0 1rem' }}>Light Surface</h2>
        <p style={{ margin: 0, color: 'var(--neo-text-secondary)' }}>
          The foundational container for neomorphic components
        </p>
      </div>
    ),
  },
};

// =============================================================================
// THEMES
// =============================================================================

/**
 * The two built-in themes: light and dark.
 */
export const Themes: Story = {
  render: () => (
    <div style={{ display: 'flex' }}>
      <Surface theme="light" style={{ flex: 1, padding: '3rem', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 0.5rem' }}>Light Theme</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>Default neomorphic appearance</p>
      </Surface>
      <Surface theme="dark" style={{ flex: 1, padding: '3rem', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 0.5rem' }}>Dark Theme</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>Dark mode appearance</p>
      </Surface>
    </div>
  ),
};

/**
 * Light theme surface.
 */
export const ThemeLight: Story = {
  tags: ['!dev'],
  args: {
    theme: 'light',
    children: (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h3 style={{ margin: '0 0 0.5rem' }}>Light Surface</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>Default theme</p>
      </div>
    ),
  },
};

/**
 * Dark theme surface.
 */
export const ThemeDark: Story = {
  tags: ['!dev'],
  args: {
    theme: 'dark',
    children: (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h3 style={{ margin: '0 0 0.5rem' }}>Dark Surface</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>Dark mode</p>
      </div>
    ),
  },
};

// =============================================================================
// CUSTOM BACKGROUND
// =============================================================================

/**
 * Apply custom background colors while maintaining shadow calculations.
 */
export const CustomBackgrounds: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Surface backgroundColor="#D4E4ED" style={{ padding: '3rem', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 0.5rem' }}>Cool Blue</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>#D4E4ED</p>
      </Surface>
      <Surface backgroundColor="#E8DFD4" style={{ padding: '3rem', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 0.5rem' }}>Warm Beige</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>#E8DFD4</p>
      </Surface>
      <Surface backgroundColor="#DCE4D8" style={{ padding: '3rem', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 0.5rem' }}>Soft Green</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>#DCE4D8</p>
      </Surface>
    </div>
  ),
};

/**
 * Custom background color.
 */
export const CustomBackground: Story = {
  tags: ['!dev'],
  args: {
    backgroundColor: '#D4E4ED',
    children: (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h3 style={{ margin: '0 0 0.5rem' }}>Custom Background</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>Surface with custom color</p>
      </div>
    ),
  },
};

// =============================================================================
// FULL HEIGHT
// =============================================================================

/**
 * Expand the surface to fill the entire viewport height.
 */
export const FullHeight: Story = {
  args: {
    theme: 'light',
    fullHeight: true,
    children: (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center'
      }}>
        <div>
          <h2 style={{ margin: '0 0 1rem' }}>Full Height Surface</h2>
          <p style={{ margin: 0, color: 'var(--neo-text-secondary)' }}>
            Takes up the full viewport height
          </p>
        </div>
      </div>
    ),
  },
};
