import React from 'react';
import { Link } from 'react-router-dom';
import ActionCard from './ActionCard';
import { Upload, Search } from 'lucide-react';

interface ActionsGridProps {
  onAddListing: () => void;
  onAddRequest: () => void;
}

const ActionsGrid: React.FC<ActionsGridProps> = () => {
  const actions = [
    {
      title: 'Publier une annonce',
      description: 'Créez une annonce attractive pour votre bien',
      buttonLabel: 'Ajouter une annonce',
      icon: Upload,
      path: '/dashboard/add-listing',
      gradient: 'bg-gradient-to-r from-red-600 to-red-700',
      textColor: 'text-red-100',
      buttonColor: 'text-red-600 hover:bg-red-50'
    },
    {
      title: 'Publier une demande',
      description: 'Créez une demande pour trouver votre bien idéal',
      buttonLabel: 'Publier une demande',
      icon: Search,
      path: '/dashboard/add-request',
      gradient: 'bg-gradient-to-r from-blue-600 to-blue-700',
      textColor: 'text-blue-100',
      buttonColor: 'text-blue-600 hover:bg-blue-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {actions.map((action, index) => (
        <div key={index} className={`${action.gradient} rounded-xl p-6 text-white shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">{action.title}</h2>
              <p className={`${action.textColor} mb-4`}>
                {action.description}
              </p>
              <Link
                to={action.path}
                className={`bg-white ${action.buttonColor} px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 flex items-center font-semibold shadow-md`}
              >
                <action.icon className="h-5 w-5 mr-2" />
                {action.buttonLabel}
              </Link>
            </div>
            <action.icon className={`h-12 w-12 ${action.textColor}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActionsGrid;