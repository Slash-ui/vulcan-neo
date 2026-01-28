<p align="center">
  <img src="https://raw.githubusercontent.com/Slash-ui/vulcan-neo/main/.github/assets/logo.svg" alt="Vulcan Neo" width="200" />
</p>

<h1 align="center">Vulcan Neo</h1>

<p align="center">
  A modern, accessible Neomorphism component library for React
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@slashui/vulcan-neo">
    <img src="https://img.shields.io/npm/v/@slashui/vulcan-neo?color=6C5CE7&label=npm" alt="npm version" />
  </a>
  <a href="https://github.com/Slash-ui/vulcan-neo/actions/workflows/ci.yml">
    <img src="https://github.com/Slash-ui/vulcan-neo/actions/workflows/ci.yml/badge.svg" alt="CI Status" />
  </a>
  <a href="https://codecov.io/gh/Slash-ui/vulcan-neo">
    <img src="https://codecov.io/gh/Slash-ui/vulcan-neo/branch/main/graph/badge.svg" alt="Coverage" />
  </a>
  <a href="https://github.com/Slash-ui/vulcan-neo/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@slashui/vulcan-neo?color=00CEC9" alt="License" />
  </a>
  <a href="https://slash-ui.github.io/vulcan-neo">
    <img src="https://img.shields.io/badge/docs-storybook-FF4785" alt="Storybook" />
  </a>
  <a href="https://bundlephobia.com/package/@slashui/vulcan-neo">
    <img src="https://img.shields.io/bundlephobia/minzip/@slashui/vulcan-neo?color=00B894&label=size" alt="Bundle Size" />
  </a>
</p>

<p align="center">
  <a href="https://slash-ui.github.io/vulcan-neo">Documentation</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#components">Components</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## What is Vulcan Neo?

Vulcan Neo is a **Neomorphism (Soft UI) design system** for React applications. It provides beautiful, accessible components with the signature soft shadow effects that make neomorphic design distinctive.

### Key Features

- **70+ Components** - From buttons to charts, everything you need
- **Accessible** - WCAG AA compliant with 4.5:1+ contrast ratios
- **Dark Mode** - Full light and dark theme support
- **TypeScript** - Complete type definitions included
- **Tree-Shakable** - Import only what you need
- **Zero Dependencies** - Only peer depends on React

---

## Quick Start

### For Developers

#### Prerequisites

- Node.js 24+
- npm, yarn, or pnpm
- React 19+

#### Installation

```bash
# npm
npm install @slashui/vulcan-neo

# yarn
yarn add @slashui/vulcan-neo

# pnpm
pnpm add @slashui/vulcan-neo
```

#### Basic Usage

```tsx
import { Surface, Button, Card } from '@slashui/vulcan-neo';
import '@slashui/vulcan-neo/styles';

function App() {
  return (
    <Surface theme="light">
      <Card>
        <h2>Welcome to Vulcan Neo</h2>
        <Button variant="convex">Get Started</Button>
      </Card>
    </Surface>
  );
}
```

### For Non-Technical Users

If you're new to development, follow these steps:

#### Step 1: Install Node.js

1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS** version (recommended)
3. Run the installer and follow the prompts
4. Restart your computer

#### Step 2: Create a New Project

Open **Terminal** (Mac) or **Command Prompt** (Windows) and run:

```bash
# Create a new React project
npx create-react-app my-app
cd my-app

# Install Vulcan Neo
npm install @slashui/vulcan-neo
```

#### Step 3: Start Building

