import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import Checkbox from '../../components/Checkbox';

describe('Checkbox', () => {
  it('renders without crashing', () => {
    render(<Checkbox checked={false} label="Accept terms" onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders the label', () => {
    render(<Checkbox checked={false} label="Accept terms" onChange={vi.fn()} />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('reflects checked state', () => {
    render(<Checkbox checked={true} label="Checked" onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('reflects unchecked state', () => {
    render(<Checkbox checked={false} label="Unchecked" onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<Checkbox checked={false} label="Click me" onChange={handleChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledOnce();
  });

  it('merges custom className', () => {
    const { container } = render(
      <Checkbox checked={false} label="X" onChange={vi.fn()} className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
