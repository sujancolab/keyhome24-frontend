import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, change, positive }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-red-50 rounded-lg">
          <Icon className="h-6 w-6 text-red-600" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${
            positive ? 'text-green-600' : 'text-red-600'
          }`}>
            {change}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-600 mt-1">{label}</p>
    </div>
  );
};

export default StatCard;