import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState, useEffect } from 'react';
import { Surface } from '../../components/foundation/Surface';
import { Button } from '../../components/atoms/Button';

/**
 * Motion in Vulcan Neo creates a sense of physicality and depth.
 * Animations reinforce the neomorphic aesthetic by simulating light
 * and shadow changes that occur when objects move in 3D space.
 *
 * ## When to Use
 *
 * - **Duration Tokens**: Control animation timing (50ms to 500ms)
 * - **Easing Curves**: Define acceleration patterns for natural motion
 * - **Transition Presets**: Pre-composed timing + easing combinations
 *
 * ## Key Features
 *
 * - **CSS Custom Properties**: All tokens available as variables
 * - **Consistent Timing**: Standardized durations across the system
 * - **Natural Motion**: Easing curves that feel physical and organic
 * - **Semantic Presets**: Enter, exit, spring, and bounce transitions
 *
 * ## Best Practices
 *
 * - Use fast (100-200ms) for hover states and small changes
 * - Use normal (200-300ms) for most UI interactions
 * - Use emphasized decelerate for elements entering view
 * - Use emphasized accelerate for elements leaving view
 */

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

const EasingDemo: React.FC<{
  name: string;
  variable: string;
  description: string;
}> = ({ name, variable, description }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setAnimate((prev) => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        padding: '20px',
        background: 'var(--neo-bg)',
        borderRadius: 'var(--neo-radius-sm)',
        boxShadow: '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
      }}
    >
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--neo-text)' }}>{name}</div>
        <div style={{ fontFamily: 'var(--neo-font-family-mono)', fontSize: '11px', color: 'var(--neo-text-secondary)' }}>
          {variable}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--neo-text-secondary)' }}>{description}</div>
      </div>
      <div
        style={{
          height: '8px',
          background: 'var(--neo-color-surface-container)',
          borderRadius: '4px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: animate ? 'calc(100% - 24px)' : '0',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'var(--neo-color-primary)',
            boxShadow: '-2px -2px 4px var(--neo-shadow-light), 2px 2px 4px var(--neo-shadow-dark)',
            transition: `left 1s var(${variable})`,
          }}
        />
      </div>
    </div>
  );
};

const DurationDemo: React.FC<{
  name: string;
  variable: string;
  ms: string;
  description: string;
}> = ({ name, variable, ms, description }) => {
  const [animate, setAnimate] = useState(false);

  return (
    <div
      style={{
        padding: '20px',
        background: 'var(--neo-bg)',
        borderRadius: 'var(--neo-radius-sm)',
        boxShadow: '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--neo-text)' }}>{name}</div>
          <div style={{ fontFamily: 'var(--neo-font-family-mono)', fontSize: '11px', color: 'var(--neo-text-secondary)' }}>
            {variable} = {ms}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--neo-text-secondary)' }}>{description}</div>
        </div>
        <button
          onClick={() => setAnimate(!animate)}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--neo-radius-sm)',
            border: 'none',
            background: 'var(--neo-bg)',
            color: 'var(--neo-text)',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            boxShadow: '-2px -2px 4px var(--neo-shadow-light), 2px 2px 4px var(--neo-shadow-dark)',
          }}
        >
          Trigger
        </button>
      </div>
      <div style={{ height: '48px', display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: animate ? '100%' : '48px',
            height: '48px',
            borderRadius: 'var(--neo-radius-sm)',
            background: 'var(--neo-color-primary)',
            boxShadow: '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
            transition: `width var(${variable}) var(--neo-easing-standard)`,
          }}
        />
      </div>
    </div>
  );
};

const TransitionCard: React.FC<{
  name: string;
  variable: string;
  use: string;
}> = ({ name, variable, use }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '20px',
        background: 'var(--neo-bg)',
        borderRadius: 'var(--neo-radius-sm)',
        boxShadow: hover
          ? '-8px -8px 16px var(--neo-shadow-light), 8px 8px 16px var(--neo-shadow-dark)'
          : '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        transition: `all var(${variable})`,
        cursor: 'pointer',
      }}
    >
      <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--neo-text)', marginBottom: '4px' }}>{name}</div>
      <div style={{ fontFamily: 'var(--neo-font-family-mono)', fontSize: '11px', color: 'var(--neo-text-secondary)', marginBottom: '8px' }}>
        {variable}
      </div>
      <div style={{ fontSize: '12px', color: 'var(--neo-text-secondary)' }}>{use}</div>
    </div>
  );
};

