import React, { forwardRef, useEffect, useRef, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import styles from './CommandMenu.module.css';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  group?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface CommandMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /**
   * Whether the command menu is open
   */
  open: boolean;
  /**
   * Callback when menu should close
   */
  onClose: () => void;
  /**
   * List of command items
   */
  items: CommandItem[];
  /**
   * Callback when an item is selected
   */
  onSelect?: (item: CommandItem) => void;
  /**
   * Placeholder text for search input
   * @default 'Type a command or search...'
   */
  placeholder?: string;
  /**
   * Empty state message
   * @default 'No results found.'
   */
  emptyMessage?: string;
  /**
   * Portal container element
   */
  container?: Element;
}

/**
 * CommandMenu - Neomorphic command palette / search component
 */
export const CommandMenu = forwardRef<HTMLDivElement, CommandMenuProps>(
  (
    {
      open,
      onClose,
      items,
      onSelect,
      placeholder = 'Type a command or search...',
      emptyMessage = 'No results found.',
      container,
      className,
      ...props
    },
    ref
  ) => {
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Filter items based on search
    const filteredItems = useMemo(() => {
      if (!search) return items;
      const query = search.toLowerCase();
      return items.filter(
        (item) =>
          item.label.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.group?.toLowerCase().includes(query)
      );
    }, [items, search]);

    // Group items
    const groupedItems = useMemo(() => {
      const groups: Record<string, CommandItem[]> = {};
      filteredItems.forEach((item) => {
        const group = item.group || '';
        if (!groups[group]) groups[group] = [];
        groups[group].push(item);
      });
      return groups;
    }, [filteredItems]);

    // Flatten for keyboard navigation
    const flatItems = useMemo(() => {
      return Object.values(groupedItems).flat();
    }, [groupedItems]);

    // Reset selection when search changes
    useEffect(() => {
      setSelectedIndex(0);
    }, [search]);

    // Reset state when opened
    useEffect(() => {
      if (open) {
        setSearch('');
        setSelectedIndex(0);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }, [open]);

    // Handle escape key
    useEffect(() => {
      if (!open) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

    // Lock body scroll
    useEffect(() => {
      if (open) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }, [open]);

    const handleSelect = (item: CommandItem) => {
      if (item.disabled) return;
      item.onSelect?.();
      onSelect?.(item);
      onClose();
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex((i) => (i + 1) % flatItems.length);
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex((i) => (i - 1 + flatItems.length) % flatItems.length);
          break;
        case 'Enter':
          event.preventDefault();
          if (flatItems[selectedIndex]) {
            handleSelect(flatItems[selectedIndex]);
          }
          break;
      }
    };

    // Scroll selected item into view
    useEffect(() => {
      if (!open) return;
      const selectedElement = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
      selectedElement?.scrollIntoView({ block: 'nearest' });
    }, [selectedIndex, open]);

    const handleOverlayClick = (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    };

    const SearchIcon = () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    );

    if (!open) return null;

    let itemIndex = 0;

    const menuContent = (
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div
          ref={ref}
          className={`${styles.menu} ${className || ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Command menu"
          {...props}
        >
          <div className={styles.inputWrapper}>
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              placeholder={placeholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Search commands"
            />
            <kbd className={styles.escKey}>ESC</kbd>
          </div>

          <div ref={listRef} className={styles.list} role="listbox">
            {flatItems.length === 0 ? (
              <div className={styles.empty}>{emptyMessage}</div>
            ) : (
              Object.entries(groupedItems).map(([group, groupItems]) => (
                <div key={group} className={styles.group}>
                  {group && <div className={styles.groupLabel}>{group}</div>}
                  {groupItems.map((item) => {
                    const currentIndex = itemIndex++;
                    return (
                      <button
                        key={item.id}
                        className={`${styles.item} ${selectedIndex === currentIndex ? styles.selected : ''} ${item.disabled ? styles.disabled : ''}`}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        disabled={item.disabled}
                        role="option"
                        aria-selected={selectedIndex === currentIndex}
                        data-index={currentIndex}
                      >
                        {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                        <div className={styles.itemContent}>
                          <span className={styles.itemLabel}>{item.label}</span>
                          {item.description && (
                            <span className={styles.itemDescription}>{item.description}</span>
                          )}
                        </div>
                        {item.shortcut && (
                          <kbd className={styles.shortcut}>{item.shortcut}</kbd>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );

    return createPortal(menuContent, container || document.body);
  }
);

CommandMenu.displayName = 'CommandMenu';
