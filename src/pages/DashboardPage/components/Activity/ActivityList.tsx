import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ActivityItem from './ActivityItem';
import { UserListing } from '../../types';

interface ActivityListProps {
  listings?: UserListing[];
  requests?: any[];
}

const ActivityList: React.FC<ActivityListProps> = ({ listings = [], requests = [] }) => {
  // Ensure we have arrays even if props are undefined
  const listingActivities = listings.map(listing => ({
    type: 'listing',
    message: `Votre annonce "${listing.title}" a reçu ${listing.views} vues`,
    time: 'Récemment',
    status: listing.status
  }));

  const requestActivities = requests.map(request => ({
    type: 'request',
    message: `Votre demande "${request.title}" est ${request.status === 'active' ? 'active' : 'en attente'}`,
    time: request.createdAt,
    status: request.status
  }));

  const recentActivity = [...listingActivities, ...requestActivities]
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Activité récente</h2>
        <Link 
          to="/dashboard/activity"
          className="text-red-600 hover:text-red-700 flex items-center text-sm font-medium"
        >
          Voir tout
          <ArrowUpRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="space-y-4">
        {recentActivity.length > 0 ? (
          recentActivity.map((activity, index) => (
            <ActivityItem
              key={index}
              message={activity.message}
              time={activity.time}
              status={activity.status}
            />
          ))
        ) : (
          <p className="text-center text-gray-600 py-4">
            Aucune activité récente
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivityList;