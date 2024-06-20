import React from 'react';
import { twMerge } from 'tailwind-merge';
import Typography from '../Typography';

interface InputFieldProps {
  label: string;
  placeholder: string;
  id: string;
  value: string;
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  label,
  placeholder,
  id,
  value,
  size = 'md',
  required = false,
  disabled = false,
  error = '',
  className = '',
  onChange = () => {},
}: InputFieldProps) => {
  // 1. Create a dictionary to map the size prop to the tailwind classes
  const sizeDictionary = {
    sm: 'p-2.5 text-sm',
    md: 'p-3 text-sm',
    lg: 'p-4 text-base',
  };

  // 2. Create a border styling based on the error prop
  const borderStyling = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500';

  return (
    <form>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        className={twMerge(
          `block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${sizeDictionary[size]} ${borderStyling} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`,
        )}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
      />
      {error && (
        <Typography variant="p" color="error" className="mb-2">
          {error}
        </Typography>
      )}
    </form>
  );
};

export default InputField;
