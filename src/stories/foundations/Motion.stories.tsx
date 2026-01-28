import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState, useEffect } from 'react';
import { Surface } from '../../components/foundation/Surface';
import { Button } from '../../components/atoms/Button';

const EasingDemo: React.FC<{
  name: string;
  variable: string;
  description: string;
}> = ({ name, variable, description }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        padding: '24px',
        background: 'var(--neo-bg)',
        borderRadius: 'var(--neo-radius-sm)',
        boxShadow:
          '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
        marginBottom: '16px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: 'var(--neo-text)',
              marginBottom: '4px',
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: 'var(--neo-font-family-mono)',
              fontSize: '11px',
              color: 'var(--neo-text-secondary)',
              marginBottom: '4px',
            }}
          >
            {variable}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: 'var(--neo-text-secondary)',
            }}
          >
            {description}
          </div>
        </div>
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
        padding: '24px',
        background: 'var(--neo-bg)',
        borderRadius: 'var(--neo-radius-sm)',
        boxShadow:
          '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
        marginBottom: '16px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: 'var(--neo-text)',
              marginBottom: '4px',
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: 'var(--neo-font-family-mono)',
              fontSize: '11px',
              color: 'var(--neo-text-secondary)',
            }}
          >
            {variable} = {ms}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: 'var(--neo-text-secondary)',
            }}
          >
            {description}
          </div>
        </div>
        <button
          onClick={() => setAnimate(!animate)}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--neo-radius-sm)',
            border: 'none',
            background: 'var(--neo-bg)',
            color: 'var(--neo-text)',
            fontFamily: 'var(--neo-font-family)',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            boxShadow: '-2px -2px 4px var(--neo-shadow-light), 2px 2px 4px var(--neo-shadow-dark)',
          }}
        >
          Trigger
        </button>
      </div>
      <div
        style={{
          height: '48px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
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

const TransitionPresetDemo: React.FC = () => {
  const [hover, setHover] = useState<string | null>(null);

  const presets = [
    { name: 'Instant', var: '--neo-transition-instant', use: 'Micro-interactions' },
    { name: 'Fast', var: '--neo-transition-fast', use: 'Hover states, small changes' },
    { name: 'Normal', var: '--neo-transition-normal', use: 'Most UI transitions' },
    { name: 'Slow', var: '--neo-transition-slow', use: 'Larger element changes' },
    { name: 'Slower', var: '--neo-transition-slower', use: 'Page transitions' },
    { name: 'Enter', var: '--neo-transition-enter', use: 'Elements entering view' },
    { name: 'Exit', var: '--neo-transition-exit', use: 'Elements leaving view' },
    { name: 'Spring', var: '--neo-transition-spring', use: 'Playful interactions' },
    { name: 'Bounce', var: '--neo-transition-bounce', use: 'Attention-grabbing' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {presets.map((preset) => (
        <div
          key={preset.name}
          onMouseEnter={() => setHover(preset.name)}
          onMouseLeave={() => setHover(null)}
          style={{
            padding: '24px',
            background: 'var(--neo-bg)',
            borderRadius: 'var(--neo-radius-sm)',
            boxShadow: hover === preset.name
              ? '-8px -8px 16px var(--neo-shadow-light), 8px 8px 16px var(--neo-shadow-dark)'
              : '-4px -4px 8px var(--neo-shadow-light), 4px 4px 8px var(--neo-shadow-dark)',
            transform: hover === preset.name ? 'translateY(-4px)' : 'translateY(0)',
            transition: `all var(${preset.var})`,
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: 'var(--neo-text)',
              marginBottom: '4px',
            }}
          >
            {preset.name}
          </div>
          <div
            style={{
              fontFamily: 'var(--neo-font-family-mono)',
              fontSize: '11px',
              color: 'var(--neo-text-secondary)',
              marginBottom: '8px',
            }}
          >
            {preset.var}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: 'var(--neo-text-secondary)',
            }}
          >
            {preset.use}
          </div>
        </div>
      ))}
    </div>
  );
};

const AnimationExample: React.FC = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: 'var(--neo-text)' }}>
          Button Press Animation
        </h4>
        <p style={{ fontSize: '14px', color: 'var(--neo-text-secondary)', marginBottom: '16px' }}>
          Neomorphic buttons transition from convex to concave on press, creating a physical feedback sensation.
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
        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: 'var(--neo-text)' }}>
          Expand/Collapse Animation
        </h4>
        <p style={{ fontSize: '14px', color: 'var(--neo-text-secondary)', marginBottom: '16px' }}>
          Content reveals use emphasized decelerate easing for entering and emphasized accelerate for exiting.
        </p>
        <Button variant="convex" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Collapse' : 'Expand'}
        </Button>
        <div
          style={{
            marginTop: '16px',
            height: isOpen ? '120px' : '0',
            opacity: isOpen ? 1 : 0,
            overflow: 'hidden',
            transition: isOpen
              ? 'height var(--neo-transition-enter), opacity var(--neo-transition-enter)'
              : 'height var(--neo-transition-exit), opacity var(--neo-transition-exit)',
          }}
        >
          <div
            style={{
              padding: '24px',
              background: 'var(--neo-bg)',
              borderRadius: 'var(--neo-radius-sm)',
              boxShadow: 'inset 4px 4px 8px var(--neo-shadow-dark), inset -4px -4px 8px var(--neo-shadow-light)',
            }}
          >
            This content expands with emphasized decelerate easing and collapses with emphasized accelerate easing.
          </div>
        </div>
      </div>
    </div>
  );
};

