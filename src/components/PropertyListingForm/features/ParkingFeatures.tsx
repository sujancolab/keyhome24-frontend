import React from 'react';
import { useFormContext } from 'react-hook-form';
import { PropertyFormData } from '../../../types/propertyListing';
import FormField from '../../common/FormField';

const ParkingFeatures = () => {
  const { register, watch, setValue, formState: { errors } } = useFormContext<PropertyFormData>();

  return (
    <div className="space-y-6">
      {/* Caractéristiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Surface (m²)"
          name="features.area"
          type="number"
          value={watch('features.area').toString()}
          onChange={(e) => setValue('features.area', parseFloat(e.target.value))}
          required
          error={errors.features?.area?.message}
        />

        <FormField
          label="Nombre de places"
          name="features.parkingSpaces"
          type="number"
          value={watch('features.parkingSpaces').toString()}
          onChange={(e) => setValue('features.parkingSpaces', parseInt(e.target.value))}
          required
          error={errors.features?.parkingSpaces?.message}
        />
      </div>

      {/* Équipements */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Équipements</h3>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.secureAccess')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span>Accès sécurisé</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.surveillance')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span>Vidéosurveillance</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.remoteControl')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span>Télécommande</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.lighting')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span>Éclairage</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.heated')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span>Chauffé</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.charging')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span>Borne de recharge</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ParkingFeatures;