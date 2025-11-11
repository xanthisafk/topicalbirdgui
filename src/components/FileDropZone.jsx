import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import '@/styles/components/file-dropzone.css';

const FileDropzone = ({
  onChange,
  accept,
  className = '',
  multiple = true,
  ...otherProps
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  // Triggers when a file is dragged over the dropzone
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  // Triggers when a file leaves the dropzone
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // Necessary to allow for dropping
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Triggers when a file is dropped on the dropzone
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      if (onChange) {
        onChange({files});
      }
      // Clear the input value to allow re-uploading the same file
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  // Triggers when the hidden file input changes (e.g., from clicking)
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (onChange) {
        onChange({files});
      }
    }
  };

  // Triggers the hidden file input click
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const combinedClassName = `file-dropzone ${
    isDragging ? 'is-dragging' : ''
  } ${className}`.trim();

  return (
    <div
      className={combinedClassName}
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
      {...otherProps}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="file-dropzone-input"
      />

      <div className="file-dropzone-content">
        {isDragging ? (
          <>
            <Upload size="64" />
            <span className="file-dropzone-prompt">
              Drop files here
            </span>
          </>
        ) : (
          <>
            <Upload size="64" />
            <span className="file-dropzone-prompt">
              Drag 'n' drop files here, or click to select
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default FileDropzone;