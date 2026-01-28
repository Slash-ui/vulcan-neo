import type { Meta, StoryObj } from '@storybook/react';
import { FAQSection } from './FAQSection';
import { Surface } from '../Surface';

const meta: Meta<typeof FAQSection> = {
  title: 'Marketing/FAQSection',
  component: FAQSection,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light">
        <Story />
      </Surface>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const faqItems = [
  {
    question: 'How does the free trial work?',
    answer:
      'Our free trial gives you full access to all features for 14 days. No credit card required. At the end of the trial, you can choose a plan that fits your needs.',
  },
  {
    question: 'Can I cancel my subscription at any time?',
    answer:
      "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your access will continue until the end of your billing period.",
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. We use bank-level encryption to protect your data. All data is encrypted both in transit and at rest. We also perform regular security audits and penetration testing.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "We offer a 30-day money-back guarantee. If you're not satisfied with our product, contact our support team within 30 days of purchase for a full refund.",
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. For enterprise customers, we also offer invoicing.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer:
      "Yes, you can change your plan at any time. When upgrading, you'll be prorated for the remaining time. When downgrading, the change will take effect at the start of your next billing cycle.",
  },
];

export const Default: Story = {
  args: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    description:
      "Can't find the answer you're looking for? Contact our support team.",
    items: faqItems,
  },
};

export const AllowMultiple: Story = {
  args: {
    title: 'Common Questions',
    items: faqItems,
    allowMultiple: true,
  },
};

export const GridLayout: Story = {
  args: {
    eyebrow: 'Help Center',
    title: 'Questions & Answers',
    items: faqItems,
    variant: 'grid',
  },
};

export const TwoColumnLayout: Story = {
  args: {
    title: 'FAQ',
    description: 'Everything you need to know about our product.',
    items: faqItems,
    variant: 'two-column',
  },
};

export const ShortList: Story = {
  args: {
    title: 'Quick Answers',
    items: faqItems.slice(0, 3),
  },
};

export const DarkTheme: Story = {
  args: {
    eyebrow: 'FAQ',
    title: 'Got questions?',
    description: "We've got answers.",
    items: faqItems,
  },
  decorators: [
    (Story) => (
      <Surface theme="dark">
        <Story />
      </Surface>
    ),
  ],
};
