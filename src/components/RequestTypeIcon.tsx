import React from 'react';
import { Home, Users, Key } from 'lucide-react';

interface RequestTypeIconProps {
  type: 'location' | 'colocation' | 'reprise';
  size?: number;
  className?: string;
}

const RequestTypeIcon: React.FC<RequestTypeIconProps> = ({ type, size = 40, className = '' }) => {
  const baseClasses = "p-2 rounded-lg flex-shrink-0 " + className;
  
  switch (type) {
    case 'location':
      return (
        <div className={`${baseClasses} bg-blue-100`}>
          <Home size={size} className="text-blue-600" />
        </div>
      );
    case 'colocation':
      return (
        <div className={`${baseClasses} bg-green-100`}>
          <Users size={size} className="text-green-600" />
        </div>
      );
    case 'reprise':
      return (
        <div className={`${baseClasses} bg-yellow-100`}>
          <Key size={size} className="text-yellow-600" />
        </div>
      );
  }
};

export default RequestTypeIcon;