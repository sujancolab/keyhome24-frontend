import React from "react";
import { useFormContext } from "react-hook-form";
import { Ruler, Car, Lock, Shield } from "lucide-react";
import { PropertyFormData } from "../../../types/propertyListing";

const ParkingFeaturesForm = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<PropertyFormData>();

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Surface (m²) *
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
                        Nombre de places *
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            {...register("features.parkingSpaces", {
                                required: "Le nombre de places est requis",
                                min: {
                                    value: 1,
                                    message:
                                        "Le nombre de places doit être positif",
                                },
                            })}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 shadow-sm"
                        />
                        <Car className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                    {errors.features?.parkingSpaces && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.features.parkingSpaces.message}
                        </p>
                    )}
                </div>
            </div>

            {/*<div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Sécurité et accès
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            {...register("features.secureAccess")}
                            className="rounded text-red-600 focus:ring-red-500 h-4 w-4 shadow-sm"
                        />
                        <span className="flex items-center">
                            <Lock className="h-4 w-4 mr-2 text-gray-400" />
                            Accès sécurisé
                        </span>
                    </label>

                    <label className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            {...register("features.surveillance")}
                            className="rounded text-red-600 focus:ring-red-500 h-4 w-4 shadow-sm"
                        />
                        <span className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-gray-400" />
                            Vidéosurveillance
                        </span>
                    </label>
                </div>
            </div>*/}
        </div>
    );
};

export default ParkingFeaturesForm;
