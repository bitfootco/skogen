import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FormField, { describedBy } from '../../components/FormField';

describe('FormField', () => {
  it('wires aria-invalid and aria-describedby to the control on error', () => {
    render(
      <FormField id="f" label="Name" error="Required">
        {(aria) => <input aria-label="control" {...aria} />}
      </FormField>,
    );
    const input = screen.getByLabelText('control');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'f-error');
    expect(screen.getByText('Required')).toHaveAttribute('id', 'f-error');
  });

  it('exposes the hint via aria-describedby when there is no error', () => {
    render(
      <FormField id="f" label="Name" hint="Helpful">
        {(aria) => <input aria-label="control" {...aria} />}
      </FormField>,
    );
    expect(screen.getByLabelText('control')).toHaveAttribute(
      'aria-describedby',
      'f-hint',
    );
  });

  it('marks required fields with aria-required and a visual marker', () => {
    render(
      <FormField id="f" label="Name" required>
        {(aria) => <input aria-label="control" {...aria} />}
      </FormField>,
    );
    expect(screen.getByLabelText('control')).toHaveAttribute(
      'aria-required',
      'true',
    );
  });

  it('describedBy joins present ids and drops empty ones', () => {
    expect(describedBy(['a', undefined, 'b'])).toBe('a b');
    expect(describedBy([undefined, false])).toBeUndefined();
  });
});
