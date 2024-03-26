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
        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
        onChange={onChange}
      />
      <label
        htmlFor="default-checkbox"
        className="ms-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
