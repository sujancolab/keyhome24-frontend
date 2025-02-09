import React from 'react';
import { useFormContext } from 'react-hook-form';
import { PropertyFormData } from '../../../types/propertyListing';
import FormField from '../../common/FormField';

const LandFeatures = () => {
  const { register, watch, setValue, formState: { errors } } = useFormContext<PropertyFormData>();

  return (
    <div className="space-y-6">
      {/* Surface */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Surface totale (m²)"
          name="features.area"
          type="number"
          value={watch('features.area').toString()}
          onChange={(e) => setValue('features.area', parseFloat(e.target.value))}
          required
          error={errors.features?.area?.message}
        />
      </div>

      {/* Caractéristiques du terrain */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Caractéristiques du terrain</h3>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.buildingPermit')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span>Permis de construire</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.waterAccess')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span>Accès à l'eau</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.electricity')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span>Raccordement électrique</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.sewage')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span>Raccordement égouts</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.fenced')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span>Terrain clôturé</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.accessRoad')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span>Route d'accès</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default LandFeatures;