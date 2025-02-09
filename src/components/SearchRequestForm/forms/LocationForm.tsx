import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SearchRequestData } from '../../../types/searchRequest';
import { MapPin, Building2, BedDouble } from 'lucide-react';
import ChfIcon from '../../ChfIcon';
import { cantons } from '../../../data/cantons';

interface LocationFormProps {
  register: UseFormRegister<SearchRequestData>;
  errors: FieldErrors<SearchRequestData>;
}

const LocationForm: React.FC<LocationFormProps> = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      {/* Titre */}
      <div className="form-group">
        <label className="form-label">Titre de votre recherche *</label>
        <input
          type="text"
          {...register('title', { 
            required: "Le titre est requis",
            minLength: { value: 10, message: "Le titre doit contenir au moins 10 caractères" }
          })}
          placeholder="Ex: Recherche 3.5 pièces à Lausanne"
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
            {errors.location?.canton && (
              <p className="form-error">{errors.location.canton.message}</p>
            )}
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
        <label className="form-label">Budget maximum *</label>
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

      {/* Type de bien */}
      <div className="form-group">
        <label className="form-label">Type de bien *</label>
        <div className="input-group">
          <select
            {...register('propertyType', { required: "Le type de bien est requis" })}
            className="form-select input-with-icon"
          >
            <option value="">Sélectionnez</option>
            <option value="apartment">Appartement</option>
            <option value="house">Maison</option>
            <option value="villa">Villa</option>
            <option value="studio">Studio</option>
            <option value="loft">Loft</option>
          </select>
          <Building2 className="input-icon" />
        </div>
        {errors.propertyType && (
          <p className="form-error">{errors.propertyType.message}</p>
        )}
      </div>

      {/* Nombre de pièces */}
      <div className="form-group">
        <label className="form-label">Nombre de pièces *</label>
        <div className="input-group">
          <select
            {...register('rooms', { required: "Le nombre de pièces est requis" })}
            className="form-select input-with-icon"
          >
            <option value="">Sélectionnez</option>
            <option value="1-1.5">1 - 1.5 pièces</option>
            <option value="2-2.5">2 - 2.5 pièces</option>
            <option value="3-3.5">3 - 3.5 pièces</option>
            <option value="4-4.5">4 - 4.5 pièces</option>
            <option value="5+">5 pièces et plus</option>
          </select>
          <BedDouble className="input-icon" />
        </div>
        {errors.rooms && <p className="form-error">{errors.rooms.message}</p>}
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
    </div>
  );
};

export default LocationForm;