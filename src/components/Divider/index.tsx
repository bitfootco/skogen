import React from 'react';
import { twMerge } from 'tailwind-merge';

interface DividerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  dark?: boolean;
}

const Divider = ({
  className = '',
  size = 'md',
  dark = true,
}: DividerProps) => {
  const sizesDictionary = {
    sm: 'h-px',
    md: 'h-0.5',
    lg: 'h-1',
    xl: 'h-2',
  };

  const color = dark ? 'bg-gray-300' : 'bg-gray-100';

  return (
    <div
      className={twMerge(
        `mx-8 my-4 flex w-full border-t-0 opacity-100 ${color} ${sizesDictionary[size]} ${className}`,
      )}
    />
  );
};

export default Divider;
