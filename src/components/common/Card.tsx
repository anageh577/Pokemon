import React from 'react';
import clsx from 'clsx';
import type { CardProps } from '../../types/pokemon';

const Card: React.FC<CardProps> = ({
  children,
  className,
  onClick,
  hover = false,
}) => {
  const baseStyles = 'bg-white rounded-lg shadow-md border border-gray-200';
  const hoverStyles = hover ? 'hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer' : '';
  const clickableStyles = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={clsx(baseStyles, hoverStyles, clickableStyles, className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card; 