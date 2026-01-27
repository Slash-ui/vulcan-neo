import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Messaging, MessageBubble, MessageInput, Message } from './Messaging';
import { Surface } from '../Surface';

const meta: Meta<typeof Messaging> = {
  title: 'Organisms/Messaging',
  component: Messaging,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMessages: Message[] = [
  {
    id: 1,
    content: 'Hey! How are you doing?',
    timestamp: '10:30 AM',
    sender: { name: 'John Doe', avatar: 'https://placehold.net/40x40?text=JD' },
    position: 'left',
  },
  {
    id: 2,
    content: "I'm doing great, thanks for asking! How about you?",
    timestamp: '10:31 AM',
    position: 'right',
    status: 'read',
  },
  {
    id: 3,
    content: "Pretty good! Just finished working on the new design system. It's looking awesome!",
    timestamp: '10:32 AM',
    sender: { name: 'John Doe', avatar: 'https://placehold.net/40x40?text=JD' },
    position: 'left',
  },
  {
    id: 4,
    content: "That's amazing! Can't wait to see it. 🎉",
    timestamp: '10:33 AM',
    position: 'right',
    status: 'delivered',
  },
];

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <Messaging messages={sampleMessages} />
    </div>
  ),
};

export const SingleBubbles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 500 }}>
      <MessageBubble
        content="This is a received message"
        timestamp="10:30 AM"
        sender={{ name: 'John Doe' }}
        position="left"
      />
      <MessageBubble
        content="This is a sent message"
        timestamp="10:31 AM"
        position="right"
        status="read"
      />
    </div>
  ),
};

export const WithInput: Story = {
  render: () => {
    const [messages, setMessages] = useState<Message[]>(sampleMessages);
    const [inputValue, setInputValue] = useState('');

    const handleSend = (value: string) => {
      const newMessage: Message = {
        id: Date.now(),
        content: value,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        position: 'right',
        status: 'sent',
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    };

    return (
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <div
          style={{
            height: 400,
            overflow: 'auto',
            background: 'var(--neo-bg)',
            borderRadius: '12px',
            boxShadow: 'inset 4px 4px 8px var(--neo-shadow-dark), inset -4px -4px 8px var(--neo-shadow-light)',
          }}
        >
          <Messaging messages={messages} />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <MessageInput
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSend}
            placeholder="Type your message..."
          />
        </div>
      </div>
    );
  },
};

export const GroupChat: Story = {
  render: () => {
    const groupMessages: Message[] = [
      {
        id: 1,
        content: 'Welcome to the group! 👋',
        timestamp: '9:00 AM',
        sender: { name: 'Alice', avatar: 'https://placehold.net/40x40?text=A' },
        position: 'left',
      },
      {
        id: 2,
        content: 'Thanks for having me!',
        timestamp: '9:01 AM',
        sender: { name: 'Bob', avatar: 'https://placehold.net/40x40?text=B' },
        position: 'left',
      },
      {
        id: 3,
        content: "Let's get this project started!",
        timestamp: '9:02 AM',
        position: 'right',
        status: 'read',
      },
      {
        id: 4,
        content: "I've shared the design files in the shared folder",
        timestamp: '9:05 AM',
        sender: { name: 'Alice', avatar: 'https://placehold.net/40x40?text=A' },
        position: 'left',
      },
      {
        id: 5,
        content: 'Perfect, checking them now',
        timestamp: '9:06 AM',
        sender: { name: 'Bob', avatar: 'https://placehold.net/40x40?text=B' },
        position: 'left',
      },
    ];

    return (
      <div style={{ maxWidth: 500, margin: '0 auto' }}>
        <Messaging messages={groupMessages} />
      </div>
    );
  },
};

export const MessageStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 500, marginLeft: 'auto' }}>
      <MessageBubble
        content="Sent message"
        timestamp="10:30 AM"
        position="right"
        status="sent"
      />
      <MessageBubble
        content="Delivered message"
        timestamp="10:31 AM"
        position="right"
        status="delivered"
      />
      <MessageBubble
        content="Read message"
        timestamp="10:32 AM"
        position="right"
        status="read"
      />
    </div>
  ),
};

export const LongMessages: Story = {
  render: () => (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <MessageBubble
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
          timestamp="10:30 AM"
          sender={{ name: 'John' }}
          position="left"
        />
        <MessageBubble
          content="Got it! Thanks for the detailed explanation. I'll review this and get back to you with my thoughts. 🤔"
          timestamp="10:31 AM"
          position="right"
          status="read"
        />
      </div>
    </div>
  ),
};

export const DisabledInput: Story = {
  render: () => (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <MessageInput
        value=""
        onChange={() => {}}
        onSubmit={() => {}}
        placeholder="You cannot send messages in this chat"
        disabled
      />
    </div>
  ),
};

export const DarkTheme: Story = {
  render: () => (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <Messaging messages={sampleMessages} />
    </div>
  ),
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