// =============================================================================
// META
// =============================================================================

const meta: Meta = {
  title: 'Foundation/Motion',
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
};

export default meta;
type Story = StoryObj;

// =============================================================================
// DEFAULT EXAMPLE
// =============================================================================

/**
 * Common transition presets overview.
 */
export const Default: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      <TransitionCard name="Fast" variable="--neo-transition-fast" use="Hover states" />
      <TransitionCard name="Normal" variable="--neo-transition-normal" use="UI transitions" />
      <TransitionCard name="Slow" variable="--neo-transition-slow" use="Large changes" />
    </div>
  ),
};

// =============================================================================
// DURATION TOKENS
// =============================================================================

/**
 * Duration tokens control how long animations take.
 */
export const DurationTokens: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <DurationDemo name="Instant" variable="--neo-duration-instant" ms="50ms" description="Immediate feedback" />
      <DurationDemo name="Fast" variable="--neo-duration-fast" ms="100ms" description="Quick micro-interactions" />
      <DurationDemo name="Normal" variable="--neo-duration-normal" ms="200ms" description="Standard transitions" />
      <DurationDemo name="Slow" variable="--neo-duration-slow" ms="300ms" description="Larger state changes" />
      <DurationDemo name="Slower" variable="--neo-duration-slower" ms="400ms" description="Complex animations" />
      <DurationDemo name="Slowest" variable="--neo-duration-slowest" ms="500ms" description="Dramatic reveals" />
    </div>
  ),
};

/**
 * Instant duration (50ms).
 */
export const DurationInstant: Story = {
  tags: ['!dev'],
  render: () => <DurationDemo name="Instant" variable="--neo-duration-instant" ms="50ms" description="Immediate feedback" />,
};

/**
 * Fast duration (100ms).
 */
export const DurationFast: Story = {
  tags: ['!dev'],
  render: () => <DurationDemo name="Fast" variable="--neo-duration-fast" ms="100ms" description="Quick micro-interactions" />,
};

/**
 * Normal duration (200ms).
 */
export const DurationNormal: Story = {
  tags: ['!dev'],
  render: () => <DurationDemo name="Normal" variable="--neo-duration-normal" ms="200ms" description="Standard transitions" />,
};

/**
 * Slow duration (300ms).
 */
export const DurationSlow: Story = {
  tags: ['!dev'],
  render: () => <DurationDemo name="Slow" variable="--neo-duration-slow" ms="300ms" description="Larger state changes" />,
};

// =============================================================================
// EASING CURVES
// =============================================================================

/**
 * Easing curves define the rate of change during animations.
 */
export const EasingCurves: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <EasingDemo name="Standard" variable="--neo-easing-standard" description="Default easing, starts quickly and decelerates" />
      <EasingDemo name="Standard Decelerate" variable="--neo-easing-standard-decelerate" description="Elements entering, full speed then slows" />
      <EasingDemo name="Standard Accelerate" variable="--neo-easing-standard-accelerate" description="Elements leaving, starts slow then speeds up" />
      <EasingDemo name="Emphasized" variable="--neo-easing-emphasized" description="Attention-drawing, pronounced deceleration" />
      <EasingDemo name="Emphasized Decelerate" variable="--neo-easing-emphasized-decelerate" description="Dramatic entries, strong end deceleration" />
      <EasingDemo name="Emphasized Accelerate" variable="--neo-easing-emphasized-accelerate" description="Dramatic exits, strong start acceleration" />
    </div>
  ),
};

/**
 * Standard easing curve.
 */
export const EasingStandard: Story = {
  tags: ['!dev'],
  render: () => <EasingDemo name="Standard" variable="--neo-easing-standard" description="Default easing for most transitions" />,
};

/**
 * Standard decelerate easing.
 */
export const EasingStandardDecelerate: Story = {
  tags: ['!dev'],
  render: () => <EasingDemo name="Standard Decelerate" variable="--neo-easing-standard-decelerate" description="For elements entering the screen" />,
};

/**
 * Emphasized easing curve.
 */
export const EasingEmphasized: Story = {
  tags: ['!dev'],
  render: () => <EasingDemo name="Emphasized" variable="--neo-easing-emphasized" description="For attention-drawing animations" />,
};

