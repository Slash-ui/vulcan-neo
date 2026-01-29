// ============================================================================
// FOUNDATION
// ============================================================================
export { Surface } from './foundation/Surface';
export type { SurfaceProps } from './foundation/Surface';

export { Typography } from './foundation/Typography';
export type {
  TypographyProps,
  TypographyVariant,
  TypographyColor,
  TypographyAlign,
} from './foundation/Typography';

// ============================================================================
// ATOMS
// ============================================================================
export { Button } from './atoms/Button';
export type { ButtonProps, ButtonVariant, ButtonSize, ButtonElevation } from './atoms/Button';

export { InsetField } from './atoms/InsetField';
export type { InsetFieldProps, InsetFieldSize } from './atoms/InsetField';

export { Switch } from './atoms/Switch';
export type { SwitchProps, SwitchSize } from './atoms/Switch';

export { ProgressBar } from './atoms/ProgressBar';
export type { ProgressBarProps, ProgressBarSize, ProgressBarVariant } from './atoms/ProgressBar';

export { FeaturedIcon } from './atoms/FeaturedIcon';
export type {
  FeaturedIconProps,
  FeaturedIconVariant,
  FeaturedIconSize,
  FeaturedIconElevation,
  FeaturedIconColor,
  FeaturedIconShape,
} from './atoms/FeaturedIcon';

export { IconButton } from './atoms/IconButton';
export type {
  IconButtonProps,
  IconButtonVariant,
  IconButtonSize,
  IconButtonElevation,
  IconButtonShape,
} from './atoms/IconButton';

export { Badge } from './atoms/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize, BadgeColor } from './atoms/Badge';

export { Avatar } from './atoms/Avatar';
export type { AvatarProps, AvatarVariant, AvatarSize, AvatarStatus } from './atoms/Avatar';

export { SocialButton } from './atoms/SocialButton';
export type {
  SocialButtonProps,
  SocialButtonVariant,
  SocialButtonSize,
  SocialButtonElevation,
} from './atoms/SocialButton';

export { AppStoreButton } from './atoms/AppStoreButton';
export type {
  AppStoreButtonProps,
  AppStoreButtonVariant,
  AppStoreButtonSize,
  AppStoreButtonElevation,
  AppStoreButtonStore,
} from './atoms/AppStoreButton';

export { Textarea } from './atoms/Textarea';
export type { TextareaProps, TextareaSize } from './atoms/Textarea';

export { Checkbox } from './atoms/Checkbox';
export type { CheckboxProps, CheckboxSize } from './atoms/Checkbox';

export { Radio } from './atoms/Radio';
export type { RadioProps, RadioSize } from './atoms/Radio';

export { Slider } from './atoms/Slider';
export type { SliderProps, SliderSize } from './atoms/Slider';

export { Tag } from './atoms/Tag';
export type { TagProps, TagVariant, TagSize, TagColor } from './atoms/Tag';

export { Tooltip } from './atoms/Tooltip';
export type { TooltipProps, TooltipPlacement } from './atoms/Tooltip';

export { RatingStars } from './atoms/RatingStars';
export type { RatingStarsProps, RatingStarsSize } from './atoms/RatingStars';

// ============================================================================
// MOLECULES
// ============================================================================
export { Card, CardHeader, CardBody, CardFooter } from './molecules/Card';
export type {
  CardProps,
  CardElevation,
  CardVariant,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
} from './molecules/Card';

export { ButtonGroup, ButtonGroupItem } from './molecules/ButtonGroup';
export type {
  ButtonGroupProps,
  ButtonGroupItemProps,
  ButtonGroupVariant,
  ButtonGroupSize,
  ButtonGroupElevation,
  ButtonGroupOrientation,
} from './molecules/ButtonGroup';

export { RadioGroup, RadioGroupItem } from './molecules/RadioGroup';
export type {
  RadioGroupProps,
  RadioGroupItemProps,
  RadioGroupSize,
  RadioGroupOrientation,
} from './molecules/RadioGroup';

export { VerificationCodeInput } from './molecules/VerificationCodeInput';
export type { VerificationCodeInputProps, VerificationCodeInputSize } from './molecules/VerificationCodeInput';

