import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CodeSnippet } from './CodeSnippet';

const sampleCode = `function hello() {
  console.log('Hello, World!');
}`;

describe('CodeSnippet', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it('renders code content', () => {
    render(<CodeSnippet code={sampleCode} />);
    expect(screen.getByText(/function hello/)).toBeInTheDocument();
    expect(screen.getByText(/console\.log/)).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<CodeSnippet code={sampleCode} title="example.js" />);
    expect(screen.getByText('example.js')).toBeInTheDocument();
  });

  it('renders language badge when provided', () => {
    render(<CodeSnippet code={sampleCode} language="javascript" />);
    expect(screen.getByText('javascript')).toBeInTheDocument();
  });

  it('shows line numbers by default', () => {
    render(<CodeSnippet code={sampleCode} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('hides line numbers when showLineNumbers is false', () => {
    render(<CodeSnippet code={sampleCode} showLineNumbers={false} />);
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });

  it('shows copy button by default', () => {
    render(<CodeSnippet code={sampleCode} />);
    expect(screen.getByLabelText('Copy code')).toBeInTheDocument();
  });

  it('hides copy button when showCopyButton is false', () => {
    render(<CodeSnippet code={sampleCode} showCopyButton={false} title="test" />);
    expect(screen.queryByLabelText('Copy code')).not.toBeInTheDocument();
  });

  it('copies code to clipboard when copy button clicked', async () => {
    render(<CodeSnippet code={sampleCode} />);
    fireEvent.click(screen.getByLabelText('Copy code'));
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(sampleCode);
    });
  });

  it('shows "Copied!" after copying', async () => {
    render(<CodeSnippet code={sampleCode} />);
    fireEvent.click(screen.getByLabelText('Copy code'));
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });

  it('calls onCopy callback when code is copied', async () => {
    const handleCopy = vi.fn();
    render(<CodeSnippet code={sampleCode} onCopy={handleCopy} />);
    fireEvent.click(screen.getByLabelText('Copy code'));
    await waitFor(() => {
      expect(handleCopy).toHaveBeenCalledWith(sampleCode);
    });
  });

  it('highlights specified lines', () => {
    render(<CodeSnippet code={sampleCode} highlightLines={[2]} data-testid="snippet" />);
    const snippet = screen.getByTestId('snippet');
    const highlightedLine = snippet.querySelector('[class*="highlighted"]');
    expect(highlightedLine).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<CodeSnippet code={sampleCode} size="sm" data-testid="snippet" />);
    expect(screen.getByTestId('snippet').className).toContain('sm');

    rerender(<CodeSnippet code={sampleCode} size="md" data-testid="snippet" />);
    expect(screen.getByTestId('snippet').className).toContain('md');

    rerender(<CodeSnippet code={sampleCode} size="lg" data-testid="snippet" />);
    expect(screen.getByTestId('snippet').className).toContain('lg');
  });

  it('applies maxHeight style', () => {
    render(<CodeSnippet code={sampleCode} maxHeight="200px" />);
    const container = document.querySelector('[class*="codeContainer"]');
    expect(container).toHaveStyle({ maxHeight: '200px' });
  });

  it('handles empty code', () => {
    render(<CodeSnippet code="" data-testid="snippet" />);
    // Empty code still renders the component
    expect(screen.getByTestId('snippet')).toBeInTheDocument();
  });

  it('handles multiline code', () => {
    const multilineCode = `line1
line2
line3
line4
line5`;
    render(<CodeSnippet code={multilineCode} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CodeSnippet code={sampleCode} className="custom-snippet" data-testid="snippet" />);
    expect(screen.getByTestId('snippet')).toHaveClass('custom-snippet');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<CodeSnippet ref={ref} code={sampleCode} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
