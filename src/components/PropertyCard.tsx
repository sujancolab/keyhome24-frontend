import React from "react";
import { Link } from "react-router-dom";
import { MapPin, BedDouble, Bath, Maximize } from "lucide-react";
import { Property } from "../types/property";

interface PropertyCardProps {
    property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const formatPrice = (price: number, transactionType: "sell" | "rent") => {
        return (
            new Intl.NumberFormat("fr-CH", {
                style: "decimal",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(price) +
            ` CHF${transactionType === "rent" ? "/mois" : ""}`
        );
    };

    return (
        <Link
            to={`/property/${property.id}`}
            className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base rounded-lg shadow-lg">
                    <p className="font-bold">
                        {formatPrice(property.price, property.transactionType)}
                    </p>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-center text-gray-600 mb-2 text-sm">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">
                        {`${property.location.postalCode} ${property.location.city}, ${property.location.address}`}
                    </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-900 line-clamp-2">
                    {property.title}
                </h3>

                <div className="flex flex-wrap gap-3 sm:gap-4 text-gray-600 text-sm">
                    <div className="flex items-center">
                        <BedDouble className="h-4 w-4 mr-1" />
                        <span>{property.rooms}</span>
                    </div>
                    <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{property.baths}</span>
                    </div>
                    <div className="flex items-center">
                        <Maximize className="h-4 w-4 mr-1" />
                        <span>{property.area}m²</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;
