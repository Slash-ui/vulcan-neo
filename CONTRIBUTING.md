# Contributing to Vulcan Neo

Thank you for your interest in contributing to Vulcan Neo! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Component Guidelines](#component-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. Please:

- Be respectful and considerate
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Accept responsibility for mistakes and learn from them

---

## Getting Started

### Prerequisites

- **Node.js** 24 or higher
- **Yarn** (recommended) or npm
- **Git**

### Setup

1. **Fork the repository**

   Click the "Fork" button at the top right of [the repository page](https://github.com/Slash-ui/vulcan-neo).

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR-USERNAME/vulcan-neo.git
   cd vulcan-neo
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/Slash-ui/vulcan-neo.git
   ```

4. **Install dependencies**

   ```bash
   yarn install
   ```

5. **Start development**

   ```bash
   # Start Storybook for component development
   yarn storybook

   # Or run tests in watch mode
   yarn test
   ```

---

## Development Workflow

### Branch Naming

Use descriptive branch names:

- `feature/component-name` - New components
- `fix/issue-description` - Bug fixes
- `docs/update-readme` - Documentation updates
- `refactor/component-name` - Code refactoring

### Running Commands

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `yarn dev`           | Start Vite development server            |
| `yarn storybook`     | Start Storybook at http://localhost:6006 |
| `yarn build`         | Build the library                        |
| `yarn test`          | Run tests once                           |
| `yarn test:watch`    | Run tests in watch mode                  |
| `yarn test:coverage` | Run tests with coverage report           |
| `yarn lint`          | Check for linting errors                 |
| `yarn format`        | Format code with Prettier                |

### Testing Your Changes

Before submitting a PR:

```bash
# Run all checks
yarn lint
yarn test
yarn build
```

---

## Component Guidelines

### File Structure

Each component should have its own folder:

```
src/components/ComponentName/
├── ComponentName.tsx         # Main component
├── ComponentName.module.css  # Styles (CSS Modules)
├── ComponentName.stories.tsx # Storybook stories
├── ComponentName.test.tsx    # Tests (optional)
└── index.ts                  # Re-exports
```

### Component Template

```tsx
import React, { forwardRef } from 'react';
import styles from './ComponentName.module.css';

export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Description of the prop
   * @default 'defaultValue'
   */
  variant?: 'convex' | 'concave' | 'flat';
  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * ComponentName - Brief description of the component
 */
export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ variant = 'convex', size = 'md', className, children, ...props }, ref) => {
    const classNames = [
      styles.componentName,
      styles[variant],
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

### CSS Guidelines

Follow the neomorphic design principles:

```css
/* ComponentName.module.css */

.componentName {
  background: var(--neo-bg);
  border-radius: var(--neo-radius-md);
  font-family: var(--neo-font-family);
  transition: all var(--neo-transition-normal);
}

/* Convex (raised) variant */
.convex {
  box-shadow:
    calc(-1 * var(--neo-elevation-mid)) calc(-1 * var(--neo-elevation-mid))
      calc(var(--neo-elevation-mid) * 2) var(--neo-shadow-light),
    var(--neo-elevation-mid) var(--neo-elevation-mid)
      calc(var(--neo-elevation-mid) * 2) var(--neo-shadow-dark);
}

/* Concave (pressed) variant */
.concave {
  box-shadow:
    inset var(--neo-elevation-mid) var(--neo-elevation-mid)
      calc(var(--neo-elevation-mid) * 2) var(--neo-shadow-dark),
    inset calc(-1 * var(--neo-elevation-mid))
      calc(-1 * var(--neo-elevation-mid)) calc(var(--neo-elevation-mid) * 2)
      var(--neo-shadow-light);
}

/* Size variants */
.sm {
  padding: var(--neo-space-sm);
}
.md {
  padding: var(--neo-space-md);
}
.lg {
  padding: var(--neo-space-lg);
}
```

### Storybook Stories

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentName } from './ComponentName';
import { Surface } from '../Surface';

const meta: Meta<typeof ComponentName> = {
  title: 'Category/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['convex', 'concave', 'flat'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Component content',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <ComponentName variant="convex">Convex</ComponentName>
      <ComponentName variant="concave">Concave</ComponentName>
      <ComponentName variant="flat">Flat</ComponentName>
    </div>
  ),
};
```

### Accessibility Requirements

All components must:

- [ ] Have proper ARIA attributes
- [ ] Support keyboard navigation
- [ ] Meet WCAG AA contrast requirements (4.5:1)
- [ ] Include focus indicators
- [ ] Work with screen readers

### Export Components

Add your component to `src/components/index.ts`:

```ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

---

## Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types

| Type       | Description                     |
| ---------- | ------------------------------- |
| `feat`     | New feature                     |
| `fix`      | Bug fix                         |
| `docs`     | Documentation changes           |
| `style`    | Code style changes (formatting) |
| `refactor` | Code refactoring                |
| `test`     | Adding or updating tests        |
| `chore`    | Maintenance tasks               |

### Examples

```bash
feat(Button): add loading state

fix(Modal): prevent body scroll when open

docs(README): update installation instructions

chore(deps): update storybook to v10
```

---

## Pull Request Process

### Before Submitting

1. **Sync with upstream**

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all checks**

   ```bash
   yarn lint
   yarn test
   yarn build
   ```

3. **Update documentation** if needed

### PR Title Format

Use the same format as commits:

```
feat(ComponentName): add new feature
```

### PR Description Template

```markdown
## Summary

Brief description of changes.

## Changes

- Change 1
- Change 2

## Screenshots

(If applicable)

## Checklist

- [ ] Tests pass
- [ ] Linting passes
- [ ] Build succeeds
- [ ] Storybook stories added/updated
- [ ] Documentation updated
- [ ] Accessibility verified
```

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged

---

## Reporting Issues

### Bug Reports

[Open a bug report →](https://github.com/Slash-ui/vulcan-neo/issues/new?template=bug_report.md)

Include:

- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots (if applicable)

### Feature Requests

[Open a feature request →](https://github.com/Slash-ui/vulcan-neo/issues/new?template=feature_request.md)

Include:

- Problem statement
- Proposed solution
- Alternatives considered
- Additional context

---

## Questions?

- Open a [Discussion](https://github.com/Slash-ui/vulcan-neo/discussions)
- Check existing [Issues](https://github.com/Slash-ui/vulcan-neo/issues)

Thank you for contributing!
