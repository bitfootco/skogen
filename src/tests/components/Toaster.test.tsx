import { render, screen, act } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Toaster from '../../components/Toaster';
import { toast, removeToast, getToasts } from '../../utils/toastStore';

// drain any leftover toasts from the module-level store between tests
beforeEach(() => {
  getToasts().forEach((t) => removeToast(t.id));
});

describe('Toaster', () => {
  it('renders nothing when there are no toasts', () => {
    const { container } = render(<Toaster />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a toast when toast.success is called', () => {
    render(<Toaster />);
    act(() => { toast.success('Entry saved'); });
    expect(screen.getByText('Entry saved')).toBeInTheDocument();
  });

  it('renders a toast when toast.error is called', () => {
    render(<Toaster />);
    act(() => { toast.error('Something went wrong'); });
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders multiple toasts', () => {
    render(<Toaster />);
    act(() => {
      toast.success('First');
      toast.info('Second');
    });
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('auto-dismisses after the duration', () => {
    vi.useFakeTimers();
    render(<Toaster duration={1000} />);
    act(() => { toast.success('Gone soon'); });
    expect(screen.getByText('Gone soon')).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1100); });
    expect(screen.queryByText('Gone soon')).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});
