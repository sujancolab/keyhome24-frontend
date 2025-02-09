import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SearchRequestData } from '../../../types/searchRequest';
import { MapPin, Building2, Calendar, Clock } from 'lucide-react';
import ChfIcon from '../../ChfIcon';

interface RepriseFormProps {
  register: UseFormRegister<SearchRequestData>;
  errors: FieldErrors<SearchRequestData>;
}

const RepriseForm: React.FC<RepriseFormProps> = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      {/* Champs communs */}
      <div className="form-group">
        <label className="form-label">Titre de votre recherche *</label>
        <input
          type="text"
          {...register('title', { 
            required: "Le titre est requis",
            minLength: { value: 10, message: "Le titre doit contenir au moins 10 caractères" }
          })}
          placeholder="Ex: Recherche reprise de bail à Lausanne"
          className="form-input"
        />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>

      {/* Localisation */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Localisation *</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">NPA *</label>
            <input
              type="text"
              {...register('location.npa', { 
                required: "Le NPA est requis",
                pattern: {
                  value: /^\d{4}$/,
                  message: "Le NPA doit contenir 4 chiffres"
                }
              })}
              className="form-input"
              placeholder="1000"
            />
            {errors.location?.npa && (
              <p className="form-error">{errors.location.npa.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Ville *</label>
            <input
              type="text"
              {...register('location.city', { required: "La ville est requise" })}
              className="form-input"
              placeholder="Lausanne"
            />
            {errors.location?.city && (
              <p className="form-error">{errors.location.city.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Budget */}
      <div className="form-group">
        <label className="form-label">Budget maximum par mois *</label>
        <div className="input-group">
          <input
            type="number"
            {...register('budget', { 
              required: "Le budget est requis",
              min: { value: 100, message: "Le budget minimum est de 100 CHF" }
            })}
            className="form-input input-with-icon"
            placeholder="Budget en CHF"
          />
          <ChfIcon className="input-icon" />
        </div>
        {errors.budget && <p className="form-error">{errors.budget.message}</p>}
      </div>

      {/* Champs spécifiques à la reprise */}
      <div className="form-group">
        <label className="form-label">Date de reprise souhaitée *</label>
        <div className="input-group">
          <input
            type="date"
            {...register('moveInDate', { required: "La date de reprise est requise" })}
            className="form-input input-with-icon"
            min={new Date().toISOString().split('T')[0]}
          />
          <Calendar className="input-icon" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Date de fin de bail souhaitée</label>
        <div className="input-group">
          <input
            type="date"
            {...register('reprise.endDate')}
            className="form-input input-with-icon"
            min={new Date().toISOString().split('T')[0]}
          />
          <Clock className="input-icon" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Frais de reprise maximum</label>
        <div className="input-group">
          <input
            type="number"
            {...register('reprise.fees')}
            className="form-input input-with-icon"
            placeholder="Montant en CHF"
          />
          <ChfIcon className="input-icon" />
        </div>
      </div>

      {/* Description */}
      <div className="form-group">
        <label className="form-label">Description de votre recherche *</label>
        <textarea
          {...register('description', { 
            required: "La description est requise",
            minLength: { value: 50, message: "La description doit contenir au moins 50 caractères" }
          })}
          rows={4}
          className="form-input"
          placeholder="Décrivez vos critères de recherche, vos préférences..."
        />
        {errors.description && <p className="form-error">{errors.description.message}</p>}
      </div>

      {/* Contact */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Informations de contact *</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nom complet *</label>
            <input
              type="text"
              {...register('contact.name', { required: "Le nom est requis" })}
              className="form-input"
              placeholder="Jean Dupont"
            />
            {errors.contact?.name && (
              <p className="form-error">{errors.contact.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email *</label>
            <input
              type="email"
              {...register('contact.email', { 
                required: "L'email est requis",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Adresse email invalide"
                }
              })}
              className="form-input"
              placeholder="jean.dupont@example.com"
            />
            {errors.contact?.email && (
              <p className="form-error">{errors.contact.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Téléphone *</label>
            <input
              type="tel"
              {...register('contact.phone', { 
                required: "Le téléphone est requis",
                pattern: {
                  value: /^\+?[0-9\s-]{10,}$/,
                  message: "Numéro de téléphone invalide"
                }
              })}
              className="form-input"
              placeholder="+41 XX XXX XX XX"
            />
            {errors.contact?.phone && (
              <p className="form-error">{errors.contact.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Conditions générales */}
      <div className="form-group">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            {...register('termsAccepted', { 
              required: "Vous devez accepter les conditions générales" 
            })}
            className="mt-1 form-checkbox"
          />
          <span className="text-sm text-gray-600">
            J'accepte les conditions générales et la politique de confidentialité *
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="form-error">{errors.termsAccepted.message}</p>
        )}
      </div>
    </div>
  );
};

export default RepriseForm;