import React from 'react';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  color?: 'primary' | 'secondary';
  variant?: 'solid' | 'outlined' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  text: string;
  className?: string;
  Icon?: React.ReactNode;
}

const Badge = ({
  color = 'primary',
  variant = 'solid',
  size = 'md',
  text,
  className = '',
  Icon,
}: BadgeProps) => {
  // 1. adjust color / variant based on passed props, eg. primary, outlined, etc.
  const variantsDictionary = {
    'primary-solid': `bg-primary-500 text-white`,
    'primary-outlined': `border-2 bg-white border-primary-500 text-primary-500 dark:bg-primary-900`,
    'primary-pill': `bg-primary-500 text-white rounded-full px-2`,
    'secondary-solid': `bg-secondary-500 text-white`,
    'secondary-outlined': `border-2 border-secondary-500 text-secondary-500 dark:bg-secondary-900`,
    'secondary-pill': `bg-secondary-500 text-white rounded-full px-2`,
  };
  // 2. adjust size based on passed props, eg. sm, md, lg, etc.
  const sizesDictionary = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-md',
  };
  // 3. Return the badge with pre-configured styles, dynamic styles and passed styles props
  return (
    <div
      className={twMerge(
        'inline-flex',
        'items-center',
        'px-2',
        'py-1',
        'rounded-md',
        variantsDictionary[`${color}-${variant}`],
        sizesDictionary[size],
        className,
      )}
    >
      <>
        {Icon && <span className="mr-2">{Icon}</span>}
        {text}
      </>
    </div>
  );
};

export default Badge;
