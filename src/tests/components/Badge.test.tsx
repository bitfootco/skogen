import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import Badge from '../../components/Badge';

describe('Badge', () => {
  it('renders without crashing', () => {
    render(<Badge text="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders the text prop', () => {
    render(<Badge text="Status" />);
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('applies solid variant classes', () => {
    const { container } = render(<Badge text="X" color="primary" variant="solid" />);
    expect(container.firstChild).toHaveClass('bg-primary-500');
  });

  it('applies outlined variant classes', () => {
    const { container } = render(<Badge text="X" color="primary" variant="outlined" />);
    expect(container.firstChild).toHaveClass('border-2');
  });

  it('applies pill variant classes', () => {
    const { container } = render(<Badge text="X" color="primary" variant="pill" />);
    expect(container.firstChild).toHaveClass('rounded-full');
  });

  it('merges custom className', () => {
    const { container } = render(<Badge text="X" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders an icon when Icon is provided', () => {
    const icon = <span data-testid="icon">★</span>;
    render(<Badge text="X" Icon={icon} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
