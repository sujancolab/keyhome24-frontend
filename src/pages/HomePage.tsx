import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import SearchBar from "../components/SearchBar";
import TrustSection from "../components/TrustSection";
import PropertyHighlights from "../components/PropertyHighlights";
import { Home, Users, Key } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
const HomePage = () => {
    const [searchType, setSearchType] = useState<"sell" | "rent" | 'colocation'>("sell");
    const [filters, setFilters] = useState({
        location: "",
        priceMax: undefined,
        propertyType: "",
        rooms: undefined,
    });
    const navigate = useNavigate();
    const handleSearchTypeChange = (type: "sell" | "rent" | 'colocation') => {
        setSearchType(type);
        setFilters({
            location: "",
            priceMax: undefined,
            propertyType: "",
            rooms: undefined,
        });
    };
    const [selectedType, setSelectedType] = useState<"rent" | "sell" | "colocation">("rent");
    const handleTypeChange = (type: "rent" | "sell" | "colocation") => {
        setSelectedType(type);
        if (type === 'colocation') {
          navigate('/requests');
        } else {
          navigate(`/properties?type=${type}`);
        }
    };
    const filterOptions = [
      {
        type: 'rent',
        icon: Key,
        label: 'Louer',
        mobileLabel: 'Location'
      },
      {
        type: 'sell',
        icon: Home,
        label: 'Acheter',
        mobileLabel: 'Achat'
      },
      {
        type: 'colocation',
        icon: Users,
        label: 'Colocation',
        mobileLabel: 'Coloc'
      }
    ];
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section avec SearchBar */}
            {/* <div className="bg-gradient-to-r from-red-600 to-red-800 py-12 sm:py-20">
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
            </div> */}
                <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
            Trouvez Votre Bien Immobilier en Suisse
          </h1>

          <div className="flex flex-col items-center">
            <div className="w-full max-w-lg">
              <div className="bg-white p-1.5 rounded-xl shadow-lg">
                <div className="grid grid-cols-3 gap-1.5">
                  {filterOptions.map(({ type, icon: Icon, label, mobileLabel }) => (
                    <button
                      key={type}
                      onClick={() => handleTypeChange(type)}
                      className={`flex flex-col sm:flex-row items-center justify-center px-2 sm:px-4 py-2.5 sm:py-3.5 rounded-lg font-medium ${
                        selectedType === type
                          ? 'bg-red-600 text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5 mb-1 sm:mb-0 sm:mr-2" />
                      <span className="text-xs sm:text-base">
                        <span className="hidden sm:inline">{label}</span>
                        <span className="sm:hidden">{mobileLabel}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
