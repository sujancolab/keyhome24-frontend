import React from 'react';
import StatCard from './StatCard';
import { Eye, Heart, Clock, Home } from 'lucide-react';
import { UserListing } from '../../types';

interface StatsGridProps {
  listings: UserListing[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ listings }) => {
  const activeListings = listings.filter(listing => listing.status === 'active');
  const totalViews = listings.reduce((total, listing) => total + listing.views, 0);

  const stats = [
    {
      icon: Home,
      label: 'Annonces actives',
      value: activeListings.length,
      change: '+2%',
      positive: true
    },
    {
      icon: Eye,
      label: 'Vues totales',
      value: totalViews,
      change: '+15%',
      positive: true
    },
    {
      icon: Heart,
      label: 'Favoris',
      value: '45',
      change: '+5%',
      positive: true
    },
    {
      icon: Clock,
      label: 'Dernière activité',
      value: 'Il y a 2h',
      change: '',
      positive: true
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;