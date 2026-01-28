import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Messaging, MessageBubble, MessageInput } from './Messaging';

const defaultMessages = [
  { id: 1, content: 'Hello!', timestamp: '10:00 AM', position: 'left' as const, sender: { name: 'Alice' } },
  { id: 2, content: 'Hi there!', timestamp: '10:01 AM', position: 'right' as const },
];

describe('Messaging', () => {
  it('renders all messages', () => {
    render(<Messaging messages={defaultMessages} />);
    expect(screen.getByText('Hello!')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('renders timestamps', () => {
    render(<Messaging messages={defaultMessages} />);
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('10:01 AM')).toBeInTheDocument();
  });

  it('renders sender names', () => {
    render(<Messaging messages={defaultMessages} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Messaging messages={defaultMessages} className="custom-messaging" data-testid="messaging" />);
    expect(screen.getByTestId('messaging')).toHaveClass('custom-messaging');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<Messaging ref={ref} messages={defaultMessages} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('MessageBubble', () => {
  it('renders content', () => {
    render(<MessageBubble content="Test message" />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders timestamp', () => {
    render(<MessageBubble content="Test" timestamp="12:00 PM" />);
    expect(screen.getByText('12:00 PM')).toBeInTheDocument();
  });

  it('renders sender name for left position', () => {
    render(
      <MessageBubble
        content="Test"
        position="left"
        sender={{ name: 'John' }}
      />
    );
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('does not render sender name for right position', () => {
    render(
      <MessageBubble
        content="Test"
        position="right"
        sender={{ name: 'John' }}
      />
    );
    expect(screen.queryByText('John')).not.toBeInTheDocument();
  });

  it('renders avatar with image', () => {
    render(
      <MessageBubble
        content="Test"
        position="left"
        sender={{ name: 'John', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' }}
      />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop');
    expect(img).toHaveAttribute('alt', 'John');
  });

  it('renders avatar fallback when no image', () => {
    render(
      <MessageBubble
        content="Test"
        position="left"
        sender={{ name: 'John' }}
      />
    );
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('hides avatar when showAvatar is false', () => {
    render(
      <MessageBubble
        content="Test"
        position="left"
        sender={{ name: 'John' }}
        showAvatar={false}
      />
    );
    expect(screen.queryByText('J')).not.toBeInTheDocument();
  });

  it('shows status icon for right position', () => {
    render(
      <MessageBubble
        content="Test"
        position="right"
        status="sent"
      />
    );
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('does not show status icon for left position', () => {
    render(
      <MessageBubble
        content="Test"
        position="left"
        status="sent"
      />
    );
    // SVG should not be in the status area (there might be avatar-related SVGs)
    const bubble = screen.getByText('Test').closest('[class*="bubble"]');
    expect(bubble?.querySelector('[class*="status"] svg')).not.toBeInTheDocument();
  });

  it('applies position classes', () => {
    const { rerender } = render(<MessageBubble content="Test" position="left" data-testid="bubble" />);
    expect(screen.getByTestId('bubble').className).toContain('left');

    rerender(<MessageBubble content="Test" position="right" data-testid="bubble" />);
    expect(screen.getByTestId('bubble').className).toContain('right');
  });

  it('applies custom className', () => {
    render(<MessageBubble content="Test" className="custom-bubble" data-testid="bubble" />);
    expect(screen.getByTestId('bubble')).toHaveClass('custom-bubble');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<MessageBubble ref={ref} content="Test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('MessageInput', () => {
  it('renders input with placeholder', () => {
    render(<MessageInput value="" onChange={vi.fn()} onSubmit={vi.fn()} />);
    expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
  });

  it('renders custom placeholder', () => {
    render(
      <MessageInput
        value=""
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        placeholder="Write something..."
      />
    );
    expect(screen.getByPlaceholderText('Write something...')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const handleChange = vi.fn();
    render(<MessageInput value="" onChange={handleChange} onSubmit={vi.fn()} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello' } });
    expect(handleChange).toHaveBeenCalledWith('Hello');
  });

  it('calls onSubmit when send button clicked', () => {
    const handleSubmit = vi.fn();
    render(<MessageInput value="Hello" onChange={vi.fn()} onSubmit={handleSubmit} />);
    fireEvent.click(screen.getByLabelText('Send message'));
    expect(handleSubmit).toHaveBeenCalledWith('Hello');
  });

  it('does not call onSubmit when value is empty', () => {
    const handleSubmit = vi.fn();
    render(<MessageInput value="   " onChange={vi.fn()} onSubmit={handleSubmit} />);
    fireEvent.click(screen.getByLabelText('Send message'));
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit on Enter key', () => {
    const handleSubmit = vi.fn();
    render(<MessageInput value="Hello" onChange={vi.fn()} onSubmit={handleSubmit} />);
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    expect(handleSubmit).toHaveBeenCalledWith('Hello');
  });

  it('does not call onSubmit on Shift+Enter', () => {
    const handleSubmit = vi.fn();
    render(<MessageInput value="Hello" onChange={vi.fn()} onSubmit={handleSubmit} />);
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter', shiftKey: true });
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('disables input when disabled', () => {
    render(<MessageInput value="" onChange={vi.fn()} onSubmit={vi.fn()} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByLabelText('Send message')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(
      <MessageInput
        value=""
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        className="custom-input"
        data-testid="input"
      />
    );
    expect(screen.getByTestId('input')).toHaveClass('custom-input');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<MessageInput ref={ref} value="" onChange={vi.fn()} onSubmit={vi.fn()} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
