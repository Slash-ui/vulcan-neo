import React, { forwardRef, useState, createContext, useContext } from 'react';
import { X } from 'lucide-react';
import { Typography } from '../../foundation/Typography';
import { IconButton } from '../../atoms/IconButton';
import { FeaturedIcon, FeaturedIconShape, FeaturedIconElevation, FeaturedIconSize } from '../../atoms/FeaturedIcon';
import styles from './Banner.module.css';

export type BannerVariant = 'convex' | 'flat' | 'concave';
export type BannerColor =
  | 'default'
  | 'primary'
  | 'primary-light'
  | 'primary-dark'
  | 'secondary'
  | 'secondary-light'
  | 'secondary-dark'
  | 'tertiary'
  | 'tertiary-light'
  | 'tertiary-dark'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type BannerSize = 'sm' | 'md' | 'lg';
export type BannerPosition = 'top' | 'bottom';
export type BannerTextAlign = 'left' | 'center';

// Context to provide banner color to child components
interface BannerContextValue {
  color: BannerColor;
}

const BannerContext = createContext<BannerContextValue | null>(null);

/**
 * Hook to access the current banner's color from child components.
 * Returns the banner color if inside a Banner, or null if not.
 */
export const useBannerColor = (): BannerColor | null => {
  const context = useContext(BannerContext);
  return context?.color ?? null;
};

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Banner title
   */
  title?: string;
  /**
   * Banner description/message
   */
  description?: string;
  /**
   * The visual variant of the banner
   * - convex: Raised appearance with outer shadow
   * - flat: No shadow, minimal style
   * - concave: Pressed appearance with inner shadow
   * @default 'convex'
   */
  variant?: BannerVariant;
  /**
   * The color theme of the banner
   * @default 'default'
   */
  color?: BannerColor;
  /**
   * Size variant
   * @default 'md'
   */
  size?: BannerSize;
  /**
   * Whether the banner is sticky (fixed position)
   * @default false
   */
  sticky?: boolean;
  /**
   * Position when sticky (top or bottom)
   * @default 'top'
   */
  position?: BannerPosition;
  /**
   * Text alignment
   * @default 'center'
   */
  textAlign?: BannerTextAlign;
  /**
   * Icon to display on the left
   */
  icon?: React.ReactNode;
  /**
   * The visual variant of the icon
   * - convex: Raised appearance with outer shadow
   * - flat: No shadow, minimal style
   * - concave: Pressed appearance with inner shadow
   * @default 'flat'
   */
  iconVariant?: BannerVariant;
  /**
   * The shape of the icon container
   * @default 'rounded'
   */
  iconShape?: FeaturedIconShape;
  /**
   * The elevation level of the icon shadow
   * @default 'low'
   */
  iconElevation?: FeaturedIconElevation;
  /**
   * The size of the icon container. If not specified, derives from banner size.
   */
  iconSize?: FeaturedIconSize;
  /**
   * Custom content to display before actions (e.g., InsetField)
   */
  beforeActions?: React.ReactNode;
  /**
   * Primary action button
   */
  primaryAction?: React.ReactNode;
  /**
   * Secondary action button
   */
  secondaryAction?: React.ReactNode;
  /**
   * Show close button
   * @default false
   */
  dismissible?: boolean;
  /**
   * Close button click handler
   */
  onDismiss?: () => void;
  /**
   * Banner content (alternative to title/description)
   */
  children?: React.ReactNode;
}

/**
 * Banner - Displays an important, succinct message with optional actions
 *
 * Banners can be displayed at the top or bottom of the screen.
 * Only one banner should be shown at a time.
 */
// Helper to inject color, shadowColor, and elevation props into Button elements
const injectButtonProps = (
  element: React.ReactNode,
  bannerColor: BannerColor
): React.ReactNode => {
  if (!React.isValidElement(element)) {
    return element;
  }

  const elementProps = element.props as Record<string, unknown>;
  const newProps: Record<string, unknown> = {};

  // Always inject elevation="low" for banner buttons unless explicitly set
  if (elementProps.elevation === undefined) {
    newProps.elevation = 'low';
  }

  // Inject color and shadowColor only if banner has a color (not default)
  if (bannerColor !== 'default') {
    if (elementProps.color === undefined) {
      newProps.color = bannerColor;
    }

    if (elementProps.shadowColor === undefined) {
      newProps.shadowColor = bannerColor;
    }
  }

  // If no props to inject, return original element
  if (Object.keys(newProps).length === 0) {
    return element;
  }

  return React.cloneElement(element, newProps);
};

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      title,
      description,
      variant = 'convex',
      color = 'default',
      size = 'md',
      sticky = false,
      position = 'top',
      textAlign = 'center',
      icon,
      iconVariant = 'flat',
      iconShape = 'rounded',
      iconElevation = 'low',
      iconSize,
      beforeActions,
      primaryAction,
      secondaryAction,
      dismissible = false,
      onDismiss,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const handleDismiss = () => {
      setVisible(false);
      onDismiss?.();
    };

    const classNames = [
      styles.banner,
      styles[variant],
      styles[`color-${color}`],
      styles[size],
      sticky && styles.sticky,
      sticky && styles[`position-${position}`],
      styles[`text-${textAlign}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const hasActions = beforeActions || primaryAction || secondaryAction;
    const hasRightSection = hasActions || dismissible;

    // Inject color props into action buttons
    const styledPrimaryAction = injectButtonProps(primaryAction, color);
    const styledSecondaryAction = injectButtonProps(secondaryAction, color);

    // Map banner size to FeaturedIcon size
    const featuredIconSizeMap: Record<BannerSize, FeaturedIconSize> = {
      sm: 'md',
      md: 'lg',
      lg: 'xl',
    };
    const resolvedIconSize = iconSize ?? featuredIconSizeMap[size];

    // FeaturedIcon should inherit the banner's background (for colored banners) and text color
    const isColored = color !== 'default';
    const iconStyle: React.CSSProperties = {
      color: 'inherit',
      ...(isColored && { background: 'inherit' }),
    };

    return (
      <BannerContext.Provider value={{ color }}>
        <div ref={ref} className={classNames} role="banner" {...props}>
          {/* Left Section - Icon */}
          {icon && (
            <FeaturedIcon
              variant={iconVariant}
              size={resolvedIconSize}
              elevation={iconElevation}
              shape={iconShape}
              style={iconStyle}
              className={styles.iconContainer}
            >
              {icon}
            </FeaturedIcon>
          )}

          {/* Content Section - Title, Description, Children */}
          <div className={styles.contentSection}>
            {title && (
              <Typography variant="h6" className={styles.title} component="p">
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant="body2" className={styles.description} component="p">
                {description}
              </Typography>
            )}
            {children && (
              <div className={styles.childrenContent}>
                {children}
              </div>
            )}
          </div>

          {/* Right Section - Actions & Dismiss */}
          {hasRightSection && (
            <div className={styles.rightSection}>
              {beforeActions}
              {styledSecondaryAction}
              {styledPrimaryAction}
              {dismissible && (
                <IconButton
                  icon={<X size={16} />}
                  variant="flat"
                  size="sm"
                  className={styles.dismissButton}
                  onClick={handleDismiss}
                  aria-label="Dismiss banner"
                />
              )}
            </div>
          )}
        </div>
      </BannerContext.Provider>
    );
  }
);

Banner.displayName = 'Banner';
