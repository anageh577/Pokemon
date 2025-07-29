import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('generic');
    expect(spinner).toBeInTheDocument();
    expect(spinner.firstChild).toHaveClass('h-8', 'w-8');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />);
    expect(screen.getByRole('generic').firstChild).toHaveClass('h-4', 'w-4');

    rerender(<LoadingSpinner size="lg" />);
    expect(screen.getByRole('generic').firstChild).toHaveClass('h-12', 'w-12');
  });

  it('applies custom className', () => {
    render(<LoadingSpinner className="custom-spinner" />);
    expect(screen.getByRole('generic')).toHaveClass('custom-spinner');
  });

  it('has correct animation classes', () => {
    render(<LoadingSpinner />);
    const spinnerElement = screen.getByRole('generic').firstChild as HTMLElement;
    expect(spinnerElement).toHaveClass('animate-spin', 'rounded-full', 'border-2');
  });
}); 