import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TableHeaderProps {
  title: string;
  icon: LucideIcon;
  count: number;
  onAdd?: () => void;
  addButtonLabel?: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ 
  title, 
  icon: Icon, 
  count, 
  onAdd, 
  addButtonLabel 
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <Icon className="h-6 w-6 text-red-600" />
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-sm text-gray-600">({count})</span>
      </div>
      {onAdd && (
        <button
          onClick={onAdd}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          {addButtonLabel}
        </button>
      )}
    </div>
  );
};

export default TableHeader;