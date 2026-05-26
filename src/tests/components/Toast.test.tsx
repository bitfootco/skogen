import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import Toast from '../../components/Toast';

describe('Toast', () => {
  it('renders the message', () => {
    render(<Toast id="1" message="Entry saved" type="success" onDismiss={vi.fn()} />);
    expect(screen.getByText('Entry saved')).toBeInTheDocument();
  });

  it('applies success variant classes', () => {
    const { container } = render(<Toast id="1" message="OK" type="success" onDismiss={vi.fn()} />);
    expect(container.firstChild).toHaveClass('bg-green-50');
  });

  it('applies error variant classes', () => {
    const { container } = render(<Toast id="1" message="Fail" type="error" onDismiss={vi.fn()} />);
    expect(container.firstChild).toHaveClass('bg-red-50');
  });

  it('applies info variant classes', () => {
    const { container } = render(<Toast id="1" message="FYI" type="info" onDismiss={vi.fn()} />);
    expect(container.firstChild).toHaveClass('bg-blue-50');
  });

  it('applies warning variant classes', () => {
    const { container } = render(<Toast id="1" message="Heads up" type="warning" onDismiss={vi.fn()} />);
    expect(container.firstChild).toHaveClass('bg-yellow-50');
  });

  it('calls onDismiss with the id when the dismiss button is clicked', async () => {
    const onDismiss = vi.fn();
    render(<Toast id="abc" message="Bye" type="info" onDismiss={onDismiss} />);
    await userEvent.click(screen.getByLabelText('Dismiss notification'));
    expect(onDismiss).toHaveBeenCalledWith('abc');
  });

  it('has role="alert"', () => {
    render(<Toast id="1" message="Alert" type="error" onDismiss={vi.fn()} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
