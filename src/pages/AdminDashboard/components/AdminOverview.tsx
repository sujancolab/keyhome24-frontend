import React, { useEffect, useState } from 'react';
import { useAdmin } from '../../../hooks/useAdmin';
import { Home, Users, Search, Activity, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalListings: number;
  pendingListings: number;
}

const AdminOverview = () => {
  const { getStats } = useAdmin();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const data = await getStats();
      if (data) {
        setStats(data);
      }
      setLoading(false);
    };
    loadStats();
  }, [getStats]);

  const statCards = [
    {
      icon: Users,
      label: 'Utilisateurs',
      value: stats?.totalUsers || 0,
      change: `${stats?.activeUsers || 0} actifs`,
      positive: true,
      link: '/admin/users'
    },
    {
      icon: Home,
      label: 'Annonces',
      value: stats?.totalListings || 0,
      change: `${stats?.pendingListings || 0} en attente`,
      positive: stats?.pendingListings === 0,
      link: '/admin/properties'
    },
    {
      icon: Search,
      label: 'Demandes',
      value: 567,
      change: '+8%',
      positive: true,
      link: '/admin/requests'
    },
    {
      icon: Activity,
      label: 'Activité',
      value: '123',
      change: 'utilisateurs en ligne',
      positive: true,
      link: '/admin/activity'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Tableau de bord administrateur</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link 
              key={index} 
              to={stat.link}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-red-50 rounded-lg">
                  <Icon className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex items-center">
                  {stat.change && (
                    <span className={`text-sm font-medium mr-2 ${
                      stat.positive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  )}
                  <ArrowUpRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminOverview;