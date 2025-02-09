import React from 'react';
import { Shield, CreditCard, HeadphonesIcon, Users } from 'lucide-react';

const TrustSection = () => {
  const trustPoints = [
    {
      icon: Shield,
      title: "Sécurité garantie",
      description: "Transactions sécurisées et données protégées"
    },
    {
      icon: CreditCard,
      title: "Tarifs transparents",
      description: "Prix compétitifs sans frais cachés"
    },
    {
      icon: HeadphonesIcon,
      title: "Service support",
      description: "Une équipe après-vente disponible 7j/7"
    },
    {
      icon: Users,
      title: "Visibilité maximale",
      description: "Augmentez la visibilité grâce à nos campagnes"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Pourquoi nous faire confiance ?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div 
                key={index} 
                className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                  <Icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {point.title}
                </h3>
                <p className="text-gray-600">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;