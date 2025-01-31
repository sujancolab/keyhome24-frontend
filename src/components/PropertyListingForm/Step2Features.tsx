import React from "react";
import { useFormContext } from "react-hook-form";
import { PropertyFormData, propertyTypes } from "../../types/propertyListing";
import {
    ResidentialFeaturesForm,
    CommercialFeaturesForm,
    LandFeaturesForm,
    ParkingFeaturesForm,
} from "./features";

interface Step2FeaturesProps {
    onNext: () => void;
    onBack: () => void;
}

const Step2Features: React.FC<Step2FeaturesProps> = ({ onNext, onBack }) => {
    const { watch } = useFormContext<PropertyFormData>();
    const propertyType = watch("propertyType");
    const selectedType = propertyTypes[propertyType];

    const getFeatureForm = () => {
        if (!selectedType) return null;

        switch (selectedType.category) {
            case "residential":
                return <ResidentialFeaturesForm />;
            case "commercial":
                return <CommercialFeaturesForm />;
            case "land":
                return <LandFeaturesForm />;
            case "parking":
                return <ParkingFeaturesForm />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-8">
            <div className="form-section">
                <h2 className="text-xl font-semibold mb-6">
                    Caractéristiques du {selectedType?.label.toLowerCase()}
                </h2>
                {getFeatureForm()}
            </div>

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                >
                    Retour
                </button>
                <button
                    type="button"
                    onClick={onNext}
                    className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Continuer
                </button>
            </div>
        </div>
    );
};

export default Step2Features;
