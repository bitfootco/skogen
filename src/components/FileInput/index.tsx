'use client';

import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import FormField from '../FormField';

interface FileInputProps {
  id: string;
  label?: string | React.ReactNode;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      id,
      label,
      hint,
      error,
      required = false,
      disabled = false,
      accept,
      multiple = false,
      className = '',
      onChange = () => {},
    },
    ref,
  ) => {
    const borderStyling = error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600';

    return (
      <FormField
        id={id}
        label={label}
        hint={hint}
        error={error}
        required={required}
      >
        {(aria) => (
          <input
            {...aria}
            ref={ref}
            type="file"
            accept={accept}
            multiple={multiple}
            required={required}
            disabled={disabled}
            onChange={onChange}
            className={cn(
              `block w-full rounded-lg border bg-gray-50 text-sm text-gray-900 file:mr-4 file:border-0 file:bg-gray-100 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-gray-700 dark:bg-gray-700 dark:text-white dark:file:bg-gray-600 dark:file:text-gray-100 ${borderStyling} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`,
            )}
          />
        )}
      </FormField>
    );
  },
);

FileInput.displayName = 'FileInput';

export default FileInput;
