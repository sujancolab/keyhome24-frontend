import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { ArrowRight, Eye, CreditCard } from 'lucide-react';
import { SearchRequestData } from '../../types/searchRequest';
import StepIndicator from './StepIndicator';
import Step1Form from './Step1Form';
import Step2Preview from './Step2Preview';
import Step3Payment from './Step3Payment';

interface SearchRequestFormProps {
  onSubmit?: (data: SearchRequestData) => void;
}

const initialFormData: SearchRequestData = {
  type: 'location',
  title: '',
  location: {
    canton: '',
    npa: '',
    city: ''
  },
  budget: '',
  rooms: '',
  propertyType: '',
  moveInDate: '',
  description: '',
  features: {
    parking: false,
    garden: false,
    furnished: false,
    petsAllowed: false
  },
  contact: {
    name: '',
    email: '',
    phone: ''
  },
  termsAccepted: false
};

const steps = [
  { icon: ArrowRight, label: 'Informations' },
  { icon: Eye, label: 'Aperçu' },
  { icon: CreditCard, label: 'Paiement' }
];

const SearchRequestForm: React.FC<SearchRequestFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm<SearchRequestData>({
    defaultValues: initialFormData,
    mode: 'onChange'
  });

  const handleStepSubmit = async (data: SearchRequestData) => {
    let isValid = false;

    // Validation spécifique pour chaque étape
    switch (currentStep) {
      case 1:
        isValid = await methods.trigger([
          'type',
          'title',
          'location.canton',
          'location.npa',
          'location.city',
          'budget',
          'description',
          'contact.name',
          'contact.email',
          'contact.phone',
          'termsAccepted'
        ]);

        if (!methods.getValues('termsAccepted')) {
          methods.setError('termsAccepted', {
            type: 'required',
            message: 'Vous devez accepter les conditions générales'
          });
          isValid = false;
        }
        break;

      case 2:
        // L'aperçu n'a pas besoin de validation
        isValid = true;
        break;

      case 3:
        if (onSubmit) {
          onSubmit(data);
          return;
        }
        break;
    }

    if (isValid) {
      setCurrentStep(prev => prev + 1);
    } else {
      methods.setError('root', {
        type: 'validation',
        message: 'Veuillez remplir tous les champs obligatoires'
      });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-12">
        <StepIndicator currentStep={currentStep} steps={steps} />
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleStepSubmit)} className="space-y-8">
          {/* Message d'erreur général */}
          {methods.formState.errors.root && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
              {methods.formState.errors.root.message}
            </div>
          )}

          {currentStep === 1 && (
            <Step1Form 
              onSubmit={handleStepSubmit}
              initialData={initialFormData}
            />
          )}
          
          {currentStep === 2 && (
            <Step2Preview 
              onNext={() => setCurrentStep(3)}
              onBack={handleBack}
            />
          )}
          
          {currentStep === 3 && (
            <Step3Payment 
              onBack={handleBack}
              onSubmit={handleStepSubmit}
            />
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default SearchRequestForm;