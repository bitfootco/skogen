import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import DateInput from '../../components/DateInput';

describe('DateInput', () => {
  const defaultProps = {
    id: 'dob',
    label: 'Date of birth',
    value: '',
  };

  it('renders a date input with its label', () => {
    render(<DateInput {...defaultProps} />);
    expect(screen.getByText('Date of birth')).toBeInTheDocument();
  });

  it('calls onChange when the value changes', () => {
    const onChange = vi.fn();
    render(<DateInput {...defaultProps} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Date of birth'), {
      target: { value: '2026-01-01' },
    });
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('wires aria-invalid + describedby on error', () => {
    render(<DateInput {...defaultProps} error="Invalid date" />);
    const input = screen.getByLabelText('Date of birth');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'dob-error');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<DateInput {...defaultProps} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
