import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface FormActionsProps {
  onBack?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  nextLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  showNext?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({
  onBack,
  onNext,
  onSubmit,
  submitLabel = 'Enregistrer',
  nextLabel = 'Continuer',
  disabled = false,
  loading = false,
  showNext = false
}) => {
  return (
    <div className="flex justify-between items-center pt-6">
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
      
      <div className="flex gap-4">
        {showNext && onNext && (
          <button
            type="button"
            onClick={onNext}
            disabled={disabled || loading}
            className={`px-6 py-3 rounded-lg transition-colors flex items-center ${
              disabled || loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
            title={disabled ? 'Veuillez remplir tous les champs obligatoires' : undefined}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Chargement...
              </>
            ) : (
              <>
                {nextLabel}
                <ArrowRight className="h-5 w-5 ml-2" />
              </>
            )}
          </button>
        )}

        {onSubmit && (
          <button
            type="submit"
            onClick={onSubmit}
            disabled={disabled || loading}
            className={`px-6 py-3 rounded-lg transition-colors flex items-center ${
              disabled || loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
            title={disabled ? 'Veuillez remplir tous les champs obligatoires' : undefined}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Chargement...
              </>
            ) : (
              submitLabel
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormActions;