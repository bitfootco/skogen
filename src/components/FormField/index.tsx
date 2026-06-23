'use client';

import React from 'react';
import { cn } from '../../utils/cn';

/** ARIA props a control should spread to wire itself to its label/hint/error. */
export interface FieldAria {
  id: string;
  'aria-invalid': boolean | undefined;
  'aria-describedby': string | undefined;
  'aria-required': boolean | undefined;
}

interface FormFieldProps {
  id: string;
  label?: string | React.ReactNode;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  /**
   * Render-prop receiving the ARIA props to spread onto the control. Wiring it
   * here keeps every field's accessibility consistent (aria-invalid /
   * aria-describedby / aria-required) without each input re-implementing it.
   */
  children: (aria: FieldAria) => React.ReactNode;
}

/** Compose a non-empty `aria-describedby` from the hint and error ids. */
export const describedBy = (
  ids: Array<string | false | undefined>,
): string | undefined => {
  const present = ids.filter(Boolean) as string[];
  return present.length ? present.join(' ') : undefined;
};

const FormField = ({
  id,
  label,
  hint,
  error,
  required = false,
  className = '',
  children,
}: FormFieldProps) => {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  const aria: FieldAria = {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy([hintId, errorId]),
    'aria-required': required || undefined,
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200"
        >
          {label}
          {required && (
            <span className="ms-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children(aria)}
      {hint && !error && (
        <p
          id={hintId}
          className="mt-1 text-sm text-gray-500 dark:text-gray-400"
        >
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
