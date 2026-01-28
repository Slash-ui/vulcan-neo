import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup, RadioGroupItem } from './RadioGroup';

describe('RadioGroup', () => {
  it('renders children correctly', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" />
      </RadioGroup>
    );
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  it('has role="radiogroup"', () => {
    render(
      <RadioGroup data-testid="group">
        <RadioGroupItem value="a" label="Option A" />
      </RadioGroup>
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(
      <RadioGroup label="Choose an option">
        <RadioGroupItem value="a" label="Option A" />
      </RadioGroup>
    );
    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });

  it('handles controlled value', () => {
    const handleChange = vi.fn();
    render(
      <RadioGroup value="a" onChange={handleChange}>
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" />
      </RadioGroup>
    );
    expect(screen.getAllByRole('radio')[0]).toBeChecked();
    expect(screen.getAllByRole('radio')[1]).not.toBeChecked();
  });

  it('calls onChange when selection changes', () => {
    const handleChange = vi.fn();
    render(
      <RadioGroup value="a" onChange={handleChange}>
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" />
      </RadioGroup>
    );
    fireEvent.click(screen.getAllByRole('radio')[1]);
    expect(handleChange).toHaveBeenCalledWith('b');
  });

  it('applies vertical orientation by default', () => {
    render(
      <RadioGroup data-testid="group">
        <RadioGroupItem value="a" label="Option A" />
      </RadioGroup>
    );
    expect(screen.getByTestId('group').className).toContain('vertical');
  });

  it('applies horizontal orientation when specified', () => {
    render(
      <RadioGroup orientation="horizontal" data-testid="group">
        <RadioGroupItem value="a" label="Option A" />
      </RadioGroup>
    );
    expect(screen.getByTestId('group').className).toContain('horizontal');
  });

  it('disables all items when disabled is true', () => {
    render(
      <RadioGroup disabled>
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" />
      </RadioGroup>
    );
    screen.getAllByRole('radio').forEach(radio => {
      expect(radio).toBeDisabled();
    });
  });

  it('supports uncontrolled mode with defaultValue', () => {
    render(
      <RadioGroup defaultValue="b">
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" />
      </RadioGroup>
    );
    expect(screen.getAllByRole('radio')[1]).toBeChecked();
  });

  it('applies custom className', () => {
    render(
      <RadioGroup className="custom-class" data-testid="group">
        <RadioGroupItem value="a" label="Option A" />
      </RadioGroup>
    );
    expect(screen.getByTestId('group')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <RadioGroup ref={ref}>
        <RadioGroupItem value="a" label="Option A" />
      </RadioGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('RadioGroupItem', () => {
  it('throws error when used outside RadioGroup', () => {
    expect(() => {
      render(<RadioGroupItem value="a" label="Option" />);
    }).toThrow('RadioGroupItem must be used within a RadioGroup');
  });

  it('renders description when provided', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="Option A" description="This is option A" />
      </RadioGroup>
    );
    expect(screen.getByText('This is option A')).toBeInTheDocument();
  });

  it('can be individually disabled', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="Option A" />
        <RadioGroupItem value="b" label="Option B" disabled />
      </RadioGroup>
    );
    expect(screen.getAllByRole('radio')[0]).not.toBeDisabled();
    expect(screen.getAllByRole('radio')[1]).toBeDisabled();
  });
});
