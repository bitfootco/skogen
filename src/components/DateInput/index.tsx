'use client';

import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import FormField from '../FormField';

interface DateInputProps {
  id: string;
  label?: string | React.ReactNode;
  value: string;
  type?: 'date' | 'datetime-local' | 'time';
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  max?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      id,
      label,
      value,
      type = 'date',
      hint,
      error,
      required = false,
      disabled = false,
      min,
      max,
      className = '',
      onChange = () => {},
    },
    ref,
  ) => {
    const borderStyling = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-500';

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
            type={type}
            value={value}
            min={min}
            max={max}
            required={required}
            disabled={disabled}
            onChange={onChange}
            className={cn(
              `block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white ${borderStyling} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`,
            )}
          />
        )}
      </FormField>
    );
  },
);

DateInput.displayName = 'DateInput';

export default DateInput;
