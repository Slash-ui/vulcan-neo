import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FileUploader, UploadedFile } from './FileUploader';
import { Surface } from '../Surface';

const meta: Meta<typeof FileUploader> = {
  title: 'Molecules/FileUploader',
  component: FileUploader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Surface theme="light" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['dropzone', 'button'],
    },
    multiple: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    showFileList: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    const handleFilesSelect = (selectedFiles: File[]) => {
      const newFiles: UploadedFile[] = selectedFiles.map((file) => ({
        file,
        id: `${Date.now()}-${file.name}`,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    };

    const handleRemove = (fileToRemove: UploadedFile) => {
      setFiles((prev) => prev.filter((f) => f.id !== fileToRemove.id));
    };

    return (
      <div style={{ maxWidth: 500 }}>
        <FileUploader
          onFilesSelect={handleFilesSelect}
          files={files}
          onRemove={handleRemove}
          multiple
        />
      </div>
    );
  },
};

export const WithAccept: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    return (
      <div style={{ maxWidth: 500 }}>
        <FileUploader
          accept="image/*"
          helperText="PNG, JPG, GIF up to 10MB"
          onFilesSelect={(selectedFiles) => {
            const newFiles = selectedFiles.map((file) => ({
              file,
              id: `${Date.now()}-${file.name}`,
            }));
            setFiles((prev) => [...prev, ...newFiles]);
          }}
          files={files}
          onRemove={(f) => setFiles((prev) => prev.filter((file) => file.id !== f.id))}
          multiple
        />
      </div>
    );
  },
};

export const WithMaxSize: Story = {
  render: () => (
    <div style={{ maxWidth: 500 }}>
      <FileUploader
        accept=".pdf,.doc,.docx"
        maxSize={5 * 1024 * 1024}
        helperText="Documents only (PDF, DOC, DOCX)"
        onFilesSelect={(files) => console.log('Selected:', files)}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: 500 }}>
      <div>
        <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Small</p>
        <FileUploader size="sm" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Medium</p>
        <FileUploader size="md" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', color: 'var(--neo-text-secondary)', fontSize: '0.875rem' }}>Large</p>
        <FileUploader size="lg" />
      </div>
    </div>
  ),
};

export const ButtonVariant: Story = {
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <FileUploader
        variant="button"
        label={<span><strong>Upload file</strong></span>}
        helperText="or drag and drop"
      />
    </div>
  ),
};

export const WithProgress: Story = {
  render: () => {
    const files: UploadedFile[] = [
      { file: new File([''], 'document.pdf', { type: 'application/pdf' }), id: '1', progress: 100 },
      { file: new File([''], 'image.png', { type: 'image/png' }), id: '2', progress: 65 },
      { file: new File([''], 'data.csv', { type: 'text/csv' }), id: '3', progress: 30 },
    ];

    return (
      <div style={{ maxWidth: 500 }}>
        <FileUploader files={files} onRemove={() => {}} />
      </div>
    );
  },
};

export const WithErrors: Story = {
  render: () => {
    const files: UploadedFile[] = [
      { file: new File([''], 'document.pdf', { type: 'application/pdf' }), id: '1' },
      { file: new File([''], 'large-file.zip', { type: 'application/zip' }), id: '2', error: 'File size exceeds limit' },
      { file: new File([''], 'invalid.exe', { type: 'application/x-msdownload' }), id: '3', error: 'File type not allowed' },
    ];

    return (
      <div style={{ maxWidth: 500 }}>
        <FileUploader files={files} onRemove={() => {}} />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: 500 }}>
      <FileUploader disabled />
    </div>
  ),
};

export const CustomLabel: Story = {
  render: () => (
    <div style={{ maxWidth: 500 }}>
      <FileUploader
        label={
          <>
            <span style={{ fontSize: '1.25rem' }}>📸</span>
            <strong>Upload your photos</strong>
            <span style={{ color: 'var(--neo-text-secondary)' }}>
              Drop files here or click to browse
            </span>
          </>
        }
        accept="image/*"
        multiple
      />
    </div>
  ),
};

export const DarkTheme: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    return (
      <div style={{ maxWidth: 500 }}>
        <FileUploader
          onFilesSelect={(selectedFiles) => {
            const newFiles = selectedFiles.map((file) => ({
              file,
              id: `${Date.now()}-${file.name}`,
            }));
            setFiles(newFiles);
          }}
          files={files}
          onRemove={(f) => setFiles((prev) => prev.filter((file) => file.id !== f.id))}
          multiple
        />
      </div>
    );
  },
  decorators: [
    (Story) => (
      <Surface theme="dark" style={{ padding: '2rem' }}>
        <Story />
      </Surface>
    ),
  ],
};
