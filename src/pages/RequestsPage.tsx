import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import RequestsGrid from "../components/RequestsGrid";
import RequestSearchBar from "../components/RequestSearchBar";
import { useLocation } from "react-router-dom";

const RequestsPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [searchType, setSearchType] = React.useState<"sell" | "rent">(
        (searchParams.get("type") as "sell" | "rent") || "sell"
    );
    const [filters, setFilters] = React.useState({
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

            <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-white text-center mb-8">
                        Demandes de recherche
                    </h1>

                    <RequestSearchBar
                        onSearchTypeChange={handleSearchTypeChange}
                        onFilterChange={setFilters}
                        searchType={searchType}
                        currentFilters={filters}
                        theme="blue"
                    />
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <RequestsGrid
                    searchType={searchType}
                    filters={filters}
                    theme="blue"
                />
            </main>

            <Footer />
        </div>
    );
};

export default RequestsPage;