const MotionPage: React.FC = () => (
  <div style={{ maxWidth: '1000px', padding: '40px' }}>
    <h1
      style={{
        fontSize: '36px',
        fontWeight: 700,
        marginBottom: '16px',
        color: 'var(--neo-text)',
        letterSpacing: '-0.02em',
      }}
    >
      Motion
    </h1>
    <p
      style={{
        fontSize: '18px',
        color: 'var(--neo-text-secondary)',
        marginBottom: '48px',
        lineHeight: 1.6,
        maxWidth: '700px',
      }}
    >
      Motion in Vulcan Neo creates a sense of physicality and depth. Animations reinforce the
      neomorphic aesthetic by simulating light and shadow changes that occur when objects move
      in 3D space.
    </p>

    <div style={{ marginBottom: '56px' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 600,
          marginBottom: '16px',
          color: 'var(--neo-text)',
        }}
      >
        Duration Tokens
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--neo-text-secondary)',
          marginBottom: '24px',
          maxWidth: '600px',
        }}
      >
        Duration determines how long an animation takes. Shorter durations feel snappy and responsive,
        while longer durations feel more deliberate and smooth.
      </p>
      <DurationDemo
        name="Instant"
        variable="--neo-duration-instant"
        ms="50ms"
        description="For immediate feedback, like cursor changes"
      />
      <DurationDemo
        name="Fast"
        variable="--neo-duration-fast"
        ms="100ms"
        description="For quick micro-interactions"
      />
      <DurationDemo
        name="Normal"
        variable="--neo-duration-normal"
        ms="200ms"
        description="Standard UI transitions"
      />
      <DurationDemo
        name="Slow"
        variable="--neo-duration-slow"
        ms="300ms"
        description="For larger state changes"
      />
      <DurationDemo
        name="Slower"
        variable="--neo-duration-slower"
        ms="400ms"
        description="For complex animations"
      />
      <DurationDemo
        name="Slowest"
        variable="--neo-duration-slowest"
        ms="500ms"
        description="For dramatic reveals"
      />
    </div>

    <div style={{ marginBottom: '56px' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 600,
          marginBottom: '16px',
          color: 'var(--neo-text)',
        }}
      >
        Easing Curves
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--neo-text-secondary)',
          marginBottom: '24px',
          maxWidth: '600px',
        }}
      >
        Easing determines the rate of change during an animation. Different curves create
        different feelings of motion.
      </p>
      <EasingDemo
        name="Standard"
        variable="--neo-easing-standard"
        description="Default easing for most transitions. Starts quickly and decelerates."
      />
      <EasingDemo
        name="Standard Decelerate"
        variable="--neo-easing-standard-decelerate"
        description="For elements entering the screen. Starts at full speed and slows down."
      />
      <EasingDemo
        name="Standard Accelerate"
        variable="--neo-easing-standard-accelerate"
        description="For elements leaving the screen. Starts slow and speeds up."
      />
      <EasingDemo
        name="Emphasized"
        variable="--neo-easing-emphasized"
        description="For attention-drawing animations. More pronounced deceleration."
      />
      <EasingDemo
        name="Emphasized Decelerate"
        variable="--neo-easing-emphasized-decelerate"
        description="For dramatic entries. Strong deceleration at the end."
      />
      <EasingDemo
        name="Emphasized Accelerate"
        variable="--neo-easing-emphasized-accelerate"
        description="For dramatic exits. Strong acceleration at the start."
      />
    </div>

    <div style={{ marginBottom: '56px' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 600,
          marginBottom: '16px',
          color: 'var(--neo-text)',
        }}
      >
        Transition Presets
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--neo-text-secondary)',
          marginBottom: '24px',
          maxWidth: '600px',
        }}
      >
        Pre-composed transitions combining duration and easing for common use cases.
        Hover over each card to see the transition in action.
      </p>
      <TransitionPresetDemo />
    </div>

    <div style={{ marginBottom: '56px' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 600,
          marginBottom: '16px',
          color: 'var(--neo-text)',
        }}
      >
        Animation Examples
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--neo-text-secondary)',
          marginBottom: '24px',
          maxWidth: '600px',
        }}
      >
        Interactive examples demonstrating how motion tokens work together in real components.
      </p>
      <AnimationExample />
    </div>

    <div
      style={{
        padding: '24px',
        background: 'var(--neo-bg)',
        borderRadius: 'var(--neo-radius-md)',
        boxShadow: 'inset 4px 4px 8px var(--neo-shadow-dark), inset -4px -4px 8px var(--neo-shadow-light)',
      }}
    >
      <h3
        style={{
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '12px',
          color: 'var(--neo-text)',
        }}
      >
        Motion Guidelines
      </h3>
      <ul
        style={{
          fontSize: '14px',
          color: 'var(--neo-text-secondary)',
          lineHeight: 1.8,
          margin: 0,
          paddingLeft: '20px',
        }}
      >
        <li>Use <strong>fast</strong> transitions (100-200ms) for hover states and small changes</li>
        <li>Use <strong>normal</strong> transitions (200-300ms) for most UI interactions</li>
        <li>Use <strong>slow</strong> transitions (300-400ms) for larger state changes like modals</li>
        <li>Use <strong>emphasized decelerate</strong> for elements entering the view</li>
        <li>Use <strong>emphasized accelerate</strong> for elements leaving the view</li>
        <li>Maintain consistent timing within related animations</li>
        <li>Avoid animations longer than 500ms for interactive elements</li>
      </ul>
    </div>
  </div>
);

const meta: Meta = {
  title: 'Foundations/Motion',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const LightTheme: Story = {
  render: () => (
    <Surface theme="light" style={{ minHeight: '100vh' }}>
      <MotionPage />
    </Surface>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <Surface theme="dark" style={{ minHeight: '100vh' }}>
      <MotionPage />
    </Surface>
  ),
};
