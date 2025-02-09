import React from 'react';
import { PropertyType, propertyCategories, propertyTypeLabels } from '../../types/propertyListing';
import { Building2 } from 'lucide-react';

interface PropertyTypeSelectorProps {
  selectedType: PropertyType | '';
  onChange: (type: PropertyType) => void;
}

const PropertyTypeSelector: React.FC<PropertyTypeSelectorProps> = ({ selectedType, onChange }) => {
  return (
    <div className="relative">
      <select
        value={selectedType}
        onChange={(e) => onChange(e.target.value as PropertyType)}
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 appearance-none"
      >
        <option value="">Sélectionnez un type de bien</option>
        
        {propertyCategories.map((category) => (
          <optgroup key={category.id} label={category.label}>
            {category.types.map((type) => (
              <option key={type} value={type}>
                {propertyTypeLabels[type as PropertyType]}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
          <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

export default PropertyTypeSelector;