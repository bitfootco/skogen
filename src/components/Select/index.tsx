import React from 'react';
import { cn } from '../../utils/cn';

interface SelectProps {
  label?: string | React.ReactNode;
  id: string;
  className?: string;
  options: {
    value: string;
    label: string;
  }[];
  selected: string | string[];
  multiple?: boolean;
  required?: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({
  label,
  id,
  options,
  className = '',
  multiple = false,
  selected = '',
  required = false,
  error = '',
  onChange,
}: SelectProps) => {
  const borderStyling = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500';

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        value={selected}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          `block w-full appearance-none rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${borderStyling} ${className}`,
        )}
        multiple={multiple}
        onChange={onChange}
      >
        {!selected && (
          <option value="" disabled>
            Select an option
          </option>
        )}
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
