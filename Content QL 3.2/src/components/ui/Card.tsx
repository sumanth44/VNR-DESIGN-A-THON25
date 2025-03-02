import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  const hoverStyles = hoverable 
    ? 'transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer' 
    : '';
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;