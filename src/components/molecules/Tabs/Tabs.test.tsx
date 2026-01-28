import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

describe('Tabs', () => {
  const renderTabs = (props = {}) => {
    return render(
      <Tabs defaultValue="tab1" {...props}>
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
          <Tab value="tab3">Tab 3</Tab>
        </TabList>
        <TabPanel value="tab1">Content 1</TabPanel>
        <TabPanel value="tab2">Content 2</TabPanel>
        <TabPanel value="tab3">Content 3</TabPanel>
      </Tabs>
    );
  };

  it('renders tabs correctly', () => {
    renderTabs();
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('renders tablist with correct role', () => {
    renderTabs();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders tabs with correct role', () => {
    renderTabs();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('shows first tab panel by default', () => {
    renderTabs();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('hides inactive tab panels', () => {
    renderTabs();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  it('switches tabs on click', () => {
    renderTabs();
    fireEvent.click(screen.getByText('Tab 2'));
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('calls onChange when tab changes', () => {
    const handleChange = vi.fn();
    renderTabs({ onChange: handleChange });
    fireEvent.click(screen.getByText('Tab 2'));
    expect(handleChange).toHaveBeenCalledWith('tab2');
  });

  it('works in controlled mode', () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <Tabs value="tab1" onChange={handleChange}>
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
        </TabList>
        <TabPanel value="tab1">Content 1</TabPanel>
        <TabPanel value="tab2">Content 2</TabPanel>
      </Tabs>
    );
    expect(screen.getByText('Content 1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Tab 2'));
    expect(handleChange).toHaveBeenCalledWith('tab2');

    rerender(
      <Tabs value="tab2" onChange={handleChange}>
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
        </TabList>
        <TabPanel value="tab1">Content 1</TabPanel>
        <TabPanel value="tab2">Content 2</TabPanel>
      </Tabs>
    );
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('sets aria-selected on active tab', () => {
    renderTabs();
    const tab1 = screen.getByText('Tab 1').closest('button');
    const tab2 = screen.getByText('Tab 2').closest('button');
    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab2).toHaveAttribute('aria-selected', 'false');
  });

  it('sets tabIndex correctly', () => {
    renderTabs();
    const tab1 = screen.getByText('Tab 1').closest('button');
    const tab2 = screen.getByText('Tab 2').closest('button');
    expect(tab1).toHaveAttribute('tabIndex', '0');
    expect(tab2).toHaveAttribute('tabIndex', '-1');
  });

  it('renders tabpanel with correct role', () => {
    renderTabs();
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('applies variant classes - line', () => {
    renderTabs({ variant: 'line' });
    const tabList = screen.getByRole('tablist');
    expect(tabList.className).toContain('list-line');
  });

  it('applies variant classes - pills', () => {
    renderTabs({ variant: 'pills' });
    const tabList = screen.getByRole('tablist');
    expect(tabList.className).toContain('list-pills');
  });

  it('applies variant classes - enclosed', () => {
    renderTabs({ variant: 'enclosed' });
    const tabList = screen.getByRole('tablist');
    expect(tabList.className).toContain('list-enclosed');
  });

  it('applies size classes to tabs', () => {
    renderTabs({ size: 'sm' });
    const tab = screen.getByText('Tab 1').closest('button');
    expect(tab?.className).toContain('sm');
  });

  it('renders icon in tab when provided', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabList>
          <Tab value="tab1" icon={<span data-testid="icon">★</span>}>Tab 1</Tab>
        </TabList>
        <TabPanel value="tab1">Content</TabPanel>
      </Tabs>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies custom className to Tabs', () => {
    renderTabs({ className: 'custom-tabs' });
    expect(document.querySelector('.custom-tabs')).toBeInTheDocument();
  });

  it('applies custom className to TabList', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabList className="custom-tablist">
          <Tab value="tab1">Tab 1</Tab>
        </TabList>
        <TabPanel value="tab1">Content</TabPanel>
      </Tabs>
    );
    expect(screen.getByRole('tablist')).toHaveClass('custom-tablist');
  });

  it('applies custom className to Tab', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabList>
          <Tab value="tab1" className="custom-tab">Tab 1</Tab>
        </TabList>
        <TabPanel value="tab1">Content</TabPanel>
      </Tabs>
    );
    expect(screen.getByRole('tab')).toHaveClass('custom-tab');
  });

  it('applies custom className to TabPanel', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
        </TabList>
        <TabPanel value="tab1" className="custom-panel">Content</TabPanel>
      </Tabs>
    );
    expect(screen.getByRole('tabpanel')).toHaveClass('custom-panel');
  });

  it('throws error when Tab used outside Tabs', () => {
    expect(() => {
      render(<Tab value="tab1">Tab 1</Tab>);
    }).toThrow('Tab must be used within Tabs');
  });

  it('throws error when TabList used outside Tabs', () => {
    expect(() => {
      render(<TabList><Tab value="tab1">Tab 1</Tab></TabList>);
    }).toThrow('TabList must be used within Tabs');
  });

  it('throws error when TabPanel used outside Tabs', () => {
    expect(() => {
      render(<TabPanel value="tab1">Content</TabPanel>);
    }).toThrow('TabPanel must be used within Tabs');
  });

  it('forwards ref to Tabs', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <Tabs ref={ref} defaultValue="tab1">
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
        </TabList>
        <TabPanel value="tab1">Content</TabPanel>
      </Tabs>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards ref to TabList', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <Tabs defaultValue="tab1">
        <TabList ref={ref}>
          <Tab value="tab1">Tab 1</Tab>
        </TabList>
        <TabPanel value="tab1">Content</TabPanel>
      </Tabs>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards ref to Tab', () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement>;
    render(
      <Tabs defaultValue="tab1">
        <TabList>
          <Tab ref={ref} value="tab1">Tab 1</Tab>
        </TabList>
        <TabPanel value="tab1">Content</TabPanel>
      </Tabs>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('forwards ref to TabPanel', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(
      <Tabs defaultValue="tab1">
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
        </TabList>
        <TabPanel ref={ref} value="tab1">Content</TabPanel>
      </Tabs>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
