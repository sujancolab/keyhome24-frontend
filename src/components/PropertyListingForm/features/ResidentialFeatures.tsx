import React from "react";
import { useFormContext } from "react-hook-form";
import {
    BedDouble,
    Bath,
    Building2,
    Ruler,
    Car,
    TreePine,
    Wifi,
    Sofa,
    PawPrint,
} from "lucide-react";
import { PropertyFormData } from "../../../types/propertyListing";

const ResidentialFeaturesForm = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<PropertyFormData>();

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Surface habitable (m²) *
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            {...register("features.area", {
                                required: "La surface est requise",
                                min: {
                                    value: 1,
                                    message: "La surface doit être positive",
                                },
                            })}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 shadow-sm"
                        />
                        <Ruler className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                    {errors.features?.area && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.features.area.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre de pièces *
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            step="0.5"
                            {...register("features.rooms", {
                                required: "Le nombre de pièces est requis",
                                min: {
                                    value: 0.5,
                                    message:
                                        "Le nombre de pièces doit être positif",
                                },
                            })}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 shadow-sm"
                        />
                        <BedDouble className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                    {errors.features?.rooms && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.features.rooms.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Salles de bain *
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            {...register("features.bathrooms", {
                                required:
                                    "Le nombre de salles de bain est requis",
                                min: {
                                    value: 1,
                                    message:
                                        "Le nombre de salles de bain doit être positif",
                                },
                            })}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 shadow-sm"
                        />
                        <Bath className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                    {errors.features?.bathrooms && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.features.bathrooms.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Étage *
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            {...register("features.floor", {
                                required: "L'étage est requis",
                                min: {
                                    value: 0,
                                    message:
                                        "L'étage doit être positif ou zéro",
                                },
                            })}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 shadow-sm"
                        />
                        <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                    {errors.features?.floor && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.features.floor.message}
                        </p>
                    )}
                </div>
            </div>
            {/*
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Caractéristiques supplémentaires</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.parking')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4 shadow-sm"
            />
            <span className="flex items-center">
              <Car className="h-4 w-4 mr-2 text-gray-400" />
              Place de parking
            </span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.balcony')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4 shadow-sm"
            />
            <span className="flex items-center">
              <TreePine className="h-4 w-4 mr-2 text-gray-400" />
              Balcon/Terrasse
            </span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.elevator')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4 shadow-sm"
            />
            <span className="flex items-center">
              <Building2 className="h-4 w-4 mr-2 text-gray-400" />
              Ascenseur
            </span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.internet')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4 shadow-sm"
            />
            <span className="flex items-center">
              <Wifi className="h-4 w-4 mr-2 text-gray-400" />
              Internet haut débit
            </span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.furnished')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4 shadow-sm"
            />
            <span className="flex items-center">
              <Sofa className="h-4 w-4 mr-2 text-gray-400" />
              Meublé
            </span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              {...register('features.petsAllowed')}
              className="rounded text-red-600 focus:ring-red-500 h-4 w-4 shadow-sm"
            />
            <span className="flex items-center">
              <PawPrint className="h-4 w-4 mr-2 text-gray-400" />
              Animaux acceptés
            </span>
          </label>
        </div>
      </div>*/}
        </div>
    );
};

export default ResidentialFeaturesForm;
