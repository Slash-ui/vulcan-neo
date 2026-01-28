import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import styles from './Dropdown.module.css';

export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

export interface DropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onSelect'> {
  /**
   * Trigger element
   */
  trigger: React.ReactNode;
  /**
   * Menu items
   */
  items: DropdownItem[];
  /**
   * Callback when an item is selected
   */
  onSelect?: (itemId: string) => void;
  /**
   * Placement of the dropdown
   * @default 'bottom-start'
   */
  placement?: DropdownPlacement;
  /**
   * Controlled open state
   */
  open?: boolean;
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
}

/**
 * Dropdown - Neomorphic generic dropdown menu
 *
 * Flexible dropdown that can be triggered by any element.
 */
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      trigger,
      items,
      onSelect,
      placement = 'bottom-start',
      open: controlledOpen,
      onOpenChange,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

    const containerRef = useRef<HTMLDivElement>(null);

    const handleOpenChange = useCallback((newOpen: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    }, [controlledOpen, onOpenChange]);

    const handleSelect = (itemId: string) => {
      onSelect?.(itemId);
      handleOpenChange(false);
    };

    // Close on outside click
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          handleOpenChange(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [handleOpenChange]);

    // Close on escape
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleOpenChange(false);
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
      }
    }, [isOpen, handleOpenChange]);

    const containerClasses = [
      styles.container,
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const menuClasses = [
      styles.menu,
      styles[placement],
    ].join(' ');

    return (
      <div ref={ref} className={containerClasses} {...props}>
        <div
          ref={containerRef}
          className={styles.wrapper}
        >
          <div
            className={styles.trigger}
            onClick={() => !disabled && handleOpenChange(!isOpen)}
          >
            {trigger}
          </div>
          {isOpen && (
            <div className={menuClasses} role="menu">
              {items.map((item, index) => {
                if (item.divider) {
                  return <div key={`divider-${index}`} className={styles.divider} />;
                }
                return (
                  <button
                    key={item.id}
                    role="menuitem"
                    className={[
                      styles.item,
                      item.disabled ? styles.itemDisabled : '',
                      item.danger ? styles.danger : '',
                    ].filter(Boolean).join(' ')}
                    onClick={() => !item.disabled && handleSelect(item.id)}
                    disabled={item.disabled}
                  >
                    {item.icon && <span className={styles.icon}>{item.icon}</span>}
                    <span className={styles.label}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';
