import React, { useEffect, useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Share2,
    Navigation2,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import ContactForm from "./ContactForm";
import LocationInfo from "./LocationInfo";
import { useQuery } from "@tanstack/react-query";
import Backend from "../../services/backend";

interface PropertyDetailProps {
    property: {
        id: string;
        title: string;
        description: string;
        price: number;
        images: string[];
        location: {
            address: string;
            city: string;
            npa: string;
        };
        features: {
            rooms: number;
            bathrooms: number;
            area: number;
            floor: number;
            totalFloors: number;
            yearBuilt: number;
            orientation: string;
            heatingType: string;
            energyClass: string;
            availability: string;
        };
        amenities: {
            interior: string[];
            exterior: string[];
            security: string[];
            energy: string[];
        };
        proximity: {
            transport: string[];
            education: string[];
            shopping: string[];
            leisure: string[];
        };
        agent: {
            name: string;
            title: string;
            company: string;
            phone: string;
            email: string;
            image: string;
        };
        documents: Array<{
            name: string;
            type: string;
            url: string;
        }>;
    };
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showContactForm, setShowContactForm] = useState(false);

    const { isLoading, data } = useQuery({
        queryKey: ["repoData"],
        queryFn: () => Backend.get("/annonces/" + property.id),
    });

    const [dataUser, setDataUser] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
    });
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await Backend.get(
                    `/users/${!isLoading && data.userId}`
                );
                setDataUser(response);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération de l'agent:",
                    error
                );
            }
        };

        if (!isLoading) {
            fetchUser();
        }
    }, [isLoading, data]);

    const nextImage = () => {
        if (!property.images?.length) return;
        setCurrentImageIndex((prev) =>
            prev === property.images.length + 2 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        if (!property.images?.length) return;
        setCurrentImageIndex((prev) =>
            prev === 0 ? property.images.length - 1 : prev - 1
        );
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("fr-CH", {
            style: "currency",
            currency: "CHF",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleShare = async () => {
        try {
            const shareData = {
                title: property.title,
                text: `${property.title} - ${formatPrice(property.price)}`,
                url: window.location.href,
            };

            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert("Lien copié dans le presse-papier !");
            }
        } catch (error) {
            console.error("Erreur lors du partage:", error);
        }
    };

    const handleGetDirections = () => {
        const address = encodeURIComponent(
            `${!isLoading && data.location.address}, ${
                !isLoading && data.location.npa
            } ${!isLoading && data.location.city}`
        );
        window.open(
            `https://www.google.com/maps/search/?api=1&query=${address}`,
            "_blank"
        );
    };

    if (isLoading && dataUser.name.length > 1) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image Gallery */}
                        <div className="relative aspect-[4/3] sm:aspect-[16/9] rounded-lg overflow-hidden shadow-lg bg-gray-200">
                            <img
                                src={
                                    !isLoading &&
                                    data.images &&
                                    data.images[currentImageIndex]
                                }
                                alt={!isLoading && data.title}
                                className="w-full h-full object-cover"
                            />
                            {!isLoading &&
                                data.images &&
                                data.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white/90 transition-colors"
                                        >
                                            <ChevronLeft className="h-6 w-6" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white/90 transition-colors"
                                        >
                                            <ChevronRight className="h-6 w-6" />
                                        </button>
                                    </>
                                )}
                            <div className="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm">
                                {currentImageIndex + 1} /{" "}
                                {!isLoading &&
                                    data.images &&
                                    data.images.length}
                            </div>
                        </div>

                        {/* Property Info */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="p-6">
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">
                                            {!isLoading && data.title}
                                        </h1>
                                        <p className="text-gray-600 mt-2">
                                            {!isLoading &&
                                                data.location &&
                                                data.location.address}
                                            ,{" "}
                                            {!isLoading &&
                                                data.location &&
                                                data.location.npa}{" "}
                                            {!isLoading &&
                                                data.location &&
                                                data.location.city}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <p className="text-3xl font-bold text-gray-900">
                                            {formatPrice(
                                                !isLoading && data.price
                                            )}
                                        </p>
                                        <p className="text-green-600 flex items-center justify-end mt-2">
                                            <MapPin className="h-5 w-5 mr-1" />
                                            Disponible Immédiatement
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <p className="font-semibold text-lg">
                                            {!isLoading &&
                                                data.features &&
                                                data.features.rooms}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Pièces
                                        </p>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <p className="font-semibold text-lg">
                                            {!isLoading &&
                                                data.features &&
                                                data.features.area}{" "}
                                            m²
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Surface
                                        </p>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <p className="font-semibold text-lg">
                                            {!isLoading &&
                                                data.features &&
                                                data.features.bathrooms}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Salle de bains
                                        </p>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <p className="font-semibold text-lg">
                                            {!isLoading &&
                                                data.features &&
                                                data.features.floor}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Étage
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t pt-6">
                                    <h2 className="text-xl font-semibold mb-4">
                                        Description
                                    </h2>
                                    <p className="text-gray-700 whitespace-pre-line">
                                        {!isLoading && data.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Features 
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold mb-6">
                                Caractéristiques
                            </h2>
                            <div className="space-y-8">
                                {property.amenities.interior?.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">
                                            Intérieur
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {property.amenities.interior.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center space-x-2"
                                                    >
                                                        <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                                                        <span>{item}</span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                                {property.amenities.exterior?.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">
                                            Extérieur
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {property.amenities.exterior.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center space-x-2"
                                                    >
                                                        <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                                                        <span>{item}</span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>*/}

                        {/* Location */}
                        <LocationInfo
                            location={!isLoading && data.location}
                            proximity={property.proximity}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Actions */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="space-y-4">
                                <a
                                    href={`tel:${dataUser && dataUser.phone}`}
                                    className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                                >
                                    <Phone className="h-5 w-5 mr-2" />
                                    {dataUser && dataUser.phone}
                                </a>
                                <a
                                    href={`mailto:${
                                        dataUser && dataUser.email
                                    }`}
                                    className="w-full border border-red-600 text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
                                >
                                    <Mail className="h-5 w-5 mr-2" />
                                    {dataUser && dataUser.email}
                                </a>
                                <button
                                    onClick={handleShare}
                                    className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                                >
                                    <Share2 className="h-5 w-5 mr-2" />
                                    Partager l'annonce
                                </button>
                            </div>
                        </div>

                        {/* Agent Card */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${
                                        dataUser && dataUser.name
                                    }&background=random`}
                                    alt={dataUser && dataUser.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold">
                                        {dataUser && dataUser.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Annonceur(ceuse)
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleGetDirections}
                                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                            >
                                <Navigation2 className="h-5 w-5 mr-2" />
                                Itinéraire
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Contact Form Modal */}
            {showContactForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
                    <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-xl p-6 animate-slide-up">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                Contacter l'agent
                            </h3>
                            <button
                                onClick={() => setShowContactForm(false)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                ×
                            </button>
                        </div>
                        <ContactForm />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyDetail;
