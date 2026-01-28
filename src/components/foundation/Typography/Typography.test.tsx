import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Typography } from './Typography';

// Helper to check if element has a class containing a substring (for CSS modules)
const hasClassContaining = (element: HTMLElement, classSubstring: string) => {
  return Array.from(element.classList).some((cls) =>
    cls.toLowerCase().includes(classSubstring.toLowerCase())
  );
};

describe('Typography', () => {
  it('renders children correctly', () => {
    render(<Typography>Hello World</Typography>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders with default variant (body1)', () => {
    render(<Typography>Default text</Typography>);
    const element = screen.getByText('Default text');
    expect(element.tagName.toLowerCase()).toBe('p');
  });

  it('renders correct element for each variant', () => {
    const { rerender } = render(<Typography variant="h1">Heading 1</Typography>);
    expect(screen.getByText('Heading 1').tagName.toLowerCase()).toBe('h1');

    rerender(<Typography variant="h2">Heading 2</Typography>);
    expect(screen.getByText('Heading 2').tagName.toLowerCase()).toBe('h2');

    rerender(<Typography variant="h3">Heading 3</Typography>);
    expect(screen.getByText('Heading 3').tagName.toLowerCase()).toBe('h3');

    rerender(<Typography variant="h4">Heading 4</Typography>);
    expect(screen.getByText('Heading 4').tagName.toLowerCase()).toBe('h4');

    rerender(<Typography variant="h5">Heading 5</Typography>);
    expect(screen.getByText('Heading 5').tagName.toLowerCase()).toBe('h5');

    rerender(<Typography variant="h6">Heading 6</Typography>);
    expect(screen.getByText('Heading 6').tagName.toLowerCase()).toBe('h6');

    rerender(<Typography variant="subtitle1">Subtitle 1</Typography>);
    expect(screen.getByText('Subtitle 1').tagName.toLowerCase()).toBe('h6');

    rerender(<Typography variant="subtitle2">Subtitle 2</Typography>);
    expect(screen.getByText('Subtitle 2').tagName.toLowerCase()).toBe('h6');

    rerender(<Typography variant="body1">Body 1</Typography>);
    expect(screen.getByText('Body 1').tagName.toLowerCase()).toBe('p');

    rerender(<Typography variant="body2">Body 2</Typography>);
    expect(screen.getByText('Body 2').tagName.toLowerCase()).toBe('p');

    rerender(<Typography variant="button">Button</Typography>);
    expect(screen.getByText('Button').tagName.toLowerCase()).toBe('span');

    rerender(<Typography variant="caption">Caption</Typography>);
    expect(screen.getByText('Caption').tagName.toLowerCase()).toBe('span');

    rerender(<Typography variant="overline">Overline</Typography>);
    expect(screen.getByText('Overline').tagName.toLowerCase()).toBe('span');
  });

  it('renders custom component when specified', () => {
    render(
      <Typography variant="h3" component="div">
        Custom component
      </Typography>
    );
    expect(screen.getByText('Custom component').tagName.toLowerCase()).toBe('div');
  });

  it('applies color classes correctly', () => {
    const { rerender } = render(
      <Typography color="primary">Primary</Typography>
    );
    expect(hasClassContaining(screen.getByText('Primary'), 'color-primary')).toBe(true);

    rerender(<Typography color="secondary">Secondary</Typography>);
    expect(hasClassContaining(screen.getByText('Secondary'), 'color-secondary')).toBe(true);

    rerender(<Typography color="error">Error</Typography>);
    expect(hasClassContaining(screen.getByText('Error'), 'color-error')).toBe(true);

    rerender(<Typography color="success">Success</Typography>);
    expect(hasClassContaining(screen.getByText('Success'), 'color-success')).toBe(true);
  });

  it('applies alignment classes correctly', () => {
    const { rerender } = render(
      <Typography align="center">Centered</Typography>
    );
    expect(hasClassContaining(screen.getByText('Centered'), 'align-center')).toBe(true);

    rerender(<Typography align="right">Right</Typography>);
    expect(hasClassContaining(screen.getByText('Right'), 'align-right')).toBe(true);

    rerender(<Typography align="left">Left</Typography>);
    expect(hasClassContaining(screen.getByText('Left'), 'align-left')).toBe(true);
  });

  it('applies noWrap class when specified', () => {
    render(<Typography noWrap>No wrap text</Typography>);
    expect(hasClassContaining(screen.getByText('No wrap text'), 'noWrap')).toBe(true);
  });

  it('applies gutterBottom class when specified', () => {
    render(<Typography gutterBottom>With gutter</Typography>);
    expect(hasClassContaining(screen.getByText('With gutter'), 'gutterBottom')).toBe(true);
  });

  it('applies inline class when specified', () => {
    render(<Typography inline>Inline text</Typography>);
    expect(hasClassContaining(screen.getByText('Inline text'), 'inline')).toBe(true);
  });

  it('merges custom className with default classes', () => {
    render(<Typography className="custom-class">Custom</Typography>);
    const element = screen.getByText('Custom');
    expect(hasClassContaining(element, 'typography')).toBe(true);
    expect(element).toHaveClass('custom-class');
  });

  it('passes additional props to the element', () => {
    render(<Typography data-testid="custom-typography">Test</Typography>);
    expect(screen.getByTestId('custom-typography')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Typography ref={ref}>Ref test</Typography>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('applies variant class correctly', () => {
    render(<Typography variant="h3">Headline</Typography>);
    expect(hasClassContaining(screen.getByText('Headline'), 'h3')).toBe(true);
  });
});
