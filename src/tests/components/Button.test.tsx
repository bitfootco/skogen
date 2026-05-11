import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../../components/Button';

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button text="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button text="Click" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button text="Click" onClick={handleClick} disabled />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies disabled styles when disabled', () => {
    render(<Button text="Click" disabled />);
    expect(screen.getByRole('button')).toHaveClass('opacity-50');
  });

  it('applies size classes', () => {
    render(<Button text="X" size="lg" />);
    expect(screen.getByRole('button')).toHaveClass('px-6');
  });

  it('merges custom className', () => {
    render(<Button text="X" className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('renders an icon when Icon is provided', () => {
    const icon = <span data-testid="icon">→</span>;
    render(<Button text="X" Icon={icon} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders with a LinkComponent wrapper', () => {
    const LinkComponent = ({ children }: { children: React.ReactNode }) => (
      <a href="#test">{children}</a>
    );
    render(<Button text="Link" LinkComponent={LinkComponent} />);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
