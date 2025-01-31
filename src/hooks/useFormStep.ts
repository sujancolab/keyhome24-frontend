import { useState } from 'react';

export function useFormStep(initialStep = 1, maxSteps: number) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const nextStep = () => {
    if (currentStep < maxSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= maxSteps) {
      setCurrentStep(step);
    }
  };

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === maxSteps,
  };
}