import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactSection } from './ContactSection';
import { Surface } from '../../../foundation/Surface';

const meta: Meta<typeof ContactSection> = {
  title: 'Templates/Marketing/ContactSection',
  component: ContactSection,
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

const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.97C18.51 21.29 16.13 21.02 14 20.25C11.93 19.51 10.06 18.37 8.5 16.92L7.08 15.5C5.63 13.94 4.49 12.07 3.75 10C2.98 7.87 2.71 5.49 3.03 3C3.07 2.44 3.52 2 4.08 2H7.08C7.56 2 7.97 2.34 8.06 2.81C8.21 3.58 8.44 4.33 8.75 5.05C8.94 5.5 8.83 6.02 8.47 6.36L7.29 7.54C8.52 9.6 10.4 11.48 12.46 12.71L13.64 11.53C13.98 11.17 14.5 11.06 14.95 11.25C15.67 11.56 16.42 11.79 17.19 11.94C17.66 12.03 18 12.44 18 12.92V15.92C18 16.48 17.56 16.93 17 16.97" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.03 7.03 1 12 1C16.97 1 21 5.03 21 10Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const contactInfo = [
  {
    icon: <MailIcon />,
    title: 'Email',
    description: 'hello@example.com',
    href: 'mailto:hello@example.com',
  },
  {
    icon: <PhoneIcon />,
    title: 'Phone',
    description: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: <MapPinIcon />,
    title: 'Office',
    description: '123 Main Street, San Francisco, CA 94102',
  },
];

export const Default: Story = {
  args: {
    eyebrow: 'Contact Us',
    title: "Let's get in touch",
    description:
      "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    contactInfo,
    onFormSubmit: (data) => console.log('Form submitted:', data),
  },
};

export const CenteredVariant: Story = {
  args: {
    variant: 'centered',
    eyebrow: 'Get in Touch',
    title: 'Send us a message',
    description: "We're here to help and answer any question you might have.",
    onFormSubmit: (data) => console.log('Form submitted:', data),
  },
};

export const InfoOnly: Story = {
  args: {
    variant: 'info-only',
    eyebrow: 'Contact',
    title: 'Reach out to us',
    description: 'Choose your preferred way to get in touch.',
    contactInfo,
    showForm: false,
  },
};

export const WithMap: Story = {
  args: {
    eyebrow: 'Visit Us',
    title: 'Come say hello',
    description: 'Our office is located in the heart of San Francisco.',
    contactInfo,
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0968870204776!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1234567890',
    onFormSubmit: (data) => console.log('Form submitted:', data),
  },
};

export const MinimalInfo: Story = {
  args: {
    title: 'Contact',
    description: 'Get in touch with our team.',
    contactInfo: [contactInfo[0]],
    onFormSubmit: (data) => console.log('Form submitted:', data),
  },
};

export const DarkTheme: Story = {
  args: {
    eyebrow: 'Contact',
    title: 'Get in touch',
    description: "We'd love to hear from you.",
    contactInfo,
    onFormSubmit: (data) => console.log('Form submitted:', data),
  },
  decorators: [
    (Story) => (
      <Surface theme="dark">
        <Story />
      </Surface>
    ),
  ],
};
