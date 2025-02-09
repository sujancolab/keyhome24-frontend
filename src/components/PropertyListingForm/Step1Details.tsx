import React from 'react';
import { useFormContext } from 'react-hook-form';
import { PropertyFormData, propertyCategories, propertyTypeLabels, PropertyType } from '../../types/propertyListing';
import FormSection from '../common/FormSection';
import FormField from '../common/FormField';
import FormActions from '../common/FormActions';
import { cantons } from '../../data/cantons';

interface Step1DetailsProps {
  onNext: () => void;
}

const Step1Details: React.FC<Step1DetailsProps> = ({ onNext }) => {
  const { register, watch, setValue, formState: { errors, isValid } } = useFormContext<PropertyFormData>();
  
  const selectedType = watch('type');
  const selectedCategory = watch('category');
  const propertyType = watch('propertyType');
  const rooms = watch('features.rooms');
  const area = watch('features.area');

  // Générer automatiquement le titre quand les champs nécessaires changent
  React.useEffect(() => {
    if (propertyType && area) {
      const propertyLabel = propertyTypeLabels[propertyType as PropertyType];
      let title = `${propertyLabel} de ${area} m²`;
      if (selectedCategory === 'residential' && rooms) {
        title = `${propertyLabel} ${rooms} pièces de ${area} m²`;
      }
      setValue('title', title);
    }
  }, [propertyType, rooms, area, setValue, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Section Type d'annonce */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Type d'annonce</h3>

        <div className="grid grid-cols-2 gap-4">
          <label className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors ${
            selectedType === 'sell'
              ? 'border-red-500 bg-red-50 text-red-700'
              : 'border-gray-200 hover:border-red-200'
          }`}>
            <input
              type="radio"
              {...register('type', { required: "Le type d'annonce est requis" })}
              value="sell"
              className="sr-only"
            />
            <span className="font-medium">Vendre</span>
          </label>
          <label className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors ${
            selectedType === 'rent'
              ? 'border-red-500 bg-red-50 text-red-700'
              : 'border-gray-200 hover:border-red-200'
          }`}>
            <input
              type="radio"
              {...register('type', { required: "Le type d'annonce est requis" })}
              value="rent"
              className="sr-only"
            />
            <span className="font-medium">Louer</span>
          </label>
        </div>
        {errors.type && (
          <p className="mt-2 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      {/* Section Catégorie et Type de bien */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Catégorie et type de bien</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie *
            </label>
            <select
              {...register('category', { required: "La catégorie est requise" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="">Sélectionnez une catégorie</option>
              {propertyCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          {selectedCategory && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de bien *
              </label>
              <select
                {...register('propertyType', { required: "Le type de bien est requis" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="">Sélectionnez un type</option>
                {propertyCategories
                  .find(cat => cat.id === selectedCategory)
                  ?.types.map(type => (
                    <option key={type} value={type}>
                      {propertyTypeLabels[type as PropertyType]}
                    </option>
                  ))}
              </select>
              {errors.propertyType && (
                <p className="mt-1 text-sm text-red-600">{errors.propertyType.message}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Section Prix */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Prix</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix {selectedType === 'rent' ? 'mensuel ' : ''}(CHF) *
          </label>
          <input
            type="number"
            {...register('price', { 
              required: "Le prix est requis",
              min: { 
                value: selectedType === 'rent' ? 100 : 10000,
                message: selectedType === 'rent' 
                  ? "Le prix minimum est de 100 CHF/mois"
                  : "Le prix minimum est de 10'000 CHF"
              }
            })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
            placeholder={selectedType === 'rent' ? "Prix mensuel" : "Prix de vente"}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>
      </div>

      {/* Section Localisation */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Localisation</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse *
            </label>
            <input
              type="text"
              {...register('location.address', { required: "L'adresse est requise" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="Rue et numéro"
            />
            {errors.location?.address && (
              <p className="mt-1 text-sm text-red-600">{errors.location.address.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Code postal *
            </label>
            <input
              type="text"
              {...register('location.postalCode', { 
                required: "Le code postal est requis",
                pattern: {
                  value: /^[1-9]\d{3}$/,
                  message: "Le code postal doit contenir 4 chiffres"
                }
              })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="1000"
            />
            {errors.location?.postalCode && (
              <p className="mt-1 text-sm text-red-600">{errors.location.postalCode.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ville *
            </label>
            <input
              type="text"
              {...register('location.city', { required: "La ville est requise" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="Lausanne"
            />
            {errors.location?.city && (
              <p className="mt-1 text-sm text-red-600">{errors.location.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Canton *
            </label>
            <select
              {...register('location.canton', { required: "Le canton est requis" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="">Sélectionnez un canton</option>
              {cantons.map(canton => (
                <option key={canton.code} value={canton.code}>
                  {canton.name}
                </option>
              ))}
            </select>
            {errors.location?.canton && (
              <p className="mt-1 text-sm text-red-600">{errors.location.canton.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Section Caractéristiques */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Caractéristiques</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Surface (m²) *
            </label>
            <input
              type="number"
              {...register('features.area', { 
                required: "La surface est requise",
                min: { value: 1, message: "La surface doit être supérieure à 0" }
              })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
            />
            {errors.features?.area && (
              <p className="mt-1 text-sm text-red-600">{errors.features.area.message}</p>
            )}
          </div>

          {selectedCategory === 'residential' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de pièces *
                </label>
                <input
                  type="number"
                  step="0.5"
                  {...register('features.rooms', { 
                    required: "Le nombre de pièces est requis",
                    min: { value: 0.5, message: "Le nombre de pièces doit être supérieur à 0" }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                />
                {errors.features?.rooms && (
                  <p className="mt-1 text-sm text-red-600">{errors.features.rooms.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salles de bain *
                </label>
                <input
                  type="number"
                  {...register('features.bathrooms', { 
                    required: "Le nombre de salles de bain est requis",
                    min: { value: 1, message: "Le nombre de salles de bain doit être supérieur à 0" }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                />
                {errors.features?.bathrooms && (
                  <p className="mt-1 text-sm text-red-600">{errors.features.bathrooms.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Étage *
                </label>
                <input
                  type="number"
                  {...register('features.floor', { 
                    required: "L'étage est requis",
                    min: { value: 0, message: "L'étage doit être 0 ou supérieur" }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                />
                {errors.features?.floor && (
                  <p className="mt-1 text-sm text-red-600">{errors.features.floor.message}</p>
                )}
              </div>
            </>
          )}

          {selectedCategory === 'commercial' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Étage *
                </label>
                <input
                  type="number"
                  {...register('features.floor', { 
                    required: "L'étage est requis",
                    min: { value: 0, message: "L'étage doit être 0 ou supérieur" }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                />
                {errors.features?.floor && (
                  <p className="mt-1 text-sm text-red-600">{errors.features.floor.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sanitaires
                </label>
                <input
                  type="number"
                  {...register('features.bathrooms', { 
                    min: { value: 0, message: "Le nombre de sanitaires ne peut pas être négatif" }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                />
                {errors.features?.bathrooms && (
                  <p className="mt-1 text-sm text-red-600">{errors.features.bathrooms.message}</p>
                )}
              </div>
            </>
          )}

          {selectedCategory === 'parking' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de places *
              </label>
              <input
                type="number"
                {...register('features.parkingSpaces', { 
                  required: "Le nombre de places est requis",
                  min: { value: 1, message: "Au moins une place est requise" }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
              />
              {errors.features?.parkingSpaces && (
                <p className="mt-1 text-sm text-red-600">{errors.features.parkingSpaces.message}</p>
              )}
            </div>
          )}
        </div>

        {/* Équipements spécifiques selon la catégorie */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedCategory === 'residential' && (
            <>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('features.parking')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Place de parking
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('features.balcony')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Balcon/Terrasse
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('features.elevator')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Ascenseur
                </label>
              </div>
            </>
          )}

          {selectedCategory === 'commercial' && (
            <>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('features.elevator')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Ascenseur
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('features.airConditioning')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Climatisation
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('features.loadingDock')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Quai de chargement
                </label>
              </div>
            </>
          )}

          {selectedCategory === 'parking' && (
            <>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('features.secureAccess')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Accès sécurisé
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('features.remoteControl')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Télécommande
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('features.charging')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Borne de recharge
                </label>
              </div>
            </>
          )}

          {selectedCategory === 'land' && (
            <>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('features.buildingPermit')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Permis de construire
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('features.waterAccess')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Accès à l'eau
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('features.electricity')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Raccordement électrique
                </label>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Section Description */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Description</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description détaillée *
          </label>
          <textarea
            {...register('description', { 
              required: "La description est requise",
              minLength: { value: 50, message: "La description doit contenir au moins 50 caractères" }
            })}
            rows={6}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
            placeholder="Décrivez votre bien en détail..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
      </div>

      <FormActions
        onNext={onNext}
        showNext={true}
        disabled={!isValid}
      />
    </div>
  );
};

export default Step1Details;