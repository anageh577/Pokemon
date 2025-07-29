import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  const defaultProps = {
    children: 'Test Button',
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-600');
  });

  it('calls onClick when clicked', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button {...defaultProps} variant="secondary" />);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-200');

    rerender(<Button {...defaultProps} variant="ghost" />);
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button {...defaultProps} size="sm" />);
    expect(screen.getByRole('button')).toHaveClass('px-3');

    rerender(<Button {...defaultProps} size="lg" />);
    expect(screen.getByRole('button')).toHaveClass('px-6');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button {...defaultProps} disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
  });

  it('applies custom className', () => {
    render(<Button {...defaultProps} className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('renders with different button types', () => {
    render(<Button {...defaultProps} type="submit" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('does not call onClick when disabled', () => {
    render(<Button {...defaultProps} disabled />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });
}); 