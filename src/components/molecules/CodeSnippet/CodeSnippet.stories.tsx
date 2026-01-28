import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeSnippet } from './CodeSnippet';
import { Surface } from '../Surface';

const meta: Meta<typeof CodeSnippet> = {
  title: 'Molecules/CodeSnippet',
  component: CodeSnippet,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showLineNumbers: {
      control: 'boolean',
    },
    showCopyButton: {
      control: 'boolean',
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

export const Default: Story = {
  args: {
    code: sampleJavaScript,
    language: 'javascript',
    title: 'example.js',
  },
};

export const TypeScript: Story = {
  args: {
    code: sampleTypeScript,
    language: 'typescript',
    title: 'api.ts',
  },
};

export const CSS: Story = {
  args: {
    code: sampleCSS,
    language: 'css',
    title: 'styles.css',
  },
};

export const Bash: Story = {
  args: {
    code: sampleBash,
    language: 'bash',
    title: 'terminal',
  },
};

export const WithoutLineNumbers: Story = {
  args: {
    code: sampleJavaScript,
    language: 'javascript',
    showLineNumbers: false,
  },
};

export const WithoutCopyButton: Story = {
  args: {
    code: sampleJavaScript,
    language: 'javascript',
    showCopyButton: false,
  },
};

export const HighlightedLines: Story = {
  args: {
    code: sampleTypeScript,
    language: 'typescript',
    title: 'api.ts',
    highlightLines: [1, 2, 3, 4, 5],
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Small</p>
        <CodeSnippet code={sampleJavaScript} language="javascript" size="sm" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Medium</p>
        <CodeSnippet code={sampleJavaScript} language="javascript" size="md" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Large</p>
        <CodeSnippet code={sampleJavaScript} language="javascript" size="lg" />
      </div>
    </div>
  ),
};

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

export const MinimalStyle: Story = {
  args: {
    code: 'npm install @slash-ui/react',
    showLineNumbers: false,
    showCopyButton: true,
  },
};

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
