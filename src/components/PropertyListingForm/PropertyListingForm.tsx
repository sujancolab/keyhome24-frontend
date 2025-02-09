import React, { useState } from "react";
import { FormProvider, set, useForm } from "react-hook-form";
import { Home, Settings, Image, Eye, CreditCard } from "lucide-react";
import { PropertyFormData } from "../../types/propertyListing";
import StepIndicator from "./StepIndicator";
import Step1Details from "./Step1Details";
import Step2Features from "./Step2Features";
import Step3Images from "./Step3Images";
import Step4Preview from "./Step4Preview";
import Step5Payment from "./Step5Payment";
import Backend from "../../services/backend";

interface PropertyListingFormProps {
    onSubmit?: () => void;
}

const steps = [
    { icon: Home, label: "Détails" },
    { icon: Settings, label: "Caractéristiques" },
    { icon: Image, label: "Photos" },
    { icon: Eye, label: "Aperçu" },
    { icon: CreditCard, label: "Publication" },
];

const initialFormData: PropertyFormData = {
    type: "sell",
    category: "residential",
    propertyType: "",
    title: "",
    description: "",
    price: 0,
    location: {
        address: "",
        city: "",
        postalCode: "",
        canton: "",
    },
    features: {
        area: 0,
        rooms: 0,
        bathrooms: 0,
        floor: 0,
        totalFloors: 0,
        parkingSpaces: 0,
    },
    subscriptionPlan: "",
    paymentMethod: "",
    images: [],
};

const PropertyListingForm: React.FC<PropertyListingFormProps> = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const methods = useForm<PropertyFormData>({
        defaultValues: initialFormData,
        mode: "onChange",
    });

    const handleNext = () => {
        methods.trigger().then((isValid) => {
            if (isValid) {
                setCurrentStep((prev) => prev + 1);
            }
        });
    };

    const handleBack = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const handleSubmit = async () => {
        const { watch } = methods;
        const data: PropertyFormData = watch();

        data.price = Number(data.price);
        data.features.floor = Number(data.features.floor);
        data.features.area = Number(data.features.area);
        data.features.bathrooms = Number(data.features.bathrooms);
        data.features.rooms = Number(data.features.rooms);

        const res = await Backend.post("/annonces", {
            ...data,
        });

        if (res.stripe_url) {
            window.location.href = res.stripe_url;
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-12">
                <StepIndicator currentStep={currentStep} steps={steps} />
            </div>

            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(handleSubmit)}
                    className="space-y-8"
                >
                    <div className="mt-12">
                        {currentStep === 1 && (
                            <Step1Details onNext={handleNext} />
                        )}

                        {currentStep === 2 && (
                            <Step2Features
                                onNext={handleNext}
                                onBack={handleBack}
                            />
                        )}

                        {currentStep === 3 && (
                            <Step3Images
                                onNext={handleNext}
                                onBack={handleBack}
                            />
                        )}

                        {currentStep === 4 && (
                            <Step4Preview
                                onNext={handleNext}
                                onBack={handleBack}
                            />
                        )}

                        {currentStep === 5 && (
                            <Step5Payment
                                onBack={handleBack}
                                onSubmit={handleSubmit}
                            />
                        )}
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default PropertyListingForm;
