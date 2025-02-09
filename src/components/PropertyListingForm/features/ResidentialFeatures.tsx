import React from 'react';
import { useFormContext } from 'react-hook-form';
import { PropertyFormData } from '../../../types/propertyListing';
import FormField from '../../common/FormField';

const ResidentialFeatures = () => {
  const { register, watch, setValue, formState: { errors } } = useFormContext<PropertyFormData>();

  return (
    <div className="space-y-6">
      {/* Caractéristiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Surface habitable (m²)"
          name="features.area"
          type="number"
          value={watch('features.area').toString()}
          onChange={(e) => setValue('features.area', parseFloat(e.target.value))}
          required
          error={errors.features?.area?.message}
        />

        <FormField
          label="Nombre de pièces"
          name="features.rooms"
          type="number"
          value={watch('features.rooms').toString()}
          onChange={(e) => setValue('features.rooms', parseFloat(e.target.value))}
          required
          error={errors.features?.rooms?.message}
        />

        <FormField
          label="Salles de bain"
          name="features.bathrooms"
          type="number"
          value={watch('features.bathrooms').toString()}
          onChange={(e) => setValue('features.bathrooms', parseInt(e.target.value))}
          required
          error={errors.features?.bathrooms?.message}
        />

        <FormField
          label="Étage"
          name="features.floor"
          type="number"
          value={watch('features.floor').toString()}
          onChange={(e) => setValue('features.floor', parseInt(e.target.value))}
          required
          error={errors.features?.floor?.message}
        />
      </div>

      {/* Équipements */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Équipements</h3>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.kitchen')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span>Cuisine équipée</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.parking')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span>Place de parking</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.balcony')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span>Balcon/Terrasse</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.cellar')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span>Cave</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.laundry')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span>Buanderie privative</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.elevator')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span>Ascenseur</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ResidentialFeatures;