import React from 'react';
import { 
  Home, 
  User, 
  Search, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Settings,
  Clock
} from 'lucide-react';
import { formatRelativeTime } from '../../utils/dateUtils';

interface ActivityItemProps {
  activity: {
    id: string;
    type: 'property' | 'user' | 'request' | 'system';
    action: string;
    target: string;
    user?: string;
    timestamp: string;
    status?: string;
  };
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const getIcon = () => {
    switch (activity.type) {
      case 'property':
        return Home;
      case 'user':
        return User;
      case 'request':
        return Search;
      case 'system':
        return Settings;
      default:
        return AlertCircle;
    }
  };

  const getStatusIcon = () => {
    switch (activity.status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const Icon = getIcon();
  const StatusIcon = getStatusIcon();

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-gray-100">
          <Icon className="h-5 w-5 text-gray-600" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {activity.action}
              </p>
              <p className="text-sm text-gray-600">
                {activity.target}
                {activity.user && ` par ${activity.user}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {StatusIcon}
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {formatRelativeTime(new Date(activity.timestamp))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;