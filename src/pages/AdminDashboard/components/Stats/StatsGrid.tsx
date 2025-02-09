import React from 'react';
import StatCard from './StatCard';
import { Home, Users, Search, Activity } from 'lucide-react';

const StatsGrid = () => {
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
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;