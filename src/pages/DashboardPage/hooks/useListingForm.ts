import { useState } from 'react';
import { useFormValidation, validationRules } from '../components/FormValidation';

export const useListingForm = (onSubmit: (data: any) => void) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: 'sell',
    propertyType: '',
    rooms: '',
    area: '',
    images: [] as File[]
  });

  const { errors, validateForm, setErrors } = useFormValidation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setFeedback(null);

    const isValid = validateForm(formData, {
      title: validationRules.required,
      price: validationRules.price,
      location: validationRules.required,
      propertyType: validationRules.required,
      description: validationRules.minLength(50)
    });

    if (!isValid) {
      setFeedback({
        type: 'error',
        message: 'Veuillez corriger les erreurs dans le formulaire'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFeedback({
        type: 'success',
        message: 'Annonce publiée avec succès'
      });
      setFormData({
        title: '',
        description: '',
        price: '',
        location: '',
        type: 'sell',
        propertyType: '',
        rooms: '',
        area: '',
        images: []
      });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: 'Une erreur est survenue lors de la publication'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    isSubmitting,
    feedback,
    handleSubmit
  };
};