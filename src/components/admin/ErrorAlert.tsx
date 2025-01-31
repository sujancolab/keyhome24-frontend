import React from 'react';
import { X, AlertTriangle, AlertCircle, Ban, Database, Wifi } from 'lucide-react';
import { AdminErrorType } from '../../hooks/useAdminError';

interface ErrorAlertProps {
  type: AdminErrorType;
  message: string;
  details?: string;
  onClose: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ type, message, details, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'AUTH_ERROR':
        return Ban;
      case 'PERMISSION_ERROR':
        return AlertCircle;
      case 'DATABASE_ERROR':
        return Database;
      case 'NETWORK_ERROR':
        return Wifi;
      default:
        return AlertTriangle;
    }
  };

  const Icon = getIcon();

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 relative">
      <div className="flex items-start gap-4">
        <Icon className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
        
        <div className="flex-1">
          <h3 className="font-medium text-red-800">{message}</h3>
          {details && (
            <p className="mt-1 text-sm text-red-700">{details}</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700 p-1"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;