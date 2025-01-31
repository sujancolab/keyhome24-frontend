import React from 'react';

interface TableStatusProps {
  status: 'active' | 'pending' | 'inactive' | 'rejected';
  text?: string;
}

const TableStatus: React.FC<TableStatusProps> = ({ status, text }) => {
  const statusConfig = {
    active: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: text || 'Actif'
    },
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: text || 'En attente'
    },
    inactive: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      label: text || 'Inactif'
    },
    rejected: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      label: text || 'Refusé'
    }
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex px-2 py-1 rounded-full text-sm ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

export default TableStatus;