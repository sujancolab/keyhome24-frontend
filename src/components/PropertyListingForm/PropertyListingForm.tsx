import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Home, Image, Eye, CreditCard } from 'lucide-react';
import { PropertyFormData } from '../../types/propertyListing';
import StepIndicator from './StepIndicator';
import Step1AgencyInfo from './Step1AgencyInfo';
import Step2Details from './Step2Details';
import Step3Images from './Step3Images';
import Step4Preview from './Step4Preview';
import Step5Payment from './Step5Payment';
import FormFeedback from '../../pages/DashboardPage/components/FormFeedback';

interface PropertyListingFormProps {
  onSubmit: (data: PropertyFormData) => void;
  initialData?: Partial<PropertyFormData>;
}

const initialFormData: PropertyFormData = {
  agencyInfo: {
    name: '',
    address: '',
    location: '',
    email: '',
    phone: ''
  },
  type: 'sell',
  category: 'residential',
  propertyType: '',
  title: '',
  description: '',
  price: 0,
  location: {
    address: '',
    city: '',
    postalCode: '',
    canton: ''
  },
  features: {
    area: 0,
    rooms: 0,
    bathrooms: 0,
    floor: 0,
    totalFloors: 0,
    parkingSpaces: 0,
    parking: false,
    balcony: false,
    elevator: false,
    custom: Array(6).fill('')
  },
  media: {
    images: [],
    documents: []
  },
  availability: new Date().toISOString().split('T')[0]
};

const steps = [
  { icon: Home, label: 'Agence' },
  { icon: Home, label: 'Détails' },
  { icon: Image, label: 'Photos' },
  { icon: Eye, label: 'Aperçu' },
  { icon: CreditCard, label: 'Publication' }
];

const PropertyListingForm: React.FC<PropertyListingFormProps> = ({ onSubmit, initialData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  const methods = useForm<PropertyFormData>({
    defaultValues: { 
      ...initialFormData,
      ...initialData,
      features: {
        ...initialFormData.features,
        ...initialData?.features,
        custom: Array(6).fill('')
      }
    },
    mode: 'onChange'
  });

  const validateStep = async () => {
    let isValid = true;
    setFeedback(null);

    switch (currentStep) {
      case 1:
        isValid = await methods.trigger([
          'agencyInfo.name',
          'agencyInfo.address',
          'agencyInfo.location',
          'agencyInfo.email',
          'agencyInfo.phone'
        ]);
        if (!isValid) {
          setFeedback({
            type: 'error',
            message: 'Veuillez remplir tous les champs obligatoires'
          });
        }
        break;

      case 2:
        isValid = await methods.trigger([
          'type',
          'category',
          'propertyType',
          'title',
          'description',
          'price',
          'location.address',
          'location.city',
          'location.postalCode',
          'location.canton',
          'features.area',
          'features.rooms',
          'features.bathrooms',
          'features.floor'
        ]);
        if (!isValid) {
          setFeedback({
            type: 'error',
            message: 'Veuillez remplir tous les champs obligatoires et vérifier les valeurs'
          });
        }
        break;

      case 3:
        const images = methods.getValues('media.images');
        if (!images || images.length === 0) {
          isValid = false;
          setFeedback({
            type: 'error',
            message: 'Veuillez ajouter au moins une photo'
          });
        }
        break;
    }

    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid) {
      setCurrentStep(prev => prev + 1);
      setFeedback(null);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    setFeedback(null);
  };

  const handleSubmit = async (data: PropertyFormData) => {
    try {
      await onSubmit(data);
      setFeedback({
        type: 'success',
        message: 'Votre annonce a été publiée avec succès'
      });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: 'Une erreur est survenue lors de la publication'
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-12">
        <StepIndicator currentStep={currentStep} steps={steps} />
      </div>

      {feedback && (
        <div className="mb-6">
          <FormFeedback type={feedback.type} message={feedback.message} />
        </div>
      )}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-8">
          {currentStep === 1 && (
            <Step1AgencyInfo onNext={handleNext} />
          )}
          
          {currentStep === 2 && (
            <Step2Details onNext={handleNext} onBack={handleBack} />
          )}
          
          {currentStep === 3 && (
            <Step3Images onNext={handleNext} onBack={handleBack} />
          )}
          
          {currentStep === 4 && (
            <Step4Preview onNext={handleNext} onBack={handleBack} />
          )}
          
          {currentStep === 5 && (
            <Step5Payment onBack={handleBack} onSubmit={handleSubmit} />
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default PropertyListingForm;