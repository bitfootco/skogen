import React from 'react';

interface CheckboxProps {
  checked: boolean;
  label: string;
  onChange: () => void;
}

const Checkbox = ({ checked, label, onChange }: CheckboxProps) => {
  return (
    <div className="mb-4 flex items-center">
      <input
        checked={checked}
        id="default-checkbox"
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
        onChange={onChange}
      />
      <label
        htmlFor="default-checkbox"
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-200"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
