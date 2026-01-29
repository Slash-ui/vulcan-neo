import React, { forwardRef, useImperativeHandle, useCallback } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { Typography } from '../../foundation/Typography';
import styles from './RichTextEditor.module.css';

export type RichTextEditorSize = 'sm' | 'md' | 'lg';

export interface RichTextEditorProps {
  /**
   * Label for the editor
   */
  label?: string;
  /**
   * Placeholder text when editor is empty
   */
  placeholder?: string;
  /**
   * Helper text displayed below the editor
   */
  helperText?: string;
  /**
   * Error message (shows error state when provided)
   */
  error?: string;
  /**
   * The size of the editor
   * @default 'md'
   */
  size?: RichTextEditorSize;
  /**
   * Initial HTML content
   */
  defaultValue?: string;
  /**
   * Controlled HTML content
   */
  value?: string;
  /**
   * Callback when content changes
   */
  onChange?: (html: string) => void;
  /**
   * Whether the editor is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether to show the toolbar
   * @default true
   */
  showToolbar?: boolean;
  /**
   * Additional class name
   */
  className?: string;
}

export interface RichTextEditorRef {
  editor: Editor | null;
  getHTML: () => string;
  getText: () => string;
  setContent: (content: string) => void;
  clearContent: () => void;
  focus: () => void;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  isActive,
  disabled,
  title,
  children,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`${styles.toolbarButton} ${isActive ? styles.active : ''}`}
  >
    {children}
  </button>
);

/**
 * RichTextEditor - Neomorphic rich text editor powered by TipTap
 *
 * Features formatting options like bold, italic, underline, lists, and more.
 * Includes animated border effect on hover and focus.
 */
