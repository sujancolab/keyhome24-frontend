import React from 'react';
import { Upload, Search } from 'lucide-react';

interface DashboardHeaderProps {
  onAddListing: () => void;
  onAddRequest: () => void;
}

const DashboardHeader = ({ onAddListing, onAddRequest }: DashboardHeaderProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Publier une annonce</h2>
            <p className="text-red-100 mb-4">
              Créez une annonce attractive pour votre bien
            </p>
            <button
              onClick={onAddListing}
              className="bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-all transform hover:scale-105 flex items-center font-semibold shadow-md"
            >
              <Upload className="h-5 w-5 mr-2" />
              Ajouter une annonce
            </button>
          </div>
          <Upload className="h-12 w-12 text-red-200" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Publier une demande</h2>
            <p className="text-blue-100 mb-4">
              Créez une demande pour trouver votre bien idéal
            </p>
            <button
              onClick={onAddRequest}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center font-semibold shadow-md"
            >
              <Search className="h-5 w-5 mr-2" />
              Publier une demande
            </button>
          </div>
          <Search className="h-12 w-12 text-blue-200" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;