import React from "react";
import { useFormContext } from "react-hook-form";
import {
    ArrowLeft,
    ArrowRight,
    MapPin,
    Calendar,
    Home,
    Maximize,
    Bath,
    Building2,
} from "lucide-react";
import { PropertyFormData, propertyTypes } from "../../types/propertyListing";
import ChfIcon from "../ChfIcon";

interface Step4PreviewProps {
    onNext: () => void;
    onBack: () => void;
}

const Step4Preview: React.FC<Step4PreviewProps> = ({ onNext, onBack }) => {
    const { watch } = useFormContext<PropertyFormData>();
    const data = watch();

    const propertyTypeLabel = data.propertyType
        ? propertyTypes[data.propertyType].label
        : "";

    return (
        <div className="space-y-6">
            <div className="form-section">
                <h2 className="text-xl font-semibold mb-6">
                    Aperçu de votre annonce
                </h2>

                {/* Images */}
                {data.images && data.images.length > 0 && (
                    <div className="mb-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {data.images.map(
                                (base64: string, index: number) => (
                                    <div
                                        key={index}
                                        className="aspect-[4/3] rounded-lg overflow-hidden shadow-md"
                                    >
                                        <img
                                            src={base64}
                                            alt={`Aperçu ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}

                {/* Informations principales */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                            {data.title || propertyTypeLabel}
                        </h3>
                        <div className="flex items-center text-gray-600 mt-2">
                            <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                            <span>
                                {[
                                    data.location.address,
                                    data.location.postalCode,
                                    data.location.city,
                                    data.location.canton,
                                ]
                                    .filter(Boolean)
                                    .join(", ")}
                            </span>
                        </div>
                        <div className="flex items-center text-red-600 font-semibold mt-2 text-lg">
                            <ChfIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                            <span>
                                {data.price.toLocaleString("fr-CH")} CHF
                            </span>
                            {data.type === "rent" && (
                                <span className="text-gray-600 font-normal">
                                    /mois
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Caractéristiques principales */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-t border-b">
                        {data.features.rooms && (
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <Home className="h-6 w-6 mx-auto mb-2 text-red-600" />
                                <span className="block font-semibold">
                                    {data.features.rooms}
                                </span>
                                <span className="block text-sm text-gray-600">
                                    Pièces
                                </span>
                            </div>
                        )}
                        {data.features.area && (
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <Maximize className="h-6 w-6 mx-auto mb-2 text-red-600" />
                                <span className="block font-semibold">
                                    {data.features.area} m²
                                </span>
                                <span className="block text-sm text-gray-600">
                                    Surface
                                </span>
                            </div>
                        )}
                        {data.features.bathrooms && (
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <Bath className="h-6 w-6 mx-auto mb-2 text-red-600" />
                                <span className="block font-semibold">
                                    {data.features.bathrooms}
                                </span>
                                <span className="block text-sm text-gray-600">
                                    Salle(s) de bain
                                </span>
                            </div>
                        )}
                        {data.features.floor !== undefined && (
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <Building2 className="h-6 w-6 mx-auto mb-2 text-red-600" />
                                <span className="block font-semibold">
                                    {data.features.floor}
                                </span>
                                <span className="block text-sm text-gray-600">
                                    Étage
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    {data.description && (
                        <div className="space-y-3">
                            <h4 className="font-medium text-gray-900">
                                Description
                            </h4>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-700 whitespace-pre-wrap break-words">
                                    {data.description}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Modifier
                </button>
                <button
                    onClick={onNext}
                    className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                    Continuer
                    <ArrowRight className="ml-2 h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default Step4Preview;