export const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(
  (
    {
      label,
      placeholder = 'Start typing...',
      helperText,
      error,
      size = 'md',
      defaultValue = '',
      value,
      onChange,
      disabled = false,
      showToolbar = true,
      className,
    },
    ref
  ) => {
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        }),
        Placeholder.configure({
          placeholder,
        }),
        Underline,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Link.configure({
          openOnClick: false,
        }),
      ],
      content: value ?? defaultValue,
      editable: !disabled,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML());
      },
    });

    // Sync controlled value
    React.useEffect(() => {
      if (value !== undefined && editor && value !== editor.getHTML()) {
        editor.commands.setContent(value);
      }
    }, [value, editor]);

    // Expose editor methods via ref
    useImperativeHandle(ref, () => ({
      editor,
      getHTML: () => editor?.getHTML() ?? '',
      getText: () => editor?.getText() ?? '',
      setContent: (content: string) => editor?.commands.setContent(content),
      clearContent: () => editor?.commands.clearContent(),
      focus: () => editor?.commands.focus(),
    }));

    const setLink = useCallback(() => {
      if (!editor) return;
      const previousUrl = editor.getAttributes('link').href;
      const url = window.prompt('URL', previousUrl);

      if (url === null) return;
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }

      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const containerClasses = [
      styles.container,
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const editorWrapperClasses = [
      styles.editorWrapper,
      styles[size],
      error ? styles.error : '',
      disabled ? styles.wrapperDisabled : '',
    ]
      .filter(Boolean)
      .join(' ');

    if (!editor) {
      return null;
    }

    return (
      <div className={containerClasses}>
        {label && (
          <Typography variant="body2" component="label" className={styles.label}>
            {label}
          </Typography>
        )}
        <div className={editorWrapperClasses}>
          {showToolbar && (
            <div className={styles.toolbar}>
              <div className={styles.toolbarGroup}>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  isActive={editor.isActive('bold')}
                  disabled={disabled}
                  title="Bold"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                  </svg>
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  isActive={editor.isActive('italic')}
                  disabled={disabled}
                  title="Italic"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="19" y1="4" x2="10" y2="4" />
                    <line x1="14" y1="20" x2="5" y2="20" />
                    <line x1="15" y1="4" x2="9" y2="20" />
                  </svg>
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  isActive={editor.isActive('underline')}
                  disabled={disabled}
                  title="Underline"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
                    <line x1="4" y1="21" x2="20" y2="21" />
                  </svg>
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  isActive={editor.isActive('strike')}
                  disabled={disabled}
                  title="Strikethrough"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <path d="M17.5 7.5c-.3-1.2-1.4-2.5-4.5-2.5-3 0-4.5 1.5-4.5 3.5 0 1 .5 2 2 2.5" />
                    <path d="M9 16.5c.5 1 1.5 2 4 2 3 0 4.5-1.5 4.5-3.5 0-.8-.3-1.5-.8-2" />
                  </svg>
                </ToolbarButton>
              </div>

              <div className={styles.divider} />

              <div className={styles.toolbarGroup}>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  isActive={editor.isActive('heading', { level: 1 })}
                  disabled={disabled}
                  title="Heading 1"
                >
                  H1
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  isActive={editor.isActive('heading', { level: 2 })}
                  disabled={disabled}
                  title="Heading 2"
                >
                  H2
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  isActive={editor.isActive('heading', { level: 3 })}
                  disabled={disabled}
                  title="Heading 3"
                >
                  H3
                </ToolbarButton>
              </div>

              <div className={styles.divider} />

              <div className={styles.toolbarGroup}>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  isActive={editor.isActive('bulletList')}
                  disabled={disabled}
                  title="Bullet List"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="9" y1="6" x2="20" y2="6" />
                    <line x1="9" y1="12" x2="20" y2="12" />
                    <line x1="9" y1="18" x2="20" y2="18" />
                    <circle cx="4" cy="6" r="1.5" fill="currentColor" />
                    <circle cx="4" cy="12" r="1.5" fill="currentColor" />
                    <circle cx="4" cy="18" r="1.5" fill="currentColor" />
                  </svg>
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  isActive={editor.isActive('orderedList')}
                  disabled={disabled}
                  title="Numbered List"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="10" y1="6" x2="20" y2="6" />
                    <line x1="10" y1="12" x2="20" y2="12" />
                    <line x1="10" y1="18" x2="20" y2="18" />
                    <text x="3" y="7" fontSize="7" fill="currentColor" stroke="none">1</text>
                    <text x="3" y="13" fontSize="7" fill="currentColor" stroke="none">2</text>
                    <text x="3" y="19" fontSize="7" fill="currentColor" stroke="none">3</text>
                  </svg>
                </ToolbarButton>
              </div>

              <div className={styles.divider} />

              <div className={styles.toolbarGroup}>
                <ToolbarButton
                  onClick={() => editor.chain().focus().setTextAlign('left').run()}
                  isActive={editor.isActive({ textAlign: 'left' })}
                  disabled={disabled}
                  title="Align Left"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="15" y2="12" />
                    <line x1="3" y1="18" x2="18" y2="18" />
                  </svg>
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().setTextAlign('center').run()}
                  isActive={editor.isActive({ textAlign: 'center' })}
                  disabled={disabled}
                  title="Align Center"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="6" y1="12" x2="18" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </svg>
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().setTextAlign('right').run()}
                  isActive={editor.isActive({ textAlign: 'right' })}
                  disabled={disabled}
                  title="Align Right"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="9" y1="12" x2="21" y2="12" />
                    <line x1="6" y1="18" x2="21" y2="18" />
                  </svg>
                </ToolbarButton>
              </div>

              <div className={styles.divider} />

              <div className={styles.toolbarGroup}>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  isActive={editor.isActive('blockquote')}
                  disabled={disabled}
                  title="Quote"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v4z" />
                  </svg>
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  isActive={editor.isActive('codeBlock')}
                  disabled={disabled}
                  title="Code Block"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16,18 22,12 16,6" />
                    <polyline points="8,6 2,12 8,18" />
                  </svg>
                </ToolbarButton>
                <ToolbarButton
                  onClick={setLink}
                  isActive={editor.isActive('link')}
                  disabled={disabled}
                  title="Link"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </ToolbarButton>
              </div>

              <div className={styles.divider} />

              <div className={styles.toolbarGroup}>
                <ToolbarButton
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={disabled || !editor.can().undo()}
                  title="Undo"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 7v6h6" />
                    <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                  </svg>
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={disabled || !editor.can().redo()}
                  title="Redo"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 7v6h-6" />
                    <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
                  </svg>
                </ToolbarButton>
              </div>
            </div>
          )}
          <EditorContent editor={editor} className={styles.editorContent} />
        </div>
        {error && (
          <Typography variant="caption" component="span" className={styles.errorText}>
            {error}
          </Typography>
        )}
        {!error && helperText && (
          <Typography variant="caption" component="span" className={styles.helperText}>
            {helperText}
          </Typography>
        )}
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';