Open the project in your code editor (we recommend [VS Code](https://code.visualstudio.com)) and edit `src/App.js`:

```jsx
import { Surface, Button } from '@slashui/vulcan-neo';
import '@slashui/vulcan-neo/styles';

function App() {
  return (
    <Surface theme="light" style={{ padding: '20px', minHeight: '100vh' }}>
      <h1>My First Neomorphic App</h1>
      <Button variant="convex">Click Me!</Button>
    </Surface>
  );
}

export default App;
```

Run `npm start` to see your app!

---

## Components

### Atoms (Basic Building Blocks)

| Component     | Description                               |
| ------------- | ----------------------------------------- |
| `Surface`     | Theme provider and background container   |
| `Button`      | Convex, concave, and flat button variants |
| `InsetField`  | Text input with inset neomorphic styling  |
| `Switch`      | Toggle switch control                     |
| `Checkbox`    | Checkbox input                            |
| `Radio`       | Radio button input                        |
| `Badge`       | Status indicator                          |
| `Avatar`      | User avatar with status                   |
| `IconButton`  | Icon-only button                          |
| `Slider`      | Range slider                              |
| `ProgressBar` | Progress indicator                        |

### Molecules (Composed Components)

| Component  | Description                               |
| ---------- | ----------------------------------------- |
| `Card`     | Content container with header/body/footer |
| `Select`   | Dropdown select input                     |
| `Dropdown` | Generic dropdown menu                     |
| `Tabs`     | Tabbed navigation                         |
| `Modal`    | Dialog/modal overlay                      |
| `Tooltip`  | Hover tooltips                            |
| `Alert`    | Alert messages                            |
| `Table`    | Data tables                               |

### Organisms (Complex Components)

| Component           | Description                |
| ------------------- | -------------------------- |
| `HeaderNavigation`  | App header with navigation |
| `SidebarNavigation` | Sidebar menu               |
| `Pagination`        | Page navigation            |
| `Calendar`          | Date calendar              |
| `DatePicker`        | Date input with calendar   |
| `FileUploader`      | File upload interface      |
| `CommandMenu`       | Command palette (⌘K)       |

### Marketing Sections

| Component            | Description           |
| -------------------- | --------------------- |
| `HeroSection`        | Hero/landing section  |
| `FeaturesSection`    | Feature highlights    |
| `PricingSection`     | Pricing tables        |
| `TestimonialSection` | Customer testimonials |
| `CTASection`         | Call-to-action        |
| `FAQSection`         | FAQ accordion         |
| `Footer`             | Site footer           |

### Charts

| Component   | Description      |
| ----------- | ---------------- |
| `LineChart` | Line/area charts |
| `BarChart`  | Bar charts       |
| `PieChart`  | Pie/donut charts |

### Templates

| Component   | Description     |
| ----------- | --------------- |
| `ErrorPage` | 404/error pages |

[View all components in Storybook →](https://slash-ui.github.io/vulcan-neo)

---

## Design Standards

### Neomorphism Principles

Vulcan Neo follows these core neomorphism design principles:

#### 1. Light Source (135°)

All shadows are cast as if light comes from the **top-left** at 135°:

- Light shadow: top-left
- Dark shadow: bottom-right

#### 2. Soft Backgrounds

Never use pure white or black. Our default backgrounds:

- Light theme: `#E0E5EC`
- Dark theme: `#292D32`

#### 3. Elevation States

Three elevation levels for depth:

- **Low**: Subtle, for backgrounds
- **Mid**: Default for interactive elements
- **High**: Prominent, for focused states

### Typography Standards

We use accessible typography optimized for soft UI backgrounds:

| Scale    | Size    | Weight         | Use             |
| -------- | ------- | -------------- | --------------- |
| Display  | 39-76px | Bold (700)     | Hero headlines  |
| Headline | 20-31px | Semibold (600) | Section headers |
| Title    | 14-20px | Medium (500)   | Titles          |
| Body     | 14-18px | Regular (400)  | Content         |
| Label    | 11-14px | Medium (500)   | UI labels       |

**Font Stack:**

- Display: Poppins
- Body: Inter
- Code: JetBrains Mono

### Accessibility

All components meet **WCAG AA** standards:

- Text contrast: 4.5:1 minimum (8.2:1 for primary text)
- Focus indicators on all interactive elements
- Keyboard navigation support
- Screen reader compatible
- Reduced motion support

### Color System

| Role      | Light     | Dark      | Use             |
| --------- | --------- | --------- | --------------- |
| Primary   | `#6C5CE7` | `#6C5CE7` | Actions, links  |
| Secondary | `#00CEC9` | `#00CEC9` | Accents         |
| Success   | `#00B894` | `#00B894` | Positive states |
| Warning   | `#FDCB6E` | `#FDCB6E` | Warnings        |
| Error     | `#E17055` | `#E17055` | Errors          |

---

## Theming

### Using Themes

Wrap your app with `Surface` to apply a theme:

```tsx
import { Surface } from '@slashui/vulcan-neo';

// Light theme (default)
<Surface theme="light">
  <App />
</Surface>

// Dark theme
<Surface theme="dark">
  <App />
</Surface>
```

### CSS Variables

All design tokens are available as CSS variables:

```css
/* Colors */
--neo-color-primary: #6c5ce7;
--neo-color-secondary: #00cec9;
--neo-bg: #e0e5ec;
--neo-text: #2d3436;

/* Shadows */
--neo-shadow-light: rgba(255, 255, 255, 0.8);
--neo-shadow-dark: rgba(163, 177, 198, 0.6);

/* Typography */
--neo-font-family: 'Inter', sans-serif;
--neo-font-body-md: 16px;

/* Spacing */
--neo-space-md: 16px;
--neo-radius-md: 20px;

/* Motion */
--neo-transition-normal: 200ms cubic-bezier(0.2, 0, 0, 1);
```

### Custom Theming

Override CSS variables to customize:

```css
:root {
  --neo-color-primary: #your-brand-color;
  --neo-bg-light: #your-light-bg;
}
```

---

## Development Setup

### Clone and Install

```bash
git clone https://github.com/Slash-ui/vulcan-neo.git
cd vulcan-neo
yarn install
```

### Available Scripts

| Command                | Description                    |
| ---------------------- | ------------------------------ |
| `yarn dev`             | Start development server       |
| `yarn build`           | Build the library              |
| `yarn test`            | Run tests                      |
| `yarn test:coverage`   | Run tests with coverage        |
| `yarn storybook`       | Start Storybook dev server     |
| `yarn build-storybook` | Build Storybook for deployment |
| `yarn lint`            | Run ESLint                     |
| `yarn format`          | Format code with Prettier      |

### Project Structure

```
vulcan-neo/
├── src/
│   ├── components/       # All components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   └── ...
│   ├── stories/          # Storybook documentation
│   │   └── foundation/  # Design system docs
│   ├── styles/
│   │   └── tokens.css    # Design tokens
│   └── index.ts          # Main exports
├── .github/
│   └── workflows/        # CI/CD pipelines
├── .storybook/           # Storybook config
└── dist/                 # Build output
```

---

## Contributing

We welcome contributions! Here's how to get started:

### Quick Contribution Guide

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR-USERNAME/vulcan-neo.git`
3. **Create a branch**: `git checkout -b feature/amazing-feature`
4. **Make changes** and commit: `git commit -m 'Add amazing feature'`
5. **Push**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Reporting Issues

Found a bug? Have a feature request?

[Open an issue →](https://github.com/Slash-ui/vulcan-neo/issues)

Please include:

- Clear description of the issue
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, React version)

### Development Guidelines

- Follow the existing code style
- Write tests for new components
- Update Storybook stories
- Ensure accessibility compliance
- Keep bundle size minimal

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

---

## Browser Support

| Browser | Version         |
| ------- | --------------- |
| Chrome  | Last 2 versions |
| Firefox | Last 2 versions |
| Safari  | Last 2 versions |
| Edge    | Last 2 versions |

---

## FAQ

<details>
<summary><strong>Can I use this with Next.js?</strong></summary>

Yes! Vulcan Neo works with Next.js. For App Router, use `'use client'` directive:

```tsx
'use client';
import { Surface, Button } from '@slashui/vulcan-neo';
```

</details>

<details>
<summary><strong>How do I customize colors?</strong></summary>

Override CSS variables in your global styles:

```css
:root {
  --neo-color-primary: #your-color;
}
```

</details>

<details>
<summary><strong>Is it accessible?</strong></summary>

Yes! All components meet WCAG AA standards with 4.5:1+ contrast ratios, keyboard navigation, and screen reader support.

</details>

<details>
<summary><strong>What's the bundle size?</strong></summary>

The full library is ~80KB gzipped. With tree-shaking, you only pay for what you import.

</details>

---

## Links

- [Documentation (Storybook)](https://slash-ui.github.io/vulcan-neo)
- [npm Package](https://www.npmjs.com/package/@slashui/vulcan-neo)
- [GitHub Repository](https://github.com/Slash-ui/vulcan-neo)
- [Issue Tracker](https://github.com/Slash-ui/vulcan-neo/issues)
- [Changelog](./CHANGELOG.md)

---

## License

MIT © [Slash UI](https://github.com/Slash-ui)

---

<p align="center">
  Made with ❤️ by the Slash UI team
</p>

<p align="center">
  <a href="https://github.com/Slash-ui/vulcan-neo/stargazers">⭐ Star us on GitHub</a>
</p>
