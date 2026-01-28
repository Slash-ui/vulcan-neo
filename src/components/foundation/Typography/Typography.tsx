import React, { forwardRef } from 'react';
import styles from './Typography.module.css';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'overline';

export type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'disabled'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'inherit';

export type TypographyAlign = 'left' | 'center' | 'right' | 'justify' | 'inherit';

type TypographyElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'label'
  | 'legend';

const variantMapping: Record<TypographyVariant, TypographyElement> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  button: 'span',
  caption: 'span',
  overline: 'span',
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /** The typography variant to use */
  variant?: TypographyVariant;
  /** The component to render as (overrides default mapping) */
  component?: TypographyElement;
  /** Text color */
  color?: TypographyColor;
  /** Text alignment */
  align?: TypographyAlign;
  /** If true, the text will not wrap and will truncate with an ellipsis */
  noWrap?: boolean;
  /** If true, the text will have a gutter (margin bottom) */
  gutterBottom?: boolean;
  /** If true, the element will be displayed as inline */
  inline?: boolean;
  /** Content to render */
  children?: React.ReactNode;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = 'body1',
      component,
      color = 'primary',
      align = 'inherit',
      noWrap = false,
      gutterBottom = false,
      inline = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = component || variantMapping[variant];

    const classNames = [
      styles.typography,
      styles[variant],
      styles[`color-${color}`],
      align !== 'inherit' && styles[`align-${align}`],
      noWrap && styles.noWrap,
      gutterBottom && styles.gutterBottom,
      inline && styles.inline,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={classNames}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';
