import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MultiSelect from '../../components/MultiSelect';

const options = [
  { value: 'a', label: 'Apple' },
  { value: 'b', label: 'Banana' },
  { value: 'c', label: 'Cherry' },
];

describe('MultiSelect', () => {
  const defaultProps = {
    id: 'fruit',
    label: 'Fruit',
    options,
    value: [] as string[],
    onChange: () => {},
  };

  it('shows the placeholder when nothing is selected', () => {
    render(<MultiSelect {...defaultProps} placeholder="Choose fruit" />);
    expect(screen.getByText('Choose fruit')).toBeInTheDocument();
  });

  it('opens the panel and lists options', () => {
    render(<MultiSelect {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('filters options by search text', () => {
    render(<MultiSelect {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.change(screen.getByPlaceholderText('Search…'), {
      target: { value: 'ban' },
    });
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('toggles selection via onChange', () => {
    const onChange = vi.fn();
    render(<MultiSelect {...defaultProps} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByLabelText('Cherry'));
    expect(onChange).toHaveBeenCalledWith(['c']);
  });

  it('summarises selected labels', () => {
    render(<MultiSelect {...defaultProps} value={['a', 'c']} />);
    expect(screen.getByText('Apple, Cherry')).toBeInTheDocument();
  });

  it('exposes aria-invalid on error', () => {
    render(<MultiSelect {...defaultProps} error="Pick at least one" />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });
});
