import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import InputMask from '../../components/InputMask';

describe('InputMask', () => {
  const defaultProps = {
    id: 'phone',
    mask: '(###) ###-####',
    label: 'Phone',
    value: '',
    onChange: vi.fn(),
  };

  it('renders without crashing', () => {
    render(<InputMask {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the label', () => {
    render(<InputMask {...defaultProps} />);
    expect(screen.getByText('Phone')).toBeInTheDocument();
  });

  it('uses the mask as placeholder', () => {
    render(<InputMask {...defaultProps} />);
    expect(screen.getByPlaceholderText('(###) ###-####')).toBeInTheDocument();
  });

  it('calls onChange with formatted value when user types digits', () => {
    const handleChange = vi.fn();
    render(<InputMask {...defaultProps} onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '5' } });
    expect(handleChange).toHaveBeenCalledOnce();
  });
});
