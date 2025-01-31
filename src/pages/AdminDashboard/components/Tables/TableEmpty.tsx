import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TableEmptyProps {
  icon: LucideIcon;
  message: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const TableEmpty: React.FC<TableEmptyProps> = ({
  icon: Icon,
  message,
  description,
  action
}) => {
  return (
    <div className="text-center py-12">
      <Icon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {message}
      </h3>
      {description && (
        <p className="text-gray-600 mb-6">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center"
        >
          <Icon className="h-5 w-5 mr-2" />
          {action.label}
        </button>
      )}
    </div>
  );
};

export default TableEmpty;