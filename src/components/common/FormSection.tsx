import React from 'react';
import { LucideIcon, AlertCircle } from 'lucide-react';

interface FormSectionProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  description?: string;
  error?: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  icon: Icon,
  children,
  description,
  error
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-red-600" />}
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
        {description && (
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        )}
        {error && (
          <div className="mt-3 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default FormSection;