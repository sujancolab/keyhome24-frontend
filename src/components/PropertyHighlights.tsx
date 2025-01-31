import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
//import { properties } from "../data/properties";
import { useQuery } from "@tanstack/react-query";
import Backend from "../services/backend";

const PropertyHighlights = () => {
    const { isLoading, data } = useQuery({
        queryKey: ["repoData"],
        queryFn: () => Backend.get("/annonces"),
    });

    if (isLoading) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Biens en vedette
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <div className="aspect-[4/3] bg-gray-300 animate-pulse"></div>
                                <div className="p-6">
                                    <div className="bg-gray-300 h-4 w-20 animate-pulse mb-2"></div>
                                    <div className="bg-gray-300 h-4 w-32 animate-pulse mb-4"></div>
                                    <div className="flex justify-between items-center">
                                        <div className="bg-gray-300 h-4 w-16 animate-pulse"></div>
                                        <div className="bg-gray-300 h-4 w-16 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Biens en vedette
                    </h2>
                    <Link
                        to="/search"
                        className="text-red-600 hover:text-red-700 flex items-center font-medium"
                    >
                        Voir plus
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {!isLoading &&
                        data &&
                        data.length > 0 &&
                        data.slice(0, 3).map((property) => (
                            <Link
                                key={property.id}
                                to={`/property/${property.id}`}
                                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={property.images[0]}
                                        alt={property.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {property.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {property.location.city},{" "}
                                        {property.location.postalCode}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-red-600">
                                            {new Intl.NumberFormat("fr-CH", {
                                                style: "currency",
                                                currency: "CHF",
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            }).format(property.price)}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {property.area} m² •{" "}
                                            {property.rooms} pièces
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default PropertyHighlights;
