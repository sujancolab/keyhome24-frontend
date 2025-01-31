import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface FormActionsProps {
  onBack?: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  disabled?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({
  onBack,
  onSubmit,
  submitLabel = 'Continuer',
  disabled
}) => {
  return (
    <div className="flex justify-between">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </button>
      )}
      {onSubmit && (
        <button
          type="submit"
          onClick={onSubmit}
          disabled={disabled}
          className={`px-8 py-3 rounded-lg transition-colors shadow-sm ${
            disabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {submitLabel}
        </button>
      )}
    </div>
  );
};

export default FormActions;