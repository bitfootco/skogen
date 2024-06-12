import React from 'react';
import { twMerge } from 'tailwind-merge';

interface DividerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Divider = ({ className = '', size = 'md' }: DividerProps) => {
  const sizesDictionary = {
    sm: 'h-px',
    md: 'h-0.5',
    lg: 'h-1',
    xl: 'h-2',
  };

  return (
    <div
      className={twMerge(
        `mx-8 my-4 flex w-full border-t-0 bg-gray-100 opacity-100 dark:bg-gray-300 ${sizesDictionary[size]} ${className}`,
      )}
    />
  );
};

export default Divider;
