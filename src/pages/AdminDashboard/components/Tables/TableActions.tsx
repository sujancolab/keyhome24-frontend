import React from 'react';
import { Edit3, Eye, Trash2, Mail } from 'lucide-react';

interface TableActionsProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onEmail?: () => void;
  vertical?: boolean;
}

const TableActions: React.FC<TableActionsProps> = ({
  onView,
  onEdit,
  onDelete,
  onEmail,
  vertical = false
}) => {
  const buttonClasses = `
    flex items-center px-3 py-2 rounded-lg transition-colors
    ${vertical ? 'w-full' : ''}
  `;

  return (
    <div className={`flex gap-2 ${vertical ? 'flex-col' : ''}`}>
      <button
        onClick={onView}
        className={`${buttonClasses} bg-gray-50 text-gray-600 hover:bg-gray-100`}
      >
        <Eye className="h-5 w-5" />
        {vertical && <span className="ml-2">Voir</span>}
      </button>

      <button
        onClick={onEdit}
        className={`${buttonClasses} bg-blue-50 text-blue-600 hover:bg-blue-100`}
      >
        <Edit3 className="h-5 w-5" />
        {vertical && <span className="ml-2">Modifier</span>}
      </button>

      {onEmail && (
        <button
          onClick={onEmail}
          className={`${buttonClasses} bg-green-50 text-green-600 hover:bg-green-100`}
        >
          <Mail className="h-5 w-5" />
          {vertical && <span className="ml-2">Contacter</span>}
        </button>
      )}

      <button
        onClick={onDelete}
        className={`${buttonClasses} bg-red-50 text-red-600 hover:bg-red-100`}
      >
        <Trash2 className="h-5 w-5" />
        {vertical && <span className="ml-2">Supprimer</span>}
      </button>
    </div>
  );
};

export default TableActions;