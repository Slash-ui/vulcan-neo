import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { VerificationCodeInput } from './VerificationCodeInput';

describe('VerificationCodeInput', () => {
  it('renders the correct number of inputs', () => {
    render(<VerificationCodeInput />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(6);
  });

  it('renders custom number of inputs', () => {
    render(<VerificationCodeInput length={4} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
  });

  it('has aria-label for each input', () => {
    render(<VerificationCodeInput length={4} />);
    expect(screen.getByLabelText('Digit 1 of 4')).toBeInTheDocument();
    expect(screen.getByLabelText('Digit 2 of 4')).toBeInTheDocument();
    expect(screen.getByLabelText('Digit 3 of 4')).toBeInTheDocument();
    expect(screen.getByLabelText('Digit 4 of 4')).toBeInTheDocument();
  });

  it('accepts numeric input', () => {
    render(<VerificationCodeInput autoFocus={false} />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '5' } });
    expect(inputs[0]).toHaveValue('5');
  });

  it('ignores non-numeric input', () => {
    render(<VerificationCodeInput autoFocus={false} />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'a' } });
    expect(inputs[0]).toHaveValue('');
  });

  it('auto-advances to next input', () => {
    render(<VerificationCodeInput autoFocus={false} />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(document.activeElement).toBe(inputs[1]);
  });

  it('calls onChange with current code', () => {
    const handleChange = vi.fn();
    render(<VerificationCodeInput onChange={handleChange} autoFocus={false} />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(handleChange).toHaveBeenCalledWith('1');
  });

  it('calls onComplete when all digits entered', () => {
    const handleComplete = vi.fn();
    render(<VerificationCodeInput length={4} onComplete={handleComplete} autoFocus={false} />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '3' } });
    fireEvent.change(inputs[3], { target: { value: '4' } });
    expect(handleComplete).toHaveBeenCalledWith('1234');
  });

  it('handles backspace to clear current input', () => {
    render(<VerificationCodeInput autoFocus={false} />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.keyDown(inputs[0], { key: 'Backspace' });
    expect(inputs[0]).toHaveValue('');
  });

  it('handles backspace to move to previous input when empty', () => {
    render(<VerificationCodeInput autoFocus={false} />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    // Clear second input and press backspace again
    fireEvent.keyDown(inputs[1], { key: 'Backspace' });
    fireEvent.keyDown(inputs[1], { key: 'Backspace' });
    expect(document.activeElement).toBe(inputs[0]);
  });

  it('handles arrow key navigation', () => {
    render(<VerificationCodeInput autoFocus={false} />);
    const inputs = screen.getAllByRole('textbox');
    inputs[1].focus();
    fireEvent.keyDown(inputs[1], { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(inputs[0]);

    fireEvent.keyDown(inputs[0], { key: 'ArrowRight' });
    expect(document.activeElement).toBe(inputs[1]);
  });

  it('handles paste', () => {
    const handleComplete = vi.fn();
    render(<VerificationCodeInput length={4} onComplete={handleComplete} autoFocus={false} />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.paste(inputs[0], { clipboardData: { getData: () => '1234' } });
    expect(inputs[0]).toHaveValue('1');
    expect(inputs[1]).toHaveValue('2');
    expect(inputs[2]).toHaveValue('3');
    expect(inputs[3]).toHaveValue('4');
    expect(handleComplete).toHaveBeenCalledWith('1234');
  });

  it('uses password type when masked', () => {
    render(<VerificationCodeInput masked />);
    const inputs = document.querySelectorAll('input[type="password"]');
    expect(inputs).toHaveLength(6);
  });

  it('applies error class when error is true', () => {
    render(<VerificationCodeInput error data-testid="code" />);
    expect(screen.getByTestId('code').className).toContain('error');
  });

  it('is disabled when disabled prop is true', () => {
    render(<VerificationCodeInput disabled />);
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach(input => {
      expect(input).toBeDisabled();
    });
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<VerificationCodeInput size="sm" />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0].className).toContain('sm');

    rerender(<VerificationCodeInput size="lg" />);
    expect(screen.getAllByRole('textbox')[0].className).toContain('lg');
  });

  it('works in controlled mode', () => {
    const { rerender } = render(<VerificationCodeInput value="12" length={4} autoFocus={false} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveValue('1');
    expect(inputs[1]).toHaveValue('2');
    expect(inputs[2]).toHaveValue('');
    expect(inputs[3]).toHaveValue('');

    rerender(<VerificationCodeInput value="1234" length={4} autoFocus={false} />);
    expect(inputs[3]).toHaveValue('4');
  });

  it('applies custom className', () => {
    render(<VerificationCodeInput className="custom-class" data-testid="code" />);
    expect(screen.getByTestId('code')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<VerificationCodeInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
