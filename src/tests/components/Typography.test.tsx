import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';
import Typography from '../../components/Typography';

describe('Typography', () => {
  it('renders without crashing', () => {
    render(<Typography variant="p">Hello</Typography>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Typography variant="h1">Heading</Typography>);
    expect(screen.getByText('Heading')).toBeInTheDocument();
  });

  it('renders as h1 element for h1 variant', () => {
    render(<Typography variant="h1">Title</Typography>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders as h2 element for h2 variant', () => {
    render(<Typography variant="h2">Subtitle</Typography>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders as p element for p variant', () => {
    render(<Typography variant="p">Paragraph text</Typography>);
    const el = screen.getByText('Paragraph text');
    expect(el.tagName.toLowerCase()).toBe('p');
  });

  it('applies error color class', () => {
    render(<Typography variant="p" color="error">Error</Typography>);
    expect(screen.getByText('Error')).toHaveClass('text-red-500');
  });

  it('applies custom className', () => {
    render(<Typography variant="p" className="custom-class">Text</Typography>);
    expect(screen.getByText('Text')).toHaveClass('custom-class');
  });

  it('can render as a different component than its variant', () => {
    render(<Typography variant="h1" component="p">Cross-rendered</Typography>);
    const el = screen.getByText('Cross-rendered');
    expect(el.tagName.toLowerCase()).toBe('p');
  });
});
