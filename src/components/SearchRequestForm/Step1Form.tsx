import React from 'react';
import { useFormContext } from 'react-hook-form';
import { SearchRequestData } from '../../types/searchRequest';
import { LocationForm, ColocationForm, RepriseForm } from './forms';
import { ArrowRight } from 'lucide-react';

interface Step1FormProps {
  onSubmit: (data: SearchRequestData) => void;
  initialData: SearchRequestData;
}

const Step1Form: React.FC<Step1FormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, watch, formState: { errors, isValid } } = useFormContext<SearchRequestData>();

  const selectedType = watch('type');

  // Validation du code postal suisse
  const validatePostalCode = (value: string) => {
    const postalCodeRegex = /^[1-9]\d{3}$/;
    if (!postalCodeRegex.test(value)) {
      return "Le code postal doit contenir exactement 4 chiffres et ne peut pas commencer par 0";
    }
    return true;
  };

  // Validation du budget minimum
  const validateBudget = (value: number) => {
    if (value < 100) {
      return "Le budget minimum est de 100 CHF";
    }
    return true;
  };

  const getForm = () => {
    switch (selectedType) {
      case 'location':
        return <LocationForm register={register} errors={errors} validatePostalCode={validatePostalCode} validateBudget={validateBudget} />;
      case 'colocation':
        return <ColocationForm register={register} errors={errors} validatePostalCode={validatePostalCode} validateBudget={validateBudget} />;
      case 'reprise':
        return <RepriseForm register={register} errors={errors} validatePostalCode={validatePostalCode} validateBudget={validateBudget} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="form-section">
        <h2 className="text-xl font-semibold mb-6">Type de recherche</h2>
        
        <div className="grid grid-cols-3 gap-4">
          {['location', 'colocation', 'reprise'].map((type) => (
            <label key={type} className="relative">
              <input
                type="radio"
                {...register('type', { required: "Le type de recherche est requis" })}
                value={type}
                className="sr-only peer"
              />
              <div className="flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all peer-checked:border-red-500 peer-checked:bg-red-50 hover:border-red-300">
                <span className="font-medium capitalize">{type}</span>
              </div>
            </label>
          ))}
        </div>

        {errors.type && (
          <p className="form-error text-center mt-2">{errors.type.message}</p>
        )}
      </div>

      {selectedType && (
        <div className="form-section">
          {getForm()}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className={`px-8 py-3 rounded-lg transition-colors flex items-center ${
            isValid
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!isValid}
        >
          Continuer
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Step1Form;