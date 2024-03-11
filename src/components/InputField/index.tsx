import React from 'react';
import { twMerge } from 'tailwind-merge';

interface InputFieldProps {
  label: string;
  placeholder: string;
  id: string;
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const InputField = ({
  label,
  placeholder,
  id,
  size = 'md',
  required = false,
  disabled = false,
  className = '',
}: InputFieldProps) => {
  // 1. Create a dictionary to map the size prop to the tailwind classes
  const sizeDictionary = {
    sm: 'p-2.5 text-sm',
    md: 'p-3 text-sm',
    lg: 'p-4 text-base',
  };

  return (
    <>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        className={twMerge(
          `block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${sizeDictionary[size]} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`,
        )}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </>
  );
};

export default InputField;
