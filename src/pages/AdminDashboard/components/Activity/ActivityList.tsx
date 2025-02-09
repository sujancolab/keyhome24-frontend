import React from 'react';
import { Activity, Clock } from 'lucide-react';
import ActivityItem from './ActivityItem';
import { formatRelativeTime } from '../../utils/dateUtils';

interface ActivityListProps {
  activities: Array<{
    id: string;
    type: 'property' | 'user' | 'request' | 'system';
    action: string;
    target: string;
    user?: string;
    timestamp: string;
    status?: string;
  }>;
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  if (!activities.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Aucune activité récente
        </h3>
        <p className="text-gray-600">
          Les activités récentes apparaîtront ici
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm divide-y">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default ActivityList;