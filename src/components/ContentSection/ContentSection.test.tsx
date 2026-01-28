import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContentSection } from './ContentSection';

describe('ContentSection', () => {
  it('renders children content', () => {
    render(
      <ContentSection>
        <p>This is the main content of the section.</p>
      </ContentSection>
    );
    expect(screen.getByText('This is the main content of the section.')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(
      <ContentSection title="Documentation">
        <p>Content</p>
      </ContentSection>
    );
    expect(screen.getByText('Documentation')).toBeInTheDocument();
  });

  it('renders eyebrow', () => {
    render(
      <ContentSection eyebrow="Getting Started" title="Title">
        <p>Content</p>
      </ContentSection>
    );
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
  });

  it('renders table of contents when showToc is true', () => {
    const tocItems = [
      { id: 'introduction', label: 'Introduction' },
      { id: 'features', label: 'Features' },
      { id: 'conclusion', label: 'Conclusion' },
    ];
    render(
      <ContentSection showToc tocItems={tocItems}>
        <p>Content</p>
      </ContentSection>
    );
    expect(screen.getByText('On this page')).toBeInTheDocument();
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Conclusion')).toBeInTheDocument();
  });

  it('renders toc links with correct href', () => {
    const tocItems = [{ id: 'intro', label: 'Introduction' }];
    render(
      <ContentSection showToc tocItems={tocItems}>
        <p>Content</p>
      </ContentSection>
    );
    const link = screen.getByText('Introduction');
    expect(link).toHaveAttribute('href', '#intro');
  });

  it('does not render toc when showToc is false', () => {
    const tocItems = [{ id: 'intro', label: 'Introduction' }];
    render(
      <ContentSection showToc={false} tocItems={tocItems}>
        <p>Content</p>
      </ContentSection>
    );
    expect(screen.queryByText('On this page')).not.toBeInTheDocument();
  });

  it('renders sidebar content', () => {
    render(
      <ContentSection sidebar={<div data-testid="sidebar">Sidebar content</div>}>
        <p>Main content</p>
      </ContentSection>
    );
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('applies sidebar position class', () => {
    render(
      <ContentSection
        sidebar={<div>Sidebar</div>}
        sidebarPosition="left"
        data-testid="content"
      >
        <p>Content</p>
      </ContentSection>
    );
    expect(screen.getByTestId('content').className).toContain('sidebarLeft');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(
      <ContentSection variant="default" data-testid="content">
        <p>Content</p>
      </ContentSection>
    );
    expect(screen.getByTestId('content').className).toContain('default');

    rerender(
      <ContentSection variant="wide" data-testid="content">
        <p>Content</p>
      </ContentSection>
    );
    expect(screen.getByTestId('content').className).toContain('wide');

    rerender(
      <ContentSection variant="narrow" data-testid="content">
        <p>Content</p>
      </ContentSection>
    );
    expect(screen.getByTestId('content').className).toContain('narrow');
  });

  it('applies hasSidebar class when sidebar is provided', () => {
    render(
      <ContentSection sidebar={<div>Sidebar</div>} data-testid="content">
        <p>Content</p>
      </ContentSection>
    );
    expect(screen.getByTestId('content').className).toContain('hasSidebar');
  });

  it('applies custom className', () => {
    render(
      <ContentSection className="custom-content" data-testid="content">
        <p>Content</p>
      </ContentSection>
    );
    expect(screen.getByTestId('content')).toHaveClass('custom-content');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>;
    render(
      <ContentSection ref={ref}>
        <p>Content</p>
      </ContentSection>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('SECTION');
  });
});
