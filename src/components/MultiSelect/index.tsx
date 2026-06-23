'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import FormField from '../FormField';

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  id: string;
  label?: string | React.ReactNode;
  options: MultiSelectOption[];
  value: string[];
  placeholder?: string;
  searchPlaceholder?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (value: string[]) => void;
}

const MultiSelect = ({
  id,
  label,
  options,
  value,
  placeholder = 'Select…',
  searchPlaceholder = 'Search…',
  hint,
  error,
  required = false,
  disabled = false,
  className = '',
  onChange,
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const selectedSet = useMemo(() => new Set(value), [value]);

  const filtered = useMemo(
    () =>
      options.filter((o) =>
        o.label.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [options, search],
  );

  const toggle = (optionValue: string) => {
    if (selectedSet.has(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const summary =
    value.length === 0
      ? placeholder
      : options
          .filter((o) => selectedSet.has(o.value))
          .map((o) => o.label)
          .join(', ');

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
        <div ref={containerRef} className="relative">
          <button
            id={aria.id}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listId}
            aria-invalid={aria['aria-invalid']}
            aria-describedby={aria['aria-describedby']}
            aria-required={aria['aria-required']}
            disabled={disabled}
            onClick={() => setOpen((prev) => !prev)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setOpen(false);
            }}
            className={cn(
              'flex w-full items-center justify-between rounded-lg border bg-gray-50 p-2.5 text-left text-sm text-gray-900 dark:bg-gray-700 dark:text-white',
              error
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-600',
              disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
            )}
          >
            <span className={cn(value.length === 0 && 'text-gray-400')}>
              {summary}
            </span>
            <span aria-hidden="true" className="ms-2">
              ▾
            </span>
          </button>

          {open && (
            <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-700">
              <div className="p-2">
                <input
                  type="text"
                  value={search}
                  placeholder={searchPlaceholder}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>
              <ul
                id={listId}
                role="listbox"
                aria-multiselectable="true"
                className="max-h-56 overflow-auto py-1"
              >
                {filtered.length === 0 && (
                  <li className="px-3 py-2 text-sm text-gray-400">
                    No matches
                  </li>
                )}
                {filtered.map((option) => {
                  const checked = selectedSet.has(option.value);
                  return (
                    <li key={option.value} role="option" aria-selected={checked}>
                      <label className="flex cursor-pointer items-center px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(option.value)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ms-2">{option.label}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </FormField>
  );
};

export default MultiSelect;
