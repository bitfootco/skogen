'use client';

import React from 'react';
import { cn } from '../../utils/cn';
import FormField from '../FormField';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  id: string;
  label?: string | React.ReactNode;
  options: RadioOption[];
  value: string;
  name?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (value: string) => void;
}

const RadioGroup = ({
  id,
  label,
  options,
  value,
  name,
  hint,
  error,
  required = false,
  disabled = false,
  className = '',
  onChange,
}: RadioGroupProps) => {
  const groupName = name ?? id;

  return (
    <FormField
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      {(aria) => (
        <div
          role="radiogroup"
          aria-labelledby={label ? undefined : id}
          aria-invalid={aria['aria-invalid']}
          aria-describedby={aria['aria-describedby']}
          className="flex flex-col gap-2"
        >
          {options.map((option) => {
            const optionId = `${id}-${option.value}`;
            return (
              <label
                key={option.value}
                htmlFor={optionId}
                className={cn(
                  'inline-flex items-center text-sm font-medium text-gray-900 dark:text-gray-200',
                  disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
                )}
              >
                <input
                  id={optionId}
                  type="radio"
                  name={groupName}
                  value={option.value}
                  checked={value === option.value}
                  disabled={disabled}
                  onChange={() => onChange(option.value)}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <span className="ms-2">{option.label}</span>
              </label>
            );
          })}
        </div>
      )}
    </FormField>
  );
};

export default RadioGroup;
