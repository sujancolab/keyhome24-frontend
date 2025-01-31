import React from 'react';
import { Home, Search, Users, Activity } from 'lucide-react';

const AdminStats = () => {
  const stats = [
    {
      icon: Home,
      label: 'Annonces immobilières',
      value: '1,234',
      change: '+12%',
      positive: true
    },
    {
      icon: Search,
      label: 'Demandes',
      value: '567',
      change: '+8%',
      positive: true
    },
    {
      icon: Users,
      label: 'Utilisateurs',
      value: '2,345',
      change: '+15%',
      positive: true
    },
    {
      icon: Activity,
      label: 'Utilisateurs en ligne',
      value: '123',
      change: '-5%',
      positive: false
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-50 rounded-lg">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
              </div>
              <span className={`text-xs sm:text-sm font-medium ${
                stat.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AdminStats;