import { useState } from 'react';

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (data: any, rules: Record<string, (value: any) => string | null>) => {
    const newErrors: Record<string, string> = {};
    
    Object.keys(rules).forEach(field => {
      const validationResult = rules[field](data[field]);
      if (validationResult) {
        newErrors[field] = validationResult;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateForm, setErrors };
};

export const validationRules = {
  required: (value: any) => 
    !value ? 'Ce champ est obligatoire' : null,
  
  email: (value: string) => 
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) 
      ? 'Email invalide' 
      : null,
  
  phone: (value: string) => 
    !/^\+?[0-9\s-]{10,}$/.test(value) 
      ? 'Numéro de téléphone invalide' 
      : null,
  
  price: (value: number) => 
    value <= 0 ? 'Le prix doit être supérieur à 0' : null,
  
  minLength: (min: number) => (value: string) => 
    value.length < min ? `Minimum ${min} caractères requis` : null
};