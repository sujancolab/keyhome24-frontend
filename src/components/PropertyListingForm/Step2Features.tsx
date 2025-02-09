import React from 'react';
import { useFormContext } from 'react-hook-form';
import { PropertyFormData } from '../../types/propertyListing';
import { ResidentialFeaturesForm, CommercialFeaturesForm, LandFeaturesForm, ParkingFeaturesForm } from './features';
import FormSection from '../common/FormSection';
import FormActions from '../common/FormActions';
import { Settings } from 'lucide-react';

interface Step2FeaturesProps {
  onNext: () => void;
  onBack: () => void;
}

const Step2Features: React.FC<Step2FeaturesProps> = ({ onNext, onBack }) => {
  const { watch, formState: { isValid } } = useFormContext<PropertyFormData>();
  const category = watch('category');
  const propertyType = watch('propertyType');

  const getFeatureForm = () => {
    switch (category) {
      case 'residential':
        return <ResidentialFeaturesForm />;
      case 'commercial':
        return <CommercialFeaturesForm />;
      case 'land':
        return <LandFeaturesForm />;
      case 'parking':
        return <ParkingFeaturesForm />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <FormSection
        title="Caractéristiques du bien"
        description="Décrivez les caractéristiques principales de votre bien"
        icon={Settings}
      >
        {getFeatureForm()}
      </FormSection>

      <FormActions
        onBack={onBack}
        onNext={onNext}
        showNext={true}
        disabled={!isValid}
      />
    </div>
  );
};

export default Step2Features;