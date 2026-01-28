import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel } from './Carousel';
import { Surface } from '../../foundation/Surface';

const meta: Meta<typeof Carousel> = {
  title: 'Organisms/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '4rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showArrows: {
      control: 'boolean',
    },
    showDots: {
      control: 'boolean',
    },
    loop: {
      control: 'boolean',
    },
    autoPlay: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SlideContent = ({ color, text }: { color: string; text: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      background: color,
      color: 'white',
      fontSize: '2rem',
      fontWeight: 'bold',
      borderRadius: '8px',
    }}
  >
    {text}
  </div>
);

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Carousel>
        <SlideContent color="#6C5CE7" text="Slide 1" />
        <SlideContent color="#00B894" text="Slide 2" />
        <SlideContent color="#E17055" text="Slide 3" />
        <SlideContent color="#0984E3" text="Slide 4" />
      </Carousel>
    </div>
  ),
};

export const WithImages: Story = {
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Carousel>
        <img src="https://placehold.net/600x300?text=Image+1" alt="Slide 1" />
        <img src="https://placehold.net/600x300?text=Image+2" alt="Slide 2" />
        <img src="https://placehold.net/600x300?text=Image+3" alt="Slide 3" />
      </Carousel>
    </div>
  ),
};

export const WithLoop: Story = {
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Carousel loop>
        <SlideContent color="#6C5CE7" text="Slide 1" />
        <SlideContent color="#00B894" text="Slide 2" />
        <SlideContent color="#E17055" text="Slide 3" />
      </Carousel>
    </div>
  ),
};

export const AutoPlay: Story = {
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Carousel autoPlay={3000} loop>
        <SlideContent color="#6C5CE7" text="Slide 1" />
        <SlideContent color="#00B894" text="Slide 2" />
        <SlideContent color="#E17055" text="Slide 3" />
      </Carousel>
    </div>
  ),
};

export const WithoutArrows: Story = {
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Carousel showArrows={false}>
        <SlideContent color="#6C5CE7" text="Slide 1" />
        <SlideContent color="#00B894" text="Slide 2" />
        <SlideContent color="#E17055" text="Slide 3" />
      </Carousel>
    </div>
  ),
};

export const WithoutDots: Story = {
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Carousel showDots={false}>
        <SlideContent color="#6C5CE7" text="Slide 1" />
        <SlideContent color="#00B894" text="Slide 2" />
        <SlideContent color="#E17055" text="Slide 3" />
      </Carousel>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <p style={{ marginBottom: '1rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Small</p>
        <div style={{ maxWidth: 400 }}>
          <Carousel size="sm">
            <SlideContent color="#6C5CE7" text="1" />
            <SlideContent color="#00B894" text="2" />
            <SlideContent color="#E17055" text="3" />
          </Carousel>
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '1rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Medium</p>
        <div style={{ maxWidth: 500 }}>
          <Carousel size="md">
            <SlideContent color="#6C5CE7" text="1" />
            <SlideContent color="#00B894" text="2" />
            <SlideContent color="#E17055" text="3" />
          </Carousel>
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '1rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Large</p>
        <div style={{ maxWidth: 600 }}>
          <Carousel size="lg">
            <SlideContent color="#6C5CE7" text="1" />
            <SlideContent color="#00B894" text="2" />
            <SlideContent color="#E17055" text="3" />
          </Carousel>
        </div>
      </div>
    </div>
  ),
};

export const TestimonialCarousel: Story = {
  render: () => {
    const testimonials = [
      { name: 'John Doe', role: 'CEO', text: 'This product has transformed our workflow completely.' },
      { name: 'Jane Smith', role: 'Designer', text: 'Beautiful design system that saved us countless hours.' },
      { name: 'Bob Johnson', role: 'Developer', text: 'Easy to implement and customize. Highly recommended!' },
    ];

    return (
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <Carousel>
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: '1.25rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                "{t.text}"
              </p>
              <p style={{ fontWeight: 600 }}>{t.name}</p>
              <p style={{ color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>{t.role}</p>
            </div>
          ))}
        </Carousel>
      </div>
    );
  },
};

export const DarkTheme: Story = {
  render: () => (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Carousel loop>
        <SlideContent color="#6C5CE7" text="Slide 1" />
        <SlideContent color="#00B894" text="Slide 2" />
        <SlideContent color="#E17055" text="Slide 3" />
      </Carousel>
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '4rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
