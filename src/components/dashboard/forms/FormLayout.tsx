import React from 'react';

interface FormLayoutProps {
  title: string;
  children: React.ReactNode;
  onBack?: () => void;
}

const FormLayout: React.FC<FormLayoutProps> = ({ title, children, onBack }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      {onBack && (
        <button
          onClick={onBack}
          className="mb-4 text-gray-600 hover:text-gray-900 flex items-center"
        >
          ← Retour
        </button>
      )}
      
      <h2 className="text-xl sm:text-2xl font-bold mb-6">{title}</h2>
      
      <div className="max-w-3xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default FormLayout;