// =============================================================================
// TRANSITION PRESETS
// =============================================================================

/**
 * Pre-composed transitions combining duration and easing.
 */
export const TransitionPresets: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      <TransitionCard name="Instant" variable="--neo-transition-instant" use="Micro-interactions" />
      <TransitionCard name="Fast" variable="--neo-transition-fast" use="Hover states" />
      <TransitionCard name="Normal" variable="--neo-transition-normal" use="UI transitions" />
      <TransitionCard name="Slow" variable="--neo-transition-slow" use="Large changes" />
      <TransitionCard name="Slower" variable="--neo-transition-slower" use="Page transitions" />
      <TransitionCard name="Enter" variable="--neo-transition-enter" use="Elements entering" />
      <TransitionCard name="Exit" variable="--neo-transition-exit" use="Elements leaving" />
      <TransitionCard name="Spring" variable="--neo-transition-spring" use="Playful interactions" />
      <TransitionCard name="Bounce" variable="--neo-transition-bounce" use="Attention-grabbing" />
    </div>
  ),
};

/**
 * Fast transition preset.
 */
export const TransitionFast: Story = {
  tags: ['!dev'],
  render: () => <TransitionCard name="Fast" variable="--neo-transition-fast" use="Hover states, small changes" />,
};

/**
 * Normal transition preset.
 */
export const TransitionNormal: Story = {
  tags: ['!dev'],
  render: () => <TransitionCard name="Normal" variable="--neo-transition-normal" use="Most UI transitions" />,
};

/**
 * Enter transition preset.
 */
export const TransitionEnter: Story = {
  tags: ['!dev'],
  render: () => <TransitionCard name="Enter" variable="--neo-transition-enter" use="Elements entering view" />,
};

/**
 * Exit transition preset.
 */
export const TransitionExit: Story = {
  tags: ['!dev'],
  render: () => <TransitionCard name="Exit" variable="--neo-transition-exit" use="Elements leaving view" />,
};

// =============================================================================
// EXAMPLES
// =============================================================================

/**
 * Interactive examples demonstrating motion in real components.
 */
export const Examples: Story = {
  render: () => {
    const [isPressed, setIsPressed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: 'var(--neo-text)' }}>
            Button Press Animation
          </h4>
          <p style={{ fontSize: '14px', color: 'var(--neo-text-secondary)', marginBottom: '16px' }}>
            Neomorphic buttons transition from convex to concave on press.
          </p>
          <Button
            variant={isPressed ? 'concave' : 'convex'}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
          >
            Press and Hold
          </Button>
        </div>

        <div>
          <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: 'var(--neo-text)' }}>
            Expand/Collapse Animation
          </h4>
          <p style={{ fontSize: '14px', color: 'var(--neo-text-secondary)', marginBottom: '16px' }}>
            Content reveals use emphasized easing for enter and exit.
          </p>
          <Button variant="convex" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Collapse' : 'Expand'}
          </Button>
          <div
            style={{
              marginTop: '16px',
              height: isOpen ? '100px' : '0',
              opacity: isOpen ? 1 : 0,
              overflow: 'hidden',
              transition: isOpen
                ? 'height var(--neo-transition-enter), opacity var(--neo-transition-enter)'
                : 'height var(--neo-transition-exit), opacity var(--neo-transition-exit)',
            }}
          >
            <div
              style={{
                padding: '20px',
                background: 'var(--neo-bg)',
                borderRadius: 'var(--neo-radius-sm)',
                boxShadow: 'inset 4px 4px 8px var(--neo-shadow-dark), inset -4px -4px 8px var(--neo-shadow-light)',
              }}
            >
              This content uses emphasized decelerate for entering and accelerate for exiting.
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// =============================================================================
// DARK THEME
// =============================================================================

/**
 * Motion on dark theme.
 */
export const DarkTheme: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      <TransitionCard name="Fast" variable="--neo-transition-fast" use="Hover states" />
      <TransitionCard name="Normal" variable="--neo-transition-normal" use="UI transitions" />
      <TransitionCard name="Slow" variable="--neo-transition-slow" use="Large changes" />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

/**
 * Easing curves on dark background.
 */
export const DarkThemeEasing: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <EasingDemo name="Standard" variable="--neo-easing-standard" description="Default easing" />
      <EasingDemo name="Emphasized" variable="--neo-easing-emphasized" description="Attention-drawing" />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
