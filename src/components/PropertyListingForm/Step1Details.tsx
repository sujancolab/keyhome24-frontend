import React from "react";
import { useFormContext } from "react-hook-form";
import { Home, MapPin, ChevronRight } from "lucide-react";
import {
    PropertyFormData,
    propertyCategories,
    propertyTypes,
} from "../../types/propertyListing";
import { cantons } from "../../data/cantons";

const Step1Details: React.FC<{ onNext: () => void }> = ({ onNext }) => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<PropertyFormData>();
    const selectedCategory = watch("category");
    const selectedType = watch("type");

    // Filtrer les types de bien selon la catégorie sélectionnée
    const filteredPropertyTypes = Object.values(propertyTypes).filter(
        (type) => type.category === selectedCategory
    );

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Détails du bien</h2>

                {/* Type de transaction */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type d'annonce *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <label
                            className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors ${
                                selectedType === "sell"
                                    ? "border-red-500 bg-red-50 text-red-700"
                                    : "border-gray-200 hover:border-red-200"
                            }`}
                        >
                            <input
                                type="radio"
                                {...register("type")}
                                value="sell"
                                className="sr-only"
                            />
                            <span className="font-medium">Vendre</span>
                        </label>
                        <label
                            className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors ${
                                selectedType === "rent"
                                    ? "border-red-500 bg-red-50 text-red-700"
                                    : "border-gray-200 hover:border-red-200"
                            }`}
                        >
                            <input
                                type="radio"
                                {...register("type")}
                                value="rent"
                                className="sr-only"
                            />
                            <span className="font-medium">Louer</span>
                        </label>
                    </div>
                </div>

                {/* Catégorie de bien */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Catégorie *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {Object.entries(propertyCategories).map(
                            ([value, label]) => (
                                <label
                                    key={value}
                                    className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors ${
                                        selectedCategory === value
                                            ? "border-red-500 bg-red-50 text-red-700"
                                            : "border-gray-200 hover:border-red-200"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        {...register("category")}
                                        value={value}
                                        className="sr-only"
                                    />
                                    <span className="font-medium">{label}</span>
                                </label>
                            )
                        )}
                    </div>
                </div>

                {/* Type de bien */}
                {selectedCategory && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Type de bien *
                        </label>
                        <div className="relative">
                            <select
                                {...register("propertyType", {
                                    required: "Le type de bien est requis",
                                })}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500"
                            >
                                <option value="">Sélectionnez un type</option>
                                {filteredPropertyTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                            <Home className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        </div>
                        {errors.propertyType && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.propertyType.message}
                            </p>
                        )}
                    </div>
                )}

                {/* Reste du formulaire... */}
                {/* Prix */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prix *
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            {...register("price", {
                                required: "Le prix est requis",
                                min: {
                                    value: 1,
                                    message: "Le prix doit être supérieur à 0",
                                },
                            })}
                            className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500"
                            placeholder="Prix en CHF"
                        />
                        <span className="absolute right-3 top-3 text-gray-500">
                            CHF
                        </span>
                    </div>
                    {errors.price && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.price.message}
                        </p>
                    )}
                </div>

                {/* Localisation */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">
                        Localisation *
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Canton *
                            </label>
                            <div className="relative">
                                <select
                                    {...register("location.canton", {
                                        required: "Le canton est requis",
                                    })}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="">Sélectionnez</option>
                                    {cantons.map((canton) => (
                                        <option
                                            key={canton.code}
                                            value={canton.code}
                                        >
                                            {canton.name}
                                        </option>
                                    ))}
                                </select>
                                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            </div>
                            {errors.location?.canton && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.location.canton.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                NPA *
                            </label>
                            <input
                                type="text"
                                {...register("location.postalCode", {
                                    required: "Le NPA est requis",
                                    pattern: {
                                        value: /^\d{4}$/,
                                        message:
                                            "Le NPA doit contenir 4 chiffres",
                                    },
                                })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500"
                                placeholder="1000"
                            />
                            {errors.location?.postalCode && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.location.postalCode.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Ville *
                            </label>
                            <input
                                type="text"
                                {...register("location.city", {
                                    required: "La ville est requise",
                                })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500"
                                placeholder="Lausanne"
                            />
                            {errors.location?.city && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.location.city.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Adresse *
                            </label>
                            <input
                                type="text"
                                {...register("location.address", {
                                    required: "L'adresse est requise",
                                })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500"
                                placeholder="Rue du Lac 1"
                            />
                            {errors.location?.address && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.location.address.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Titre */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Titre de l'annonce *
                    </label>
                    <input
                        type="text"
                        {...register("title", {
                            required: "Le titre est requis",
                            minLength: {
                                value: 10,
                                message:
                                    "Le titre doit contenir au moins 10 caractères",
                            },
                        })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500"
                        placeholder="Ex: Magnifique appartement avec vue sur le lac"
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                    </label>
                    <textarea
                        {...register("description", {
                            required: "La description est requise",
                            minLength: {
                                value: 50,
                                message:
                                    "La description doit contenir au moins 50 caractères",
                            },
                        })}
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500"
                        placeholder="Décrivez votre bien en détail..."
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.description.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onNext}
                    className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                    Suivant
                    <ChevronRight className="ml-2 h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default Step1Details;
