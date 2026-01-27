import React, { forwardRef, useState } from 'react';
import styles from './CodeSnippet.module.css';

export type CodeSnippetSize = 'sm' | 'md' | 'lg';

export interface CodeSnippetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onCopy'> {
  /**
   * Code content
   */
  code: string;
  /**
   * Language for syntax highlighting hint
   */
  language?: string;
  /**
   * Title/filename
   */
  title?: string;
  /**
   * Whether to show line numbers
   * @default true
   */
  showLineNumbers?: boolean;
  /**
   * Whether to show copy button
   * @default true
   */
  showCopyButton?: boolean;
  /**
   * Size variant
   * @default 'md'
   */
  size?: CodeSnippetSize;
  /**
   * Maximum height before scrolling
   */
  maxHeight?: string | number;
  /**
   * Highlight specific lines (1-indexed)
   */
  highlightLines?: number[];
  /**
   * Callback when code is copied
   */
  onCopy?: (code: string) => void;
}

/**
 * CodeSnippet - Neomorphic code display component
 */
export const CodeSnippet = forwardRef<HTMLDivElement, CodeSnippetProps>(
  (
    {
      code,
      language,
      title,
      showLineNumbers = true,
      showCopyButton = true,
      size = 'md',
      maxHeight,
      highlightLines = [],
      onCopy,
      className,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false);

    const lines = code.split('\n');

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        onCopy?.(code);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    const classNames = [
      styles.codeSnippet,
      styles[size],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const CopyIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    );

    const CheckIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );

    return (
      <div ref={ref} className={classNames} {...props}>
        {(title || showCopyButton) && (
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.dots}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </span>
              {title && <span className={styles.title}>{title}</span>}
            </div>
            <div className={styles.headerRight}>
              {language && <span className={styles.language}>{language}</span>}
              {showCopyButton && (
                <button
                  className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
                  onClick={handleCopy}
                  aria-label={copied ? 'Copied!' : 'Copy code'}
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
          </div>
        )}

        <div
          className={styles.codeContainer}
          style={{ maxHeight }}
        >
          <pre className={styles.pre}>
            <code className={styles.code}>
              {lines.map((line, index) => {
                const lineNumber = index + 1;
                const isHighlighted = highlightLines.includes(lineNumber);

                return (
                  <div
                    key={index}
                    className={`${styles.line} ${isHighlighted ? styles.highlighted : ''}`}
                  >
                    {showLineNumbers && (
                      <span className={styles.lineNumber}>{lineNumber}</span>
                    )}
                    <span className={styles.lineContent}>{line || ' '}</span>
                  </div>
                );
              })}
            </code>
          </pre>
        </div>
      </div>
    );
  }
);

CodeSnippet.displayName = 'CodeSnippet';
