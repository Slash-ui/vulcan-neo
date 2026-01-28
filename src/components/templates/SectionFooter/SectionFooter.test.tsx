import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionFooter } from './SectionFooter';

describe('SectionFooter', () => {
  it('renders left content', () => {
    render(<SectionFooter left={<span>Left content</span>} />);
    expect(screen.getByText('Left content')).toBeInTheDocument();
  });

  it('renders right content', () => {
    render(<SectionFooter right={<span>Right content</span>} />);
    expect(screen.getByText('Right content')).toBeInTheDocument();
  });

  it('renders children when no left/right provided', () => {
    render(<SectionFooter>Center content</SectionFooter>);
    expect(screen.getByText('Center content')).toBeInTheDocument();
  });

  it('renders left, right, and children together', () => {
    render(
      <SectionFooter
        left={<span>Left</span>}
        right={<span>Right</span>}
      >
        <span>Center</span>
      </SectionFooter>
    );
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
    expect(screen.getByText('Center')).toBeInTheDocument();
  });

  it('applies bordered class by default', () => {
    render(<SectionFooter data-testid="footer">Content</SectionFooter>);
    expect(screen.getByTestId('footer').className).toContain('bordered');
  });

  it('removes bordered class when bordered is false', () => {
    render(<SectionFooter bordered={false} data-testid="footer">Content</SectionFooter>);
    expect(screen.getByTestId('footer').className).not.toContain('bordered');
  });

  it('applies align classes correctly', () => {
    const { rerender } = render(
      <SectionFooter align="start" data-testid="footer">Content</SectionFooter>
    );
    expect(screen.getByTestId('footer').className).toContain('align-start');

    rerender(<SectionFooter align="center" data-testid="footer">Content</SectionFooter>);
    expect(screen.getByTestId('footer').className).toContain('align-center');

    rerender(<SectionFooter align="end" data-testid="footer">Content</SectionFooter>);
    expect(screen.getByTestId('footer').className).toContain('align-end');

    rerender(<SectionFooter align="between" data-testid="footer">Content</SectionFooter>);
    expect(screen.getByTestId('footer').className).toContain('align-between');
  });

  it('applies custom className', () => {
    render(<SectionFooter className="custom-footer" data-testid="footer">Content</SectionFooter>);
    expect(screen.getByTestId('footer')).toHaveClass('custom-footer');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<SectionFooter ref={ref}>Content</SectionFooter>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
