import React from 'react';
import clsx from 'clsx';
import type { LoadingSpinnerProps } from '../../types/pokemon';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className 
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={clsx('flex justify-center items-center', className)}>
      <div
        data-testid="loading-spinner"
        className={clsx(
          'animate-spin rounded-full border-2 border-gray-300 border-t-blue-600',
          sizes[size]
        )}
      />
    </div>
  );
};

export default LoadingSpinner; 