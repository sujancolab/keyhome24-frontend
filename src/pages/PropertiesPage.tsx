import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import PropertyGrid from '../components/PropertyGrid';
import SearchBar from '../components/SearchBar';
import { useLocation } from 'react-router-dom';

const PropertiesPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const [searchType, setSearchType] = React.useState<'buy' | 'rent'>(
    searchParams.get('type') as 'buy' | 'rent' || 'rent' // Changé de 'buy' à 'rent' par défaut
  );
  const [filters, setFilters] = React.useState({
    location: searchParams.get('location') || '',
    priceMax: searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : undefined,
    propertyType: searchParams.get('propertyType') || '',
    rooms: searchParams.get('rooms') ? Number(searchParams.get('rooms')) : undefined
  });

  const handleSearchTypeChange = (type: 'buy' | 'rent') => {
    setSearchType(type);
    setFilters({
      location: '',
      priceMax: undefined,
      propertyType: '',
      rooms: undefined
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-gradient-to-r from-red-600 to-red-800 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            {searchType === 'buy' ? 'Acheter un bien' : 'Louer un bien'}
          </h1>

          <SearchBar 
            onSearchTypeChange={handleSearchTypeChange}
            onFilterChange={setFilters}
            searchType={searchType}
            currentFilters={filters}
          />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <PropertyGrid 
          searchType={searchType}
          filters={filters}
        />
      </main>

      <Footer />
    </div>
  );
};

export default PropertiesPage;