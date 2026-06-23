import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FileInput from '../../components/FileInput';

describe('FileInput', () => {
  const defaultProps = { id: 'doc', label: 'Document' };

  it('renders a file input with its label', () => {
    render(<FileInput {...defaultProps} />);
    expect(screen.getByText('Document')).toBeInTheDocument();
    const input = document.getElementById('doc') as HTMLInputElement;
    expect(input.type).toBe('file');
  });

  it('passes accept and multiple through', () => {
    render(<FileInput {...defaultProps} accept=".pdf" multiple />);
    const input = document.getElementById('doc') as HTMLInputElement;
    expect(input).toHaveAttribute('accept', '.pdf');
    expect(input).toHaveAttribute('multiple');
  });

  it('wires aria-invalid on error', () => {
    render(<FileInput {...defaultProps} error="Required" />);
    const input = document.getElementById('doc') as HTMLInputElement;
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'doc-error');
  });
});
