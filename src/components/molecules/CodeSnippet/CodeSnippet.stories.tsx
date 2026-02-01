import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeSnippet } from './CodeSnippet';
import { Surface } from '../../foundation/Surface';
import { Typography } from '../../foundation/Typography';

/**
 * A code display component with syntax highlighting hints, line numbers, and copy functionality.
 * Designed for documentation, tutorials, and developer-facing interfaces.
 *
 * ## When to Use
 *
 * - **Documentation**: Display code examples in guides and tutorials
 * - **API references**: Show request/response examples
 * - **Changelogs**: Highlight code changes
 * - **Avoid for**: Editable code (use a code editor), very short inline code (use `<code>`)
 *
 * ## Key Features
 *
 * - **Copy to clipboard**: One-click copying with visual feedback
 * - **Line numbers**: Optional line numbering for reference
 * - **Line highlighting**: Emphasize specific lines of code
 * - **Multiple sizes**: Adjust font size for different contexts
 * - **Language hint**: Display language badge in header
 *
 * ## Best Practices
 *
 * - Include a title/filename when showing file-based code
 * - Use line highlighting to draw attention to key lines
 * - Set maxHeight for long code blocks to prevent page overflow
 * - Keep line numbers enabled for code that may be discussed by line
 */
const meta: Meta<typeof CodeSnippet> = {
  title: 'Molecules/CodeSnippet',
  component: CodeSnippet,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    // Content
    code: {
      control: 'text',
      description: 'The code string to display',
      table: { category: 'Content' },
    },
    language: {
      control: 'text',
      description: 'Language hint displayed in the header (e.g., "javascript", "typescript")',
      table: { category: 'Content' },
    },
    title: {
      control: 'text',
      description: 'Filename or title shown in the header',
      table: { category: 'Content' },
    },

    // Appearance
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Font size. Use **sm** for dense layouts, **lg** for presentations.',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    showLineNumbers: {
      control: 'boolean',
      description: 'Display line numbers. Enable for code that may be referenced by line.',
      table: { category: 'Appearance', defaultValue: { summary: 'true' } },
    },
    highlightLines: {
      control: 'object',
      description: 'Array of line numbers (1-indexed) to highlight',
      table: { category: 'Appearance', defaultValue: { summary: '[]' } },
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height before scrolling (e.g., "200px", 300)',
      table: { category: 'Appearance' },
    },

    // Behavior
    showCopyButton: {
      control: 'boolean',
      description: 'Show the copy-to-clipboard button',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    onCopy: {
      action: 'copied',
      description: 'Callback when code is copied to clipboard',
      table: { category: 'Behavior' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleJavaScript = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return name;
}

const user = "World";
greet(user);`;

const sampleTypeScript = `interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}

export { fetchUser, User };`;

const sampleCSS = `.button {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #e0e5ec;
  border: none;
  border-radius: 8px;
  box-shadow:
    -4px -4px 8px #ffffff,
    4px 4px 8px #a3b1c6;
}`;

const sampleBash = `# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build`;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Default code snippet with title, language hint, and copy button.
 * Use controls to explore different configurations.
 */
export const Default: Story = {
  args: {
    code: sampleJavaScript,
    language: 'javascript',
    title: 'example.js',
  },
};

// =============================================================================
// LANGUAGES
// =============================================================================

/**
 * Different programming languages with appropriate titles and hints.
 */
export const Languages: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <CodeSnippet code={sampleJavaScript} language="javascript" title="example.js" />
      <CodeSnippet code={sampleTypeScript} language="typescript" title="api.ts" />
      <CodeSnippet code={sampleCSS} language="css" title="styles.css" />
      <CodeSnippet code={sampleBash} language="bash" title="terminal" />
    </div>
  ),
};

/**
 * TypeScript code example.
 */
export const TypeScript: Story = {
  tags: ['!dev'],
  args: {
    code: sampleTypeScript,
    language: 'typescript',
    title: 'api.ts',
  },
};

/**
 * CSS code example.
 */
export const CSS: Story = {
  tags: ['!dev'],
  args: {
    code: sampleCSS,
    language: 'css',
    title: 'styles.css',
  },
};

/**
 * Bash/terminal commands.
 */
export const Bash: Story = {
  tags: ['!dev'],
  args: {
    code: sampleBash,
    language: 'bash',
    title: 'terminal',
  },
};

// =============================================================================
// SIZES
// =============================================================================

/**
 * Compare all size variants. Use **sm** for dense UIs, **lg** for presentations.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <Typography variant="body2" color="secondary" gutterBottom>
          Small
        </Typography>
        <CodeSnippet code={sampleJavaScript} language="javascript" size="sm" />
      </div>
      <div>
        <Typography variant="body2" color="secondary" gutterBottom>
          Medium (default)
        </Typography>
        <CodeSnippet code={sampleJavaScript} language="javascript" size="md" />
      </div>
      <div>
        <Typography variant="body2" color="secondary" gutterBottom>
          Large
        </Typography>
        <CodeSnippet code={sampleJavaScript} language="javascript" size="lg" />
      </div>
    </div>
  ),
};

// =============================================================================
// FEATURES
// =============================================================================

/**
 * Code snippet without line numbers for cleaner appearance.
 */
export const WithoutLineNumbers: Story = {
  args: {
    code: sampleJavaScript,
    language: 'javascript',
    showLineNumbers: false,
  },
};

/**
 * Code snippet without the copy button.
 */
export const WithoutCopyButton: Story = {
  args: {
    code: sampleJavaScript,
    language: 'javascript',
    showCopyButton: false,
  },
};

/**
 * Highlight specific lines to draw attention to important code.
 * Lines 1-5 (the interface definition) are highlighted.
 */
export const HighlightedLines: Story = {
  args: {
    code: sampleTypeScript,
    language: 'typescript',
    title: 'api.ts',
    highlightLines: [1, 2, 3, 4, 5],
  },
};

/**
 * Use maxHeight for long code blocks to prevent page overflow.
 */
export const WithMaxHeight: Story = {
  render: () => {
    const longCode = Array(20)
      .fill(null)
      .map((_, i) => `console.log("Line ${i + 1}");`)
      .join('\n');

    return (
      <CodeSnippet
        code={longCode}
        language="javascript"
        title="long-file.js"
        maxHeight={200}
      />
    );
  },
};

/**
 * Minimal style for installation commands or short snippets.
 */
export const MinimalStyle: Story = {
  args: {
    code: 'npm install @vulcan/react',
    showLineNumbers: false,
    showCopyButton: true,
  },
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Code snippets adapt to dark theme automatically.
 */
export const DarkTheme: Story = {
  args: {
    code: sampleTypeScript,
    language: 'typescript',
    title: 'api.ts',
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
