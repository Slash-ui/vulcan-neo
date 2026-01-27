import React, { forwardRef, createContext, useContext, useState, useId } from 'react';
import styles from './Tabs.module.css';

export type TabsVariant = 'line' | 'pills' | 'enclosed';
export type TabsSize = 'sm' | 'md' | 'lg';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: TabsVariant;
  size: TabsSize;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Currently active tab value
   */
  value?: string;
  /**
   * Default active tab (uncontrolled)
   */
  defaultValue?: string;
  /**
   * Callback when tab changes
   */
  onChange?: (value: string) => void;
  /**
   * Visual variant
   * @default 'line'
   */
  variant?: TabsVariant;
  /**
   * Size of the tabs
   * @default 'md'
   */
  size?: TabsSize;
  /**
   * Children (TabList and TabPanels)
   */
  children: React.ReactNode;
}

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Unique value for this tab
   */
  value: string;
  /**
   * Icon before label
   */
  icon?: React.ReactNode;
  /**
   * Tab content
   */
  children: React.ReactNode;
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Value matching the Tab
   */
  value: string;
  /**
   * Panel content
   */
  children: React.ReactNode;
}

/**
 * TabList - Container for Tab components
 */
export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ children, className, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabList must be used within Tabs');

    const classNames = [
      styles.tabList,
      styles[`list-${context.variant}`],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} role="tablist" className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

TabList.displayName = 'TabList';

/**
 * Tab - Individual tab button
 */
export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ value, icon, children, className, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error('Tab must be used within Tabs');

    const isActive = context.activeTab === value;
    const id = useId();

    const classNames = [
      styles.tab,
      styles[context.variant],
      styles[context.size],
      isActive ? styles.active : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        role="tab"
        id={`tab-${id}`}
        aria-selected={isActive}
        aria-controls={`panel-${id}`}
        tabIndex={isActive ? 0 : -1}
        className={classNames}
        onClick={() => context.setActiveTab(value)}
        {...props}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.label}>{children}</span>
      </button>
    );
  }
);

Tab.displayName = 'Tab';

/**
 * TabPanel - Content panel for a tab
 */
export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ value, children, className, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabPanel must be used within Tabs');

    const isActive = context.activeTab === value;
    const id = useId();

    if (!isActive) return null;

    const classNames = [
      styles.tabPanel,
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`panel-${id}`}
        aria-labelledby={`tab-${id}`}
        className={classNames}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabPanel.displayName = 'TabPanel';

/**
 * Tabs - Neomorphic tabbed interface
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      variant = 'line',
      size = 'md',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const activeTab = value !== undefined ? value : internalValue;

    const setActiveTab = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const classNames = [
      styles.tabs,
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab, variant, size }}>
        <div ref={ref} className={classNames} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';
