import React from 'react';
import { twMerge } from 'tailwind-merge';

interface InputFieldProps {
  label: string;
  placeholder: string;
  id: string;
  value: string;
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  disabled?: boolean;
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
  className = '',
  onChange = () => {},
}: InputFieldProps) => {
  // 1. Create a dictionary to map the size prop to the tailwind classes
  const sizeDictionary = {
    sm: 'p-2.5 text-sm',
    md: 'p-3 text-sm',
    lg: 'p-4 text-base',
  };

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
          `block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${sizeDictionary[size]} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`,
        )}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
      />
    </form>
  );
};

export default InputField;
