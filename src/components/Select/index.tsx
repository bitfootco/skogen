import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SelectProps {
  label?: string;
  id: string;
  className?: string;
  options: {
    value: string;
    label: string;
  }[];
  selected: string | string[];
  multiple?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({
  label,
  id,
  options,
  className = '',
  multiple = false,
  selected = '',
  onChange,
}: SelectProps) => {
  return (
    <form>
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
        className={twMerge(
          `block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${className}`,
        )}
        multiple={multiple}
        onChange={onChange}
      >
        {!selected && (
          <option value="" disabled selected>
            Select an option
          </option>
        )}
        {options.map(({ value, label }) => (
          <option
            value={value}
            selected={selected === value || selected.includes(value)}
          >
            {label}
          </option>
        ))}
      </select>
    </form>
  );
};

export default Select;
