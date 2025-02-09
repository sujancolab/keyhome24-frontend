import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, ArrowDown, BedDouble } from "lucide-react";
import ChfIcon from "./ChfIcon";
import { useQuery } from "@tanstack/react-query";
import Backend from "../services/backend";

interface SearchBarProps {
    onSearchTypeChange: (type: "sell" | "rent") => void;
    onFilterChange: (filters: {
        location: string;
        priceMax?: number;
        propertyType: string;
        rooms?: number;
    }) => void;
    searchType: "sell" | "rent";
    currentFilters: {
        location: string;
        priceMax?: number;
        propertyType: string;
        rooms?: number;
    };
}

const propertyTypes = [
    { value: "apartment", label: "Appartement" },
    { value: "house", label: "Maison" },
    { value: "villa", label: "Villa" },
    { value: "chalet", label: "Chalet" },
    { value: "loft", label: "Loft" },
    { value: "studio", label: "Studio" },
    { value: "duplex", label: "Duplex" },
    { value: "penthouse", label: "Penthouse" },
    { value: "office", label: "Bureau" },
    { value: "shop", label: "Commerce" },
    { value: "restaurant", label: "Restaurant" },
    { value: "warehouse", label: "Entrepôt" },
    { value: "industrial", label: "Local industriel" },
    { value: "hotel", label: "Hôtel" },
    { value: "buildingLand", label: "Terrain à bâtir" },
    { value: "agriculturalLand", label: "Terrain agricole" },
    { value: "industrialLand", label: "Terrain industriel" },
    { value: "indoorParking", label: "Place intérieure" },
    { value: "outdoorParking", label: "Place extérieure" },
    { value: "garage", label: "Garage individuel" },
    { value: "carport", label: "Carport" },
];

const SearchBar: React.FC<SearchBarProps> = ({
    onSearchTypeChange,
    onFilterChange,
    searchType,
    currentFilters,
}) => {
    const navigate = useNavigate();

    const { isLoading, data } = useQuery({
        queryKey: ["annonceData"],
        queryFn: () => Backend.get("/annonces"),
    });

    const [location, setLocation] = useState(currentFilters.location);
    const [priceMax, setPriceMax] = useState(
        currentFilters.priceMax?.toString() || ""
    );
    const [propertyType, setPropertyType] = useState(
        currentFilters.propertyType
    );
    const [rooms, setRooms] = useState(currentFilters.rooms?.toString() || "");

    if (isLoading && !data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    const uniqueRooms = Array.from(
        new Set(
            !isLoading && data && data.length > 0 &&
                data
                    .filter((p) => p.transactionType === searchType)
                    .map((p) => p.rooms)
        )
    ).sort((a, b) => a - b);

    const generatePriceRanges = () => {
        const maxPrice = searchType === "sell" ? 5000000 : 10000;
        const step = searchType === "sell" ? 500000 : 1000;
        const ranges = [];

        for (let price = step; price <= maxPrice; price += step) {
            ranges.push({
                label: `Jusqu'à ${new Intl.NumberFormat("fr-CH").format(
                    price
                )} CHF${searchType === "rent" ? "/mois" : ""}`,
                value: price,
            });
        }

        return ranges;
    };

    const handleSearch = () => {
        const filters = {
            location,
            priceMax: priceMax ? parseInt(priceMax) : undefined,
            propertyType,
            rooms: rooms ? parseFloat(rooms) : undefined,
        };

        onFilterChange(filters);

        const searchParams = new URLSearchParams();
        searchParams.set("type", searchType);
        if (location) searchParams.set("location", location);
        if (priceMax) searchParams.set("priceMax", priceMax);
        if (propertyType) searchParams.set("propertyType", propertyType);
        if (rooms) searchParams.set("rooms", rooms);

        navigate(`/properties?${searchParams.toString()}`);
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="flex gap-2 mb-4">
                    <button
                        className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-all ${
                            searchType === "sell"
                                ? "bg-red-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        onClick={() => onSearchTypeChange("sell")}
                    >
                        Acheter
                    </button>
                    <button
                        className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-all ${
                            searchType === "rent"
                                ? "bg-red-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        onClick={() => onSearchTypeChange("rent")}
                    >
                        Louer
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
                    <div className="lg:col-span-3 relative">
                        <input
                            type="text"
                            placeholder="Canton, ville ou code postal"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500"
                        />
                        <MapPin className="absolute left-3 top-2.5 sm:top-3.5 h-5 w-5 text-gray-400" />
                    </div>

                    <div className="lg:col-span-3 relative">
                        <select
                            value={priceMax}
                            onChange={(e) => setPriceMax(e.target.value)}
                            className="w-full pl-10 pr-8 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 appearance-none"
                        >
                            <option value="">Prix en CHF</option>
                            {generatePriceRanges().map((range) => (
                                <option key={range.value} value={range.value}>
                                    {range.label}
                                </option>
                            ))}
                        </select>
                        <ChfIcon className="absolute left-3 top-2.5 sm:top-3.5 h-5 w-5 text-gray-400" />
                        <ArrowDown className="absolute right-3 top-2.5 sm:top-3.5 h-5 w-5 text-gray-400" />
                    </div>

                    <div className="lg:col-span-3 relative">
                        <select
                            value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value)}
                            className="w-full pl-10 pr-8 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 appearance-none"
                        >
                            <option value="">Type de bien</option>
                            {propertyTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                        <Home className="absolute left-3 top-2.5 sm:top-3.5 h-5 w-5 text-gray-400" />
                        <ArrowDown className="absolute right-3 top-2.5 sm:top-3.5 h-5 w-5 text-gray-400" />
                    </div>

                    <div className="lg:col-span-2 relative">
                        <select
                            value={rooms}
                            onChange={(e) => setRooms(e.target.value)}
                            className="w-full pl-10 pr-8 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 appearance-none"
                        >
                            <option value="">Pièces</option>
                            {uniqueRooms.map((room) => (
                                <option key={room} value={room}>
                                    {room} pièces
                                </option>
                            ))}
                        </select>
                        <BedDouble className="absolute left-3 top-2.5 sm:top-3.5 h-5 w-5 text-gray-400" />
                        <ArrowDown className="absolute right-3 top-2.5 sm:top-3.5 h-5 w-5 text-gray-400" />
                    </div>

                    <div className="lg:col-span-1">
                        <button
                            onClick={handleSearch}
                            className="w-full bg-red-600 text-white h-full min-h-[2.5rem] sm:min-h-[2.75rem] px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