export { Select } from './molecules/Select';
export type { SelectProps, SelectOption, SelectSize } from './molecules/Select';

export { Dropdown } from './molecules/Dropdown';
export type { DropdownProps, DropdownItem, DropdownPlacement } from './molecules/Dropdown';

export { BadgeGroup } from './molecules/BadgeGroup';
export type { BadgeGroupProps, BadgeGroupSize } from './molecules/BadgeGroup';

export { Breadcrumbs, BreadcrumbItem } from './molecules/Breadcrumbs';
export type { BreadcrumbsProps, BreadcrumbItemProps } from './molecules/Breadcrumbs';

export { Tabs, TabList, Tab, TabPanel } from './molecules/Tabs';
export type { TabsProps, TabListProps, TabProps, TabPanelProps, TabsVariant, TabsSize } from './molecules/Tabs';

export { Pagination } from './molecules/Pagination';
export type { PaginationProps, PaginationSize } from './molecules/Pagination';

export { Alert } from './molecules/Alert';
export type { AlertProps, AlertVariant } from './molecules/Alert';

export { Notification } from './molecules/Notification';
export type { NotificationProps, NotificationVariant, NotificationPosition } from './molecules/Notification';

export { LoadingIndicator, Skeleton } from './molecules/LoadingIndicator';
export type { LoadingIndicatorProps, LoadingSize, LoadingVariant, SkeletonProps } from './molecules/LoadingIndicator';

export { EmptyState } from './molecules/EmptyState';
export type { EmptyStateProps, EmptyStateSize } from './molecules/EmptyState';

export { ProgressSteps } from './molecules/ProgressSteps';
export type { ProgressStepsProps, ProgressStepsSize, ProgressStepsOrientation, Step } from './molecules/ProgressSteps';

export { Calendar } from './molecules/Calendar';
export type { CalendarProps } from './molecules/Calendar';

export { DatePicker } from './molecules/DatePicker';
export type { DatePickerProps, DatePickerSize } from './molecules/DatePicker';

export { FileUploader } from './molecules/FileUploader';
export type { FileUploaderProps, UploadedFile } from './molecules/FileUploader';

export { CodeSnippet } from './molecules/CodeSnippet';
export type { CodeSnippetProps, CodeSnippetSize } from './molecules/CodeSnippet';

export { InlineCTA } from './molecules/InlineCTA';
export type { InlineCTAProps, InlineCTAVariant } from './molecules/InlineCTA';

export { Banner } from './molecules/Banner';
export type { BannerProps, BannerVariant, BannerPosition } from './molecules/Banner';

export { RichTextEditor } from './molecules/RichTextEditor';
export type {
  RichTextEditorProps,
  RichTextEditorSize,
  RichTextEditorRef,
} from './molecules/RichTextEditor';

// --- CHARTS ---
export { LineChart } from './molecules/charts/LineChart';
export type { LineChartProps, LineChartDataPoint, LineChartSeries } from './molecules/charts/LineChart';

export { BarChart } from './molecules/charts/BarChart';
export type { BarChartProps, BarChartDataPoint } from './molecules/charts/BarChart';

export { PieChart } from './molecules/charts/PieChart';
export type { PieChartProps, PieChartDataPoint } from './molecules/charts/PieChart';

// ============================================================================
// ORGANISMS
// ============================================================================
export { Table } from './organisms/Table';
export type { TableProps, TableVariant, TableSize, Column } from './organisms/Table';

export { Metrics, MetricCard } from './organisms/Metrics';
export type { MetricsProps, MetricCardProps, MetricItem, MetricsSize, MetricsTrend } from './organisms/Metrics';

export { ActivityFeed } from './organisms/ActivityFeed';
export type { ActivityFeedProps, ActivityFeedSize, ActivityItem } from './organisms/ActivityFeed';

export { SidebarNavigation, SidebarNavGroup, SidebarNavItem } from './organisms/SidebarNavigation';
export type {
  SidebarNavigationProps,
  SidebarNavGroupProps,
  SidebarNavItemProps,
  SidebarSize,
} from './organisms/SidebarNavigation';

