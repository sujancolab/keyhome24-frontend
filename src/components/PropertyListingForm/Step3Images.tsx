import React, { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
    ArrowLeft,
    ArrowRight,
    Upload,
    File,
    X,
    AlertCircle,
} from "lucide-react";
import { PropertyFormData } from "../../types/propertyListing";

interface Step3ImagesProps {
    onNext: () => void;
    onBack: () => void;
}

const Step3Images: React.FC<Step3ImagesProps> = ({ onNext, onBack }) => {
    const { watch, setValue } = useFormContext<PropertyFormData>();
    const images: string[] = watch("images") || [];
    const [error, setError] = useState("");

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageUpload = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(e.target.files || []);
            const totalSize = files.reduce((acc, file) => acc + file.size, 0);
            const totalImages = images.length + files.length;

            if (totalImages > 5) {
                setError("Vous ne pouvez pas télécharger plus de 5 images");
                return;
            }

            if (totalSize > 10 * 1024 * 1024) {
                // 10MB max
                setError(
                    "La taille totale des images ne doit pas dépasser 10MB"
                );
                return;
            }

            setError("");
            const base64Images = await Promise.all(files.map(convertToBase64));
            setValue("images", [...images, ...base64Images]);
        },
        [images, setValue]
    );

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setValue("images", newImages);
    };

    return (
        <div className="space-y-8">
            <div className="form-section">
                <h2 className="text-xl font-semibold mb-6">
                    Photos et documents
                </h2>

                {error && (
                    <div className="mb-6 flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {/* Image Upload */}
                <div className="space-y-4 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Photos (max. 5) *
                        </label>
                        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-red-500 transition-colors">
                            <div className="space-y-2 text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label className="relative cursor-pointer rounded-md font-medium text-red-600 hover:text-red-500">
                                        <span>Télécharger des photos</span>
                                        <input
                                            type="file"
                                            className="sr-only"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageUpload}
                                            disabled={images.length >= 5}
                                        />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500">
                                    PNG, JPG jusqu'à 10MB
                                </p>
                                <p className="text-xs text-gray-500">
                                    {images.length}/5 images
                                </p>
                            </div>
                        </div>
                    </div>

                    {images.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {images.map((base64: string, index: number) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={base64}
                                        alt={`Preview ${index + 1}`}
                                        className="h-24 w-full object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Retour
                </button>
                <button
                    type="button"
                    onClick={onNext}
                    className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                    disabled={images.length === 0}
                >
                    Continuer
                    <ArrowRight className="ml-2 h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default Step3Images;
