import React, { forwardRef, useState, useRef, useCallback } from 'react';
import { Typography } from '../../foundation/Typography';
import { ProgressBar } from '../../atoms/ProgressBar';
import { IconButton } from '../../atoms/IconButton';
import styles from './FileUploader.module.css';

export type FileUploaderSize = 'sm' | 'md' | 'lg';
export type FileUploaderVariant = 'dropzone' | 'button';

export interface UploadedFile {
  file: File;
  id: string;
  progress?: number;
  error?: string;
}

export interface FileUploaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Callback when files are selected
   */
  onFilesSelect?: (files: File[]) => void;
  /**
   * Accepted file types
   */
  accept?: string;
  /**
   * Allow multiple files
   * @default false
   */
  multiple?: boolean;
  /**
   * Maximum file size in bytes
   */
  maxSize?: number;
  /**
   * Maximum number of files
   */
  maxFiles?: number;
  /**
   * Size variant
   * @default 'md'
   */
  size?: FileUploaderSize;
  /**
   * Display variant
   * @default 'dropzone'
   */
  variant?: FileUploaderVariant;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Custom label
   */
  label?: React.ReactNode;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Show file list
   * @default true
   */
  showFileList?: boolean;
  /**
   * Currently uploaded files
   */
  files?: UploadedFile[];
  /**
   * Callback when file is removed
   */
  onRemove?: (file: UploadedFile) => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

/**
 * FileUploader - Neomorphic file upload component
 */
export const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(
  (
    {
      onFilesSelect,
      accept,
      multiple = false,
      maxSize,
      maxFiles,
      size = 'md',
      variant = 'dropzone',
      disabled = false,
      label,
      helperText,
      showFileList = true,
      files = [],
      onRemove,
      className,
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = useCallback(
      (fileList: FileList | null) => {
        if (!fileList || disabled) return;

        let selectedFiles = Array.from(fileList);

        // Apply maxFiles limit
        if (maxFiles && selectedFiles.length > maxFiles) {
          selectedFiles = selectedFiles.slice(0, maxFiles);
        }

        // Apply maxSize filter
        if (maxSize) {
          selectedFiles = selectedFiles.filter((file) => file.size <= maxSize);
        }

        onFilesSelect?.(selectedFiles);
      },
      [disabled, maxFiles, maxSize, onFilesSelect]
    );

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      // Reset input to allow selecting the same file again
      e.target.value = '';
    };

    const handleClick = () => {
      if (!disabled) {
        inputRef.current?.click();
      }
    };

    const classNames = [
      styles.fileUploader,
      styles[size],
      styles[variant],
      isDragging ? styles.dragging : '',
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const UploadIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    );

    const FileIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
      </svg>
    );

    const CloseIcon = () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );

    return (
      <div ref={ref} className={classNames} {...props}>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className={styles.input}
          disabled={disabled}
          aria-hidden="true"
        />

        <div
          className={styles.dropzone}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick();
            }
          }}
        >
          <span className={styles.icon}>
            <UploadIcon />
          </span>
          <div className={styles.content}>
            {label || (
              <Typography variant="body2" className={styles.primary}>
                <strong>Click to upload</strong> or drag and drop
              </Typography>
            )}
            {helperText && <Typography variant="caption" color="secondary" className={styles.secondary}>{helperText}</Typography>}
            {accept && (
              <Typography variant="caption" color="secondary" className={styles.secondary}>
                Accepted: {accept}
              </Typography>
            )}
            {maxSize && (
              <Typography variant="caption" color="secondary" className={styles.secondary}>
                Max size: {formatFileSize(maxSize)}
              </Typography>
            )}
          </div>
        </div>

        {showFileList && files.length > 0 && (
          <div className={styles.fileList}>
            {files.map((uploadedFile) => (
              <div key={uploadedFile.id} className={styles.fileItem}>
                <span className={styles.fileIcon}>
                  <FileIcon />
                </span>
                <div className={styles.fileInfo}>
                  <Typography variant="body2" className={styles.fileName}>{uploadedFile.file.name}</Typography>
                  <Typography variant="caption" color="secondary" className={styles.fileSize}>
                    {formatFileSize(uploadedFile.file.size)}
                  </Typography>
                  {uploadedFile.progress !== undefined && uploadedFile.progress < 100 && (
                    <ProgressBar value={uploadedFile.progress} size="sm" className={styles.progressBar} />
                  )}
                  {uploadedFile.error && (
                    <Typography variant="caption" color="error" className={styles.fileError}>{uploadedFile.error}</Typography>
                  )}
                </div>
                {onRemove && (
                  <IconButton
                    variant="flat"
                    size="sm"
                    className={styles.removeButton}
                    onClick={() => onRemove(uploadedFile)}
                    aria-label="Remove file"
                    icon={<CloseIcon />}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

FileUploader.displayName = 'FileUploader';
