import React, { createContext, useContext, useState } from 'react';

interface ValidationState {
  [key: string]: {
    isValid: boolean;
    error?: string;
  };
}

interface FormValidationContextType {
  validationState: ValidationState;
  validateField: (fieldName: string, value: any, rules: ValidationRules) => boolean;
  clearValidation: (fieldName: string) => void;
  isFormValid: () => boolean;
}

interface ValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => true | string;
}

const FormValidationContext = createContext<FormValidationContextType | undefined>(undefined);

export const FormValidationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [validationState, setValidationState] = useState<ValidationState>({});

  const validateField = (fieldName: string, value: any, rules: ValidationRules): boolean => {
    let isValid = true;
    let error: string | undefined;

    // Vérification si le champ est requis
    if (rules.required && (!value || value === '')) {
      isValid = false;
      error = 'Ce champ est requis';
    }
    // Vérification de la valeur minimale
    else if (rules.min !== undefined && value < rules.min) {
      isValid = false;
      error = `La valeur minimale est ${rules.min}`;
    }
    // Vérification de la valeur maximale
    else if (rules.max !== undefined && value > rules.max) {
      isValid = false;
      error = `La valeur maximale est ${rules.max}`;
    }
    // Vérification du pattern
    else if (rules.pattern && !rules.pattern.test(value)) {
      isValid = false;
      error = 'Format invalide';
    }
    // Validation personnalisée
    else if (rules.custom) {
      const customValidation = rules.custom(value);
      if (customValidation !== true) {
        isValid = false;
        error = customValidation;
      }
    }

    setValidationState(prev => ({
      ...prev,
      [fieldName]: { isValid, error }
    }));

    return isValid;
  };

  const clearValidation = (fieldName: string) => {
    setValidationState(prev => {
      const newState = { ...prev };
      delete newState[fieldName];
      return newState;
    });
  };

  const isFormValid = () => {
    return Object.values(validationState).every(field => field.isValid);
  };

  return (
    <FormValidationContext.Provider value={{
      validationState,
      validateField,
      clearValidation,
      isFormValid
    }}>
      {children}
    </FormValidationContext.Provider>
  );
};

export const useFormValidation = () => {
  const context = useContext(FormValidationContext);
  if (!context) {
    throw new Error('useFormValidation must be used within a FormValidationProvider');
  }
  return context;
};