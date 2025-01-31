import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import PropertyGrid from "../components/PropertyGrid";
import RequestsGrid from "../components/RequestsGrid";
import SearchBar from "../components/SearchBar";

const SearchResultsPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const listingType = searchParams.get("listingType") || "property"; // 'property' ou 'request'

    const [searchType, setSearchType] = useState<"sell" | "rent">(
        (searchParams.get("type") as "sell" | "rent") || "sell"
    );
    const [filters, setFilters] = useState({
        location: searchParams.get("location") || "",
        priceMax: searchParams.get("priceMax")
            ? Number(searchParams.get("priceMax"))
            : undefined,
        propertyType: searchParams.get("propertyType") || "",
        rooms: searchParams.get("rooms")
            ? Number(searchParams.get("rooms"))
            : undefined,
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

            <div className="bg-gradient-to-r from-red-600 to-red-800 py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center space-x-4 mb-8">
                        <button
                            onClick={() => setListingType("property")}
                            className={`px-6 py-2 rounded-lg font-medium ${
                                listingType === "property"
                                    ? "bg-white text-red-600"
                                    : "bg-red-700 text-white hover:bg-red-600"
                            }`}
                        >
                            Annonces immobilières
                        </button>
                        {/*<button
                            onClick={() => setListingType("request")}
                            className={`px-6 py-2 rounded-lg font-medium ${
                                listingType === "request"
                                    ? "bg-white text-red-600"
                                    : "bg-red-700 text-white hover:bg-red-600"
                            }`}
                        >
                            Demandes de recherche
                        </button>*/}
                    </div>

                    <SearchBar
                        onSearchTypeChange={handleSearchTypeChange}
                        onFilterChange={setFilters}
                        searchType={searchType}
                        currentFilters={filters}
                        listingType={listingType}
                    />
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {listingType === "property" ? (
                    <PropertyGrid searchType={searchType} filters={filters} />
                ) : (
                    <RequestsGrid searchType={searchType} filters={filters} />
                )}
            </main>

            <Footer />
        </div>
    );
};

export default SearchResultsPage;
