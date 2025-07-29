import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<SearchBar {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search...');
  });

  it('renders with custom placeholder', () => {
    render(<SearchBar {...defaultProps} placeholder="Custom placeholder" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Custom placeholder');
  });

  it('calls onChange when input value changes', () => {
    render(<SearchBar {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith('test');
  });

  it('displays the current value', () => {
    render(<SearchBar {...defaultProps} value="current value" />);
    expect(screen.getByRole('textbox')).toHaveValue('current value');
  });

  it('shows loading spinner when isLoading is true', () => {
    render(<SearchBar {...defaultProps} isLoading />);
    const spinner = screen.getByRole('generic');
    expect(spinner).toBeInTheDocument();
    expect(spinner.firstChild).toHaveClass('animate-spin');
  });

  it('does not show loading spinner when isLoading is false', () => {
    render(<SearchBar {...defaultProps} isLoading={false} />);
    const spinner = screen.queryByRole('generic');
    expect(spinner).not.toBeInTheDocument();
  });

  it('has correct input attributes', () => {
    render(<SearchBar {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveClass('w-full', 'px-4', 'py-2');
  });
}); 