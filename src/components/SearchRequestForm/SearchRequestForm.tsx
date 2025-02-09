import React, { useState } from 'react';
import { ArrowRight, Eye, CreditCard } from 'lucide-react';
import { Step1Form } from './Step1Form';
import { Step2Preview } from './Step2Preview';
import Step3Payment from './Step3Payment';
import { SearchRequestData } from '../../types/searchRequest';
import StepIndicator from './StepIndicator';

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

const SearchRequestForm: React.FC<SearchRequestFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SearchRequestData>(initialFormData);

  const steps = [
    { icon: ArrowRight, label: 'Informations' },
    { icon: Eye, label: 'Aperçu' },
    { icon: CreditCard, label: 'Paiement' }
  ];

  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handleBack = () => setCurrentStep(prev => prev - 1);
  const handleStepSubmit = (data: Partial<SearchRequestData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    handleNext();
  };
  const handlePayment = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-12">
        <StepIndicator currentStep={currentStep} steps={steps} />
      </div>

      <div className="mt-12">
        {currentStep === 1 && (
          <Step1Form onSubmit={handleStepSubmit} initialData={formData} />
        )}
        
        {currentStep === 2 && (
          <Step2Preview 
            data={formData} 
            onBack={handleBack}
            onConfirm={handleNext}
          />
        )}
        
        {currentStep === 3 && (
          <Step3Payment 
            onBack={handleBack}
            onPayment={handlePayment}
          />
        )}
      </div>
    </div>
  );
};

export default SearchRequestForm;