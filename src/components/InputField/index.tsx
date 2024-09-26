'use client';

import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Typography from '../Typography';

interface InputFieldProps {
  label: string;
  placeholder: string;
  id: string;
  value: string;
  type?: 'text' | 'password' | 'email' | 'number';
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      placeholder,
      id,
      value,
      type = 'text',
      size = 'md',
      required = false,
      disabled = false,
      error = '',
      className = '',
      onChange = () => {},
    },
    ref,
  ) => {
    const sizeDictionary = {
      sm: 'p-2.5 text-sm',
      md: 'p-3 text-sm',
      lg: 'p-4 text-base',
    };

    const borderStyling = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500';

    return (
      <div>
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200"
        >
          {label}
        </label>
        <input
          id={id}
          value={value}
          type={type}
          className={twMerge(
            `block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${sizeDictionary[size]} ${borderStyling} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`,
          )}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={onChange}
          ref={ref}
        />
        {error && (
          <Typography variant="p" color="error" className="mb-2">
            {error}
          </Typography>
        )}
      </div>
    );
  },
);

export default InputField;
