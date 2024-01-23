import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  color?: 'primary' | 'secondary' | 'white' | 'black' | 'gray';
  className?: string;
  children: React.ReactNode;
}

// component to generate consistent typography across the app
// using Tailwind classes and conventions defined by us
const Typography = ({
  variant = 'p',
  component = variant || 'p',
  color = 'primary',
  className = '',
  children,
}: TypographyProps) => {
  // 1. Adjust variant based on passed props, eg. h1, h2, h3, etc.
  const variantsDictionary = {
    h1: 'font-header text-7xl font-semibold leading-tight',
    h2: 'font-header text-6xl font-semibold leading-tight',
    h3: 'font-header text-5xl font-semibold leading-tight',
    h4: 'font-body font-semibold text-4xl',
    h5: 'font-body text-3xl font-semibold',
    h6: 'font-body text-2xl font-semibold',
    p: 'font-body text-base',
  };
  // 2. Adjust text-color based on passed props, eg. primary, secondary, etc.
  const colorsDictionary = {
    primary: 'text-slate-100',
    secondary: 'text-lime-500',
    white: 'text-white',
    black: 'text-slate-800',
    gray: 'text-gray-300',
  };
  // 3. Return the component with pre-configured styles, dynamic styles and passed styles props
  const Component = () => {
    switch (component) {
      case 'h1':
        return (
          <h1
            className={twMerge(
              `${variantsDictionary[variant]} ${colorsDictionary[color]} ${className}`,
            )}
          >
            {children}
          </h1>
        );
      case 'h2':
        return (
          <h2
            className={twMerge(
              `${variantsDictionary[variant]} ${colorsDictionary[color]} ${className}`,
            )}
          >
            {children}
          </h2>
        );
      case 'h3':
        return (
          <h3
            className={twMerge(
              `${variantsDictionary[variant]} ${colorsDictionary[color]} ${className}`,
            )}
          >
            {children}
          </h3>
        );
      case 'h4':
        return (
          <h4
            className={twMerge(
              `${variantsDictionary[variant]} ${colorsDictionary[color]} ${className}`,
            )}
          >
            {children}
          </h4>
        );
      case 'h5':
        return (
          <h5
            className={twMerge(
              `${variantsDictionary[variant]} ${colorsDictionary[color]} ${className}`,
            )}
          >
            {children}
          </h5>
        );
      case 'h6':
        return (
          <h6
            className={twMerge(
              `${variantsDictionary[variant]} ${colorsDictionary[color]} ${className}`,
            )}
          >
            {children}
          </h6>
        );
      case 'p':
        return (
          <p
            className={twMerge(
              `${variantsDictionary[variant]} ${colorsDictionary[color]} ${className}`,
            )}
          >
            {children}
          </p>
        );
      default:
        return (
          <p
            className={twMerge(
              `${variantsDictionary[variant]} ${colorsDictionary[color]} ${className}`,
            )}
          >
            {children}
          </p>
        );
    }
  };

  return <Component />;
};

export default Typography;
