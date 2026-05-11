import { render } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import Divider from '../../components/Divider';

describe('Divider', () => {
  it('renders without crashing', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies md size class by default', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toHaveClass('h-0.5');
  });

  it('applies sm size class', () => {
    const { container } = render(<Divider size="sm" />);
    expect(container.firstChild).toHaveClass('h-px');
  });

  it('applies lg size class', () => {
    const { container } = render(<Divider size="lg" />);
    expect(container.firstChild).toHaveClass('h-1');
  });

  it('applies xl size class', () => {
    const { container } = render(<Divider size="xl" />);
    expect(container.firstChild).toHaveClass('h-2');
  });

  it('merges custom className', () => {
    const { container } = render(<Divider className="my-custom" />);
    expect(container.firstChild).toHaveClass('my-custom');
  });
});
