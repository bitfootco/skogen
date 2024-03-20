import React from 'react';
import { twMerge } from 'tailwind-merge';
import ConditionalWrapper from '../ConditionalWrapper';

interface ButtonProps {
  color?: 'primary' | 'secondary';
  variant?: 'solid' | 'outlined' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  Icon?: React.ReactNode;
  LinkComponent?: React.ElementType<{
    href: string;
    children: React.ReactNode;
  }>;
  href?: string;
  className?: string;
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  color = 'primary',
  variant = 'solid',
  size = 'md',
  Icon,
  LinkComponent = () => null,
  href = '',
  className = '',
  text,
  disabled = false,
  onClick,
}: ButtonProps) => {
  // 1. adjust color / variant based on passed props, eg. primary, outlined, etc.
  const variantsDictionary = {
    'primary-solid': `bg-primary-500 hover:bg-primary-600 text-button-default`,
    'primary-outlined':
      'bg-transparent border-2 border-primary-500 hover:bg-primary-500 text-primary-500 hover:text-button-default',
    'primary-text':
      'font-body font-semibold my-6 text-left underline decoration-1 text-primary-500',
    'secondary-solid':
      'bg-secondary-500 hover:bg-secondary-600 text-button-secondary',
    'secondary-text':
      'font-body font-semibold my-6 text-left underline decoration-1 text-secondary-500',
    'secondary-outlined':
      'bg-transparent border-2 border-secondary-500 hover:bg-secondary-500 text-secondary-500 hover:text-button-secondary',
  };
  // 2. adjust size based on passed props, eg. sm, md, lg, etc.
  const sizesDictionary = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-md',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };
  // 3. If the button is disabled, we should add the disabled styles
  const disabledStyles = disabled ? 'cursor-not-allowed opacity-50' : '';
  // 4. Return the button with pre-configured styles, dynamic styles and passed styles props
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `group inline-flex items-center rounded-full ${
          sizesDictionary[size]
        } font-body font-bold ${
          variantsDictionary[`${color}-${variant}`]
        } ${disabledStyles} ${className}`,
      )}
    >
      <ConditionalWrapper
        condition={!!href}
        wrapper={(children: React.ReactElement) => (
          <LinkComponent href={href}>{children}</LinkComponent>
        )}
      >
        <>
          {text}
          {Icon && (
            <span className="ml-2 mt-0.5 transition-all group-hover:translate-x-1">
              {Icon}
            </span>
          )}
        </>
      </ConditionalWrapper>
    </button>
  );
};

export default Button;
