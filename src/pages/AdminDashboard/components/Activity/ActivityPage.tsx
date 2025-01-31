import React, { useState, useEffect } from 'react';
import { Activity, Download } from 'lucide-react';
import ActivityList from './ActivityList';
import ActivityFilters from './ActivityFilters';
import { FilterBar } from '../filters';

const ActivityPage = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    dateFrom: '',
    dateTo: '',
    status: ''
  });

  useEffect(() => {
    // Charger les activités depuis le localStorage
    const loadActivities = () => {
      const storedActivities = localStorage.getItem('activities');
      if (storedActivities) {
        setActivities(JSON.parse(storedActivities));
      }
      setLoading(false);
    };

    loadActivities();
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      dateFrom: '',
      dateTo: '',
      status: ''
    });
  };

  const filteredActivities = activities.filter(activity => {
    if (searchTerm && !activity.action.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    if (filters.type && activity.type !== filters.type) return false;
    if (filters.status && activity.status !== filters.status) return false;

    if (filters.dateFrom || filters.dateTo) {
      const date = new Date(activity.timestamp);
      if (filters.dateFrom && date < new Date(filters.dateFrom)) return false;
      if (filters.dateTo && date > new Date(filters.dateTo)) return false;
    }

    return true;
  });

  const handleExport = () => {
    const exportData = filteredActivities.map(activity => ({
      ...activity,
      timestamp: new Date(activity.timestamp).toLocaleString('fr-CH')
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activites-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Activity className="h-6 w-6 text-red-600" />
          Journal d'activité
        </h2>
        <button
          onClick={handleExport}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
        >
          <Download className="h-5 w-5 mr-2" />
          Exporter
        </button>
      </div>

      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterClick={() => setShowFilters(!showFilters)}
        placeholder="Rechercher une activité..."
        showFilters={showFilters}
        onClearFilters={clearFilters}
      >
        <ActivityFilters
          filters={filters}
          onChange={handleFilterChange}
        />
      </FilterBar>

      <ActivityList activities={filteredActivities} />
    </div>
  );
};

export default ActivityPage;