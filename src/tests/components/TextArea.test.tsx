import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import TextArea from '../../components/TextArea';

describe('TextArea', () => {
  const defaultProps = {
    id: 'notes',
    placeholder: 'Write something...',
    value: '',
  };

  it('renders without crashing', () => {
    render(<TextArea {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the placeholder', () => {
    render(<TextArea {...defaultProps} />);
    expect(screen.getByPlaceholderText('Write something...')).toBeInTheDocument();
  });

  it('renders the label when provided', () => {
    render(<TextArea {...defaultProps} label="Notes" />);
    expect(screen.getByText('Notes')).toBeInTheDocument();
  });

  it('does not render a label element when label is omitted', () => {
    render(<TextArea {...defaultProps} />);
    expect(screen.queryByText('label')).not.toBeInTheDocument();
  });

  it('renders the current value', () => {
    render(<TextArea {...defaultProps} value="Some text" />);
    expect(screen.getByDisplayValue('Some text')).toBeInTheDocument();
  });

  it('calls onChange when user types', () => {
    const handleChange = vi.fn();
    render(<TextArea {...defaultProps} onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } });
    expect(handleChange).toHaveBeenCalledOnce();
  });

  it('renders an error message when error prop is set', () => {
    render(<TextArea {...defaultProps} error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('applies disabled state', () => {
    render(<TextArea {...defaultProps} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
