import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RadioGroup from '../../components/RadioGroup';

const options = [
  { value: 'a', label: 'Apple' },
  { value: 'b', label: 'Banana' },
];

describe('RadioGroup', () => {
  const defaultProps = {
    id: 'fruit',
    label: 'Fruit',
    options,
    value: 'a',
    onChange: () => {},
  };

  it('renders a radiogroup with one input per option', () => {
    render(<RadioGroup {...defaultProps} />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('marks the selected option as checked', () => {
    render(<RadioGroup {...defaultProps} value="b" />);
    expect(screen.getByLabelText('Banana')).toBeChecked();
    expect(screen.getByLabelText('Apple')).not.toBeChecked();
  });

  it('calls onChange with the chosen value', () => {
    const onChange = vi.fn();
    render(<RadioGroup {...defaultProps} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Banana'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('exposes aria-invalid on error', () => {
    render(<RadioGroup {...defaultProps} error="Pick one" />);
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });
});
