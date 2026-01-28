import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContentDivider } from './ContentDivider';

describe('ContentDivider', () => {
  it('renders with separator role', () => {
    render(<ContentDivider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('has horizontal aria-orientation by default', () => {
    render(<ContentDivider />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('has vertical aria-orientation when orientation is vertical', () => {
    render(<ContentDivider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('renders label when provided', () => {
    render(<ContentDivider label="OR" />);
    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('applies orientation classes correctly', () => {
    const { rerender } = render(<ContentDivider orientation="horizontal" />);
    expect(screen.getByRole('separator').className).toContain('horizontal');

    rerender(<ContentDivider orientation="vertical" />);
    expect(screen.getByRole('separator').className).toContain('vertical');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<ContentDivider variant="solid" />);
    expect(screen.getByRole('separator').className).toContain('solid');

    rerender(<ContentDivider variant="dashed" />);
    expect(screen.getByRole('separator').className).toContain('dashed');

    rerender(<ContentDivider variant="groove" />);
    expect(screen.getByRole('separator').className).toContain('groove');
  });

  it('applies spacing classes correctly', () => {
    const { rerender } = render(<ContentDivider spacing="none" />);
    expect(screen.getByRole('separator').className).toContain('spacing-none');

    rerender(<ContentDivider spacing="sm" />);
    expect(screen.getByRole('separator').className).toContain('spacing-sm');

    rerender(<ContentDivider spacing="md" />);
    expect(screen.getByRole('separator').className).toContain('spacing-md');

    rerender(<ContentDivider spacing="lg" />);
    expect(screen.getByRole('separator').className).toContain('spacing-lg');
  });

  it('applies label position classes correctly', () => {
    const { rerender } = render(<ContentDivider label="Text" labelPosition="start" />);
    expect(screen.getByRole('separator').className).toContain('label-start');

    rerender(<ContentDivider label="Text" labelPosition="center" />);
    expect(screen.getByRole('separator').className).toContain('label-center');

    rerender(<ContentDivider label="Text" labelPosition="end" />);
    expect(screen.getByRole('separator').className).toContain('label-end');
  });

  it('applies withLabel class when label is provided', () => {
    render(<ContentDivider label="Label" />);
    expect(screen.getByRole('separator').className).toContain('withLabel');
  });

  it('applies custom className', () => {
    render(<ContentDivider className="custom-divider" />);
    expect(screen.getByRole('separator')).toHaveClass('custom-divider');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<ContentDivider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
