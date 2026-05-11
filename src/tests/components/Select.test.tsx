import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import Select from '../../components/Select';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

describe('Select', () => {
  it('renders without crashing', () => {
    render(<Select id="s" options={options} selected="" onChange={vi.fn()} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select id="s" options={options} selected="" onChange={vi.fn()} />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  it('renders the label when provided', () => {
    render(
      <Select id="s" label="Choose one" options={options} selected="" onChange={vi.fn()} />,
    );
    expect(screen.getByText('Choose one')).toBeInTheDocument();
  });

  it('does not render a label element when label is omitted', () => {
    render(<Select id="s" options={options} selected="" onChange={vi.fn()} />);
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('shows the selected value', () => {
    render(<Select id="s" options={options} selected="b" onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('Option B')).toBeInTheDocument();
  });

  it('calls onChange when selection changes', () => {
    const handleChange = vi.fn();
    render(<Select id="s" options={options} selected="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'a' } });
    expect(handleChange).toHaveBeenCalledOnce();
  });
});