export { HeaderNavigation, HeaderNavItem, HeaderNavGroup } from './organisms/HeaderNavigation';
export type { HeaderNavigationProps, HeaderNavItemProps, HeaderNavGroupProps, HeaderSize } from './organisms/HeaderNavigation';

export { Modal } from './organisms/Modal';
export type { ModalProps, ModalSize } from './organisms/Modal';

export { SlideoutMenu } from './organisms/SlideoutMenu';
export type { SlideoutMenuProps, SlideoutPosition, SlideoutSize } from './organisms/SlideoutMenu';

export { CommandMenu } from './organisms/CommandMenu';
export type { CommandMenuProps, CommandItem } from './organisms/CommandMenu';

export { Carousel } from './organisms/Carousel';
export type { CarouselProps, CarouselSize } from './organisms/Carousel';

export { Messaging, MessageBubble, MessageInput } from './organisms/Messaging';
export type {
  MessagingProps,
  MessageBubbleProps,
  MessageInputProps,
  Message,
  MessagePosition,
} from './organisms/Messaging';

// ============================================================================
// TEMPLATES
// ============================================================================
export { ErrorPage } from './templates/ErrorPage';
export type { ErrorPageProps, ErrorPageVariant, ErrorPageSize } from './templates/ErrorPage';

export { PageHeader } from './templates/PageHeader';

export { SectionHeader } from './templates/SectionHeader';

export { SectionFooter } from './templates/SectionFooter';

export { ContentDivider } from './templates/ContentDivider';

// --- MARKETING ---
export { MarketingHeader } from './templates/marketing/MarketingHeader';
export type { MarketingHeaderProps, MarketingNavItem } from './templates/marketing/MarketingHeader';

export { HeroSection } from './templates/marketing/HeroSection';
export type { HeroSectionProps, HeroSectionVariant, HeroSectionSize } from './templates/marketing/HeroSection';

export { FeaturesSection } from './templates/marketing/FeaturesSection';
export type { FeaturesSectionProps, FeaturesSectionLayout, FeatureItem } from './templates/marketing/FeaturesSection';

export { PricingSection } from './templates/marketing/PricingSection';
export type { PricingSectionProps, PricingPlan, PricingFeature } from './templates/marketing/PricingSection';

export { CTASection } from './templates/marketing/CTASection';
export type { CTASectionProps, CTASectionVariant } from './templates/marketing/CTASection';

export { StatsSection } from './templates/marketing/StatsSection';
export type { StatsSectionProps, StatItem } from './templates/marketing/StatsSection';

export { NewsletterSection } from './templates/marketing/NewsletterSection';
export type { NewsletterSectionProps, NewsletterSectionVariant } from './templates/marketing/NewsletterSection';

export { TestimonialSection } from './templates/marketing/TestimonialSection';
export type { TestimonialSectionProps, Testimonial } from './templates/marketing/TestimonialSection';

export { LogoCloudSection } from './templates/marketing/LogoCloudSection';
export type { LogoCloudSectionProps, LogoItem } from './templates/marketing/LogoCloudSection';

export { BlogSection } from './templates/marketing/BlogSection';
export type { BlogSectionProps, BlogPost } from './templates/marketing/BlogSection';

export { ContactSection } from './templates/marketing/ContactSection';
export type { ContactSectionProps, ContactInfo } from './templates/marketing/ContactSection';

export { TeamSection } from './templates/marketing/TeamSection';
export type { TeamSectionProps, TeamMember } from './templates/marketing/TeamSection';

export { CareersSection } from './templates/marketing/CareersSection';
export type { CareersSectionProps, JobPosition } from './templates/marketing/CareersSection';

export { FAQSection } from './templates/marketing/FAQSection';
export type { FAQSectionProps, FAQItem } from './templates/marketing/FAQSection';

export { ContentSection } from './templates/marketing/ContentSection';
export type { ContentSectionProps } from './templates/marketing/ContentSection';

export { Footer } from './templates/marketing/Footer';
export type { FooterProps, FooterLink, FooterLinkGroup, FooterSocialLink } from './templates/marketing/Footer';
