import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import SearchBar from "../components/SearchBar";
import TrustSection from "../components/TrustSection";
import PropertyHighlights from "../components/PropertyHighlights";

const HomePage = () => {
    const [searchType, setSearchType] = useState<"sell" | "rent">("sell");
    const [filters, setFilters] = useState({
        location: "",
        priceMax: undefined,
        propertyType: "",
        rooms: undefined,
    });

    const handleSearchTypeChange = (type: "sell" | "rent") => {
        setSearchType(type);
        setFilters({
            location: "",
            priceMax: undefined,
            propertyType: "",
            rooms: undefined,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section avec SearchBar */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 py-12 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
                        Trouvez Votre Bien Immobilier en Suisse
                    </h1>
                    <SearchBar
                        onSearchTypeChange={handleSearchTypeChange}
                        onFilterChange={setFilters}
                        searchType={searchType}
                        currentFilters={filters}
                    />
                </div>
            </div>

            {/* Biens immobiliers en vedette */}
            <PropertyHighlights />

            {/* Section de confiance */}
            <TrustSection />

            <Footer />
        </div>
    );
};

export default HomePage;
