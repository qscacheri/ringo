import React from 'react';

interface GraphHeaderProps {
  className?: string;
}

export const GraphHeader: React.FC<GraphHeaderProps> = ({ className = '' }) => {
  return (
    <div className={`w-full h-full col-span-2 bg-green-600 ${className}`}></div>
  );
};
