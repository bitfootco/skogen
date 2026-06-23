import { useId } from 'react';
import { cn } from '../../utils/cn';

interface CheckboxProps {
  checked: boolean;
  label: string;
  /** Stable id; falls back to a generated one so multiple checkboxes never collide. */
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: () => void;
  className?: string;
  labelClassName?: string;
}

const Checkbox = ({
  checked,
  label,
  id,
  name,
  required = false,
  disabled = false,
  onChange,
  className = '',
  labelClassName = '',
}: CheckboxProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn('mb-4 inline-flex items-center', className)}>
      <input
        checked={checked}
        id={inputId}
        name={name}
        type="checkbox"
        required={required}
        disabled={disabled}
        aria-required={required || undefined}
        className={cn(
          'h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        )}
        onChange={onChange}
      />
      <label
        htmlFor={inputId}
        className={cn(
          'ms-2 text-sm font-medium text-gray-900 dark:text-gray-200',
          labelClassName,
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
