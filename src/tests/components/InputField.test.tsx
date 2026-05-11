import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import InputField from '../../components/InputField';

describe('InputField', () => {
  const defaultProps = {
    label: 'Email',
    placeholder: 'you@example.com',
    id: 'email',
    value: '',
  };

  it('renders without crashing', () => {
    render(<InputField {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the label', () => {
    render(<InputField {...defaultProps} />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders with the correct placeholder', () => {
    render(<InputField {...defaultProps} />);
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('renders the current value', () => {
    render(<InputField {...defaultProps} value="test@example.com" />);
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  it('calls onChange when user types', () => {
    const handleChange = vi.fn();
    render(<InputField {...defaultProps} onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });
    expect(handleChange).toHaveBeenCalledOnce();
  });

  it('renders an error message when error prop is set', () => {
    render(<InputField {...defaultProps} error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('applies disabled state', () => {
    render(<InputField {...defaultProps} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies required attribute', () => {
    render(<InputField {...defaultProps} required />);
    expect(screen.getByRole('textbox')).toBeRequired();
  });

  it('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<InputField {...defaultProps} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
