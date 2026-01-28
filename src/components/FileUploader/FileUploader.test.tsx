import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FileUploader, UploadedFile } from './FileUploader';

const createFile = (name: string, size: number, type: string): File => {
  const file = new File([''], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

describe('FileUploader', () => {
  it('renders dropzone with default label', () => {
    render(<FileUploader />);
    expect(screen.getByText(/Click to upload/)).toBeInTheDocument();
    expect(screen.getByText(/drag and drop/)).toBeInTheDocument();
  });

  it('renders custom label', () => {
    render(<FileUploader label="Upload your files" />);
    expect(screen.getByText('Upload your files')).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<FileUploader helperText="Only PDF files" />);
    expect(screen.getByText('Only PDF files')).toBeInTheDocument();
  });

  it('shows accepted file types', () => {
    render(<FileUploader accept=".pdf,.doc" />);
    expect(screen.getByText(/Accepted: \.pdf,\.doc/)).toBeInTheDocument();
  });

  it('shows max file size', () => {
    render(<FileUploader maxSize={5242880} />);
    expect(screen.getByText(/Max size: 5 MB/)).toBeInTheDocument();
  });

  it('has accessible button role', () => {
    render(<FileUploader />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onFilesSelect when files are selected', () => {
    const handleFilesSelect = vi.fn();
    render(<FileUploader onFilesSelect={handleFilesSelect} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createFile('test.pdf', 1024, 'application/pdf');

    Object.defineProperty(input, 'files', { value: [file] });
    fireEvent.change(input);

    expect(handleFilesSelect).toHaveBeenCalledWith([file]);
  });

  it('handles multiple file selection when multiple is true', () => {
    render(<FileUploader multiple />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toHaveAttribute('multiple');
  });

  it('limits files by maxFiles', () => {
    const handleFilesSelect = vi.fn();
    render(<FileUploader onFilesSelect={handleFilesSelect} maxFiles={2} multiple />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const files = [
      createFile('file1.pdf', 1024, 'application/pdf'),
      createFile('file2.pdf', 1024, 'application/pdf'),
      createFile('file3.pdf', 1024, 'application/pdf'),
    ];

    Object.defineProperty(input, 'files', { value: files });
    fireEvent.change(input);

    expect(handleFilesSelect).toHaveBeenCalledWith([files[0], files[1]]);
  });

  it('filters files by maxSize', () => {
    const handleFilesSelect = vi.fn();
    render(<FileUploader onFilesSelect={handleFilesSelect} maxSize={1000} multiple />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const files = [
      createFile('small.pdf', 500, 'application/pdf'),
      createFile('large.pdf', 2000, 'application/pdf'),
    ];

    Object.defineProperty(input, 'files', { value: files });
    fireEvent.change(input);

    expect(handleFilesSelect).toHaveBeenCalledWith([files[0]]);
  });

  it('is disabled when disabled prop is true', () => {
    render(<FileUploader disabled />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeDisabled();
    expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '-1');
  });

  it('handles drag and drop', () => {
    const handleFilesSelect = vi.fn();
    render(<FileUploader onFilesSelect={handleFilesSelect} />);

    const dropzone = screen.getByRole('button');
    const file = createFile('test.pdf', 1024, 'application/pdf');

    fireEvent.dragOver(dropzone);
    expect(document.querySelector('[class*="dragging"]')).toBeInTheDocument();

    fireEvent.drop(dropzone, {
      dataTransfer: { files: [file] },
    });

    expect(handleFilesSelect).toHaveBeenCalledWith([file]);
  });

  it('removes dragging state on drag leave', () => {
    render(<FileUploader />);
    const dropzone = screen.getByRole('button');

    fireEvent.dragOver(dropzone);
    expect(document.querySelector('[class*="dragging"]')).toBeInTheDocument();

    fireEvent.dragLeave(dropzone);
    expect(document.querySelector('[class*="dragging"]')).not.toBeInTheDocument();
  });

  it('handles keyboard Enter to trigger file picker', () => {
    render(<FileUploader />);
    const button = screen.getByRole('button');

    // Mock the file input click
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');

    fireEvent.keyDown(button, { key: 'Enter' });
    expect(clickSpy).toHaveBeenCalled();
  });

  it('renders file list when files are provided', () => {
    const files: UploadedFile[] = [
      { id: '1', file: createFile('document.pdf', 1024, 'application/pdf') },
    ];
    render(<FileUploader files={files} />);
    expect(screen.getByText('document.pdf')).toBeInTheDocument();
  });

  it('shows file size in file list', () => {
    const files: UploadedFile[] = [
      { id: '1', file: createFile('document.pdf', 1024, 'application/pdf') },
    ];
    render(<FileUploader files={files} />);
    expect(screen.getByText('1 KB')).toBeInTheDocument();
  });

  it('shows progress bar for uploading files', () => {
    const files: UploadedFile[] = [
      { id: '1', file: createFile('document.pdf', 1024, 'application/pdf'), progress: 50 },
    ];
    render(<FileUploader files={files} />);
    expect(document.querySelector('[class*="progressBar"]')).toBeInTheDocument();
  });

  it('shows error for files with errors', () => {
    const files: UploadedFile[] = [
      { id: '1', file: createFile('document.pdf', 1024, 'application/pdf'), error: 'Upload failed' },
    ];
    render(<FileUploader files={files} />);
    expect(screen.getByText('Upload failed')).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    const handleRemove = vi.fn();
    const files: UploadedFile[] = [
      { id: '1', file: createFile('document.pdf', 1024, 'application/pdf') },
    ];
    render(<FileUploader files={files} onRemove={handleRemove} />);
    fireEvent.click(screen.getByLabelText('Remove file'));
    expect(handleRemove).toHaveBeenCalledWith(files[0]);
  });

  it('hides file list when showFileList is false', () => {
    const files: UploadedFile[] = [
      { id: '1', file: createFile('document.pdf', 1024, 'application/pdf') },
    ];
    render(<FileUploader files={files} showFileList={false} />);
    expect(screen.queryByText('document.pdf')).not.toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<FileUploader size="sm" data-testid="uploader" />);
    expect(screen.getByTestId('uploader').className).toContain('sm');

    rerender(<FileUploader size="md" data-testid="uploader" />);
    expect(screen.getByTestId('uploader').className).toContain('md');

    rerender(<FileUploader size="lg" data-testid="uploader" />);
    expect(screen.getByTestId('uploader').className).toContain('lg');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<FileUploader variant="dropzone" data-testid="uploader" />);
    expect(screen.getByTestId('uploader').className).toContain('dropzone');

    rerender(<FileUploader variant="button" data-testid="uploader" />);
    expect(screen.getByTestId('uploader').className).toContain('button');
  });

  it('applies custom className', () => {
    render(<FileUploader className="custom-uploader" data-testid="uploader" />);
    expect(screen.getByTestId('uploader')).toHaveClass('custom-uploader');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement>;
    render(<FileUploader ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
