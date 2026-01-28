import React, { forwardRef } from 'react';
import styles from './Messaging.module.css';

export type MessagePosition = 'left' | 'right';

export interface Message {
  id: string | number;
  content: React.ReactNode;
  timestamp: string;
  sender?: {
    name: string;
    avatar?: string;
  };
  position?: MessagePosition;
  status?: 'sent' | 'delivered' | 'read';
}

export interface MessagingProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Messages to display
   */
  messages: Message[];
  /**
   * Current user ID (messages from this user will be on the right)
   */
  currentUserId?: string;
}

export interface MessageBubbleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  /**
   * Message content
   */
  content: React.ReactNode;
  /**
   * Timestamp
   */
  timestamp?: string;
  /**
   * Sender info
   */
  sender?: {
    name: string;
    avatar?: string;
  };
  /**
   * Position (left = received, right = sent)
   * @default 'left'
   */
  position?: MessagePosition;
  /**
   * Message status
   */
  status?: 'sent' | 'delivered' | 'read';
  /**
   * Show avatar
   * @default true
   */
  showAvatar?: boolean;
}

export interface MessageInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit' | 'onChange'> {
  /**
   * Input value
   */
  value: string;
  /**
   * Callback when value changes
   */
  onChange: (value: string) => void;
  /**
   * Callback when message is submitted
   */
  onSubmit: (value: string) => void;
  /**
   * Placeholder text
   * @default 'Type a message...'
   */
  placeholder?: string;
  /**
   * Disabled state
   */
  disabled?: boolean;
}

/**
 * MessageBubble - Single message bubble
 */
export const MessageBubble = forwardRef<HTMLDivElement, MessageBubbleProps>(
  (
    {
      content,
      timestamp,
      sender,
      position = 'left',
      status,
      showAvatar = true,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.bubble,
      styles[position],
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const StatusIcon = () => {
      if (status === 'read') {
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L9 17l-5-5" />
            <path d="M22 6L13 17" />
          </svg>
        );
      }
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    };

    return (
      <div ref={ref} className={classNames} {...props}>
        {showAvatar && position === 'left' && (
          <div className={styles.avatar}>
            {sender?.avatar ? (
              <img src={sender.avatar} alt={sender.name} />
            ) : (
              <span>{sender?.name?.charAt(0) || '?'}</span>
            )}
          </div>
        )}

        <div className={styles.bubbleContent}>
          {sender?.name && position === 'left' && (
            <span className={styles.senderName}>{sender.name}</span>
          )}
          <div className={styles.message}>{content}</div>
          <div className={styles.meta}>
            {timestamp && <span className={styles.timestamp}>{timestamp}</span>}
            {status && position === 'right' && (
              <span className={`${styles.status} ${styles[status]}`}>
                <StatusIcon />
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

MessageBubble.displayName = 'MessageBubble';

/**
 * MessageInput - Message input field
 */
export const MessageInput = forwardRef<HTMLDivElement, MessageInputProps>(
  (
    {
      value,
      onChange,
      onSubmit,
      placeholder = 'Type a message...',
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (value.trim()) {
          onSubmit(value);
        }
      }
    };

    const SendIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    );

    return (
      <div ref={ref} className={`${styles.inputWrapper} ${className || ''}`} {...props}>
        <input
          type="text"
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
        />
        <button
          className={styles.sendButton}
          onClick={() => value.trim() && onSubmit(value)}
          disabled={disabled || !value.trim()}
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </div>
    );
  }
);

MessageInput.displayName = 'MessageInput';

/**
 * Messaging - Neomorphic messaging/chat component
 */
export const Messaging = forwardRef<HTMLDivElement, MessagingProps>(
  (
    {
      messages,
      // currentUserId can be used for future message positioning logic
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={`${styles.messaging} ${className || ''}`} {...props}>
        {messages.map((message, index) => {
          const prevMessage = messages[index - 1];
          const showAvatar = !prevMessage || prevMessage.sender?.name !== message.sender?.name;

          return (
            <MessageBubble
              key={message.id}
              content={message.content}
              timestamp={message.timestamp}
              sender={message.sender}
              position={message.position}
              status={message.status}
              showAvatar={showAvatar}
            />
          );
        })}
      </div>
    );
  }
);

Messaging.displayName = 'Messaging';
