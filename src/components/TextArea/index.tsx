'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import Typography from '../Typography';

interface TextAreaProps {
  label?: string;
  placeholder: string;
  id: string;
  value: string;
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  error?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({
  label = '',
  placeholder,
  id,
  value,
  size = 'md',
  required = false,
  disabled = false,
  fullWidth = false,
  error = '',
  className = '',
  onChange = () => {},
}: TextAreaProps) => {
  const sizeDictionary = {
    sm: 'p-2.5 text-sm',
    md: 'p-3 text-sm',
    lg: 'p-4 text-base',
  };

  const borderStyling = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500'
    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';

  return (
    <div className={fullWidth ? 'w-full' : 'w-auto'}>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        className={twMerge(
          `block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  ${sizeDictionary[size]} ${borderStyling} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`,
        )}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
      />
      {error && (
        <Typography variant="p" color="error" className="mt-1">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default TextArea;
