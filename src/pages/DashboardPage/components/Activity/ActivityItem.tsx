import React from 'react';

interface ActivityItemProps {
  message: string;
  time: string;
  status: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ message, time, status }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div>
        <p className="text-gray-900">{message}</p>
        <p className="text-sm text-gray-600 mt-1">{time}</p>
      </div>
      <span className={`px-2 py-1 text-sm rounded-full ${
        status === 'active'
          ? 'bg-green-100 text-green-800'
          : 'bg-yellow-100 text-yellow-800'
      }`}>
        {status === 'active' ? 'Active' : 'En attente'}
      </span>
    </div>
  );
};

export default ActivityItem;