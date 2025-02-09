import React from 'react';
import { Save } from 'lucide-react';

interface FormActionsProps {
  onCancel?: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  isSubmitting,
  submitLabel = 'Enregistrer'
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto order-2 sm:order-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Annuler
        </button>
      )}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto order-1 sm:order-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enregistrement...
          </>
        ) : (
          <>
            <Save className="h-5 w-5 mr-2" />
            {submitLabel}
          </>
        )}
      </button>
    </div>
  );
};

export default FormActions;