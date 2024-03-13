import React from 'react';

interface SelectProps {
  label: string;
  id: string;
  options: {
    value: string;
    label: string;
  }[];
  value: string;
  multiple?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({
  label,
  id,
  options,
  multiple = false,
  value,
  onChange,
}: SelectProps) => {
  return (
    <form>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        className="block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        multiple={multiple}
        onChange={onChange}
      >
        {options.map(({ value, label }) => (
          <option value={value}>{label}</option>
        ))}
      </select>
    </form>
  );
};

export default Select;
