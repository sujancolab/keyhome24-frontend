import React from 'react';

interface ChfIconProps {
  className?: string;
}

const ChfIcon: React.FC<ChfIconProps> = ({ className = 'h-5 w-5' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 12h16M4 16h16M7 20c1.5-2 3-3 6-3M13 8c-3 0-4.5-1-6-3" />
  </svg>
);

export default ChfIcon;