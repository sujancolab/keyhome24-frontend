import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SearchRequestData } from '../../../types/searchRequest';
import { MapPin, Building2, BedDouble, Users, Calendar } from 'lucide-react';
import ChfIcon from '../../ChfIcon';
import { cantons } from '../../../data/cantons';

interface ColocationFormProps {
  register: UseFormRegister<SearchRequestData>;
  errors: FieldErrors<SearchRequestData>;
}

const ColocationForm: React.FC<ColocationFormProps> = ({ register, errors }) => {
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
          placeholder="Ex: Recherche chambre en colocation à Lausanne"
          className="form-input"
        />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>

      {/* Localisation */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Localisation *</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Canton *</label>
            <div className="input-group">
              <select
                {...register('location.canton', { required: "Le canton est requis" })}
                className="form-select input-with-icon"
              >
                <option value="">Sélectionnez</option>
                {cantons.map(canton => (
                  <option key={canton.code} value={canton.code}>
                    {canton.name}
                  </option>
                ))}
              </select>
              <MapPin className="input-icon" />
            </div>
          </div>

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
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Ville *</label>
            <input
              type="text"
              {...register('location.city', { required: "La ville est requise" })}
              className="form-input"
              placeholder="Lausanne"
            />
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

      {/* Champs spécifiques à la colocation */}
      <div className="form-group">
        <label className="form-label">Nombre de colocataires souhaité</label>
        <div className="input-group">
          <select
            {...register('colocation.currentRoommates')}
            className="form-select input-with-icon"
          >
            <option value="">Sélectionnez</option>
            <option value="1">1 colocataire</option>
            <option value="2">2 colocataires</option>
            <option value="3">3 colocataires</option>
            <option value="4+">4 colocataires ou plus</option>
          </select>
          <Users className="input-icon" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Tranche d'âge souhaitée</label>
        <div className="input-group">
          <input
            type="text"
            {...register('colocation.averageAge')}
            className="form-input input-with-icon"
            placeholder="Ex: 25-35 ans"
          />
          <Users className="input-icon" />
        </div>
      </div>

      {/* Date d'emménagement */}
      <div className="form-group">
        <label className="form-label">Date d'emménagement souhaitée *</label>
        <div className="input-group">
          <input
            type="date"
            {...register('moveInDate', { required: "La date d'emménagement est requise" })}
            className="form-input input-with-icon"
            min={new Date().toISOString().split('T')[0]}
          />
          <Calendar className="input-icon" />
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
          placeholder="Décrivez votre profil, vos attentes, votre mode de vie..."
        />
        {errors.description && <p className="form-error">{errors.description.message}</p>}
      </div>
    </div>
  );
};

export default ColocationForm;