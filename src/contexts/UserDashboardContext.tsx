import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { UserListing } from '../pages/DashboardPage/types';
import { sampleListings, sampleRequests } from '../pages/DashboardPage/data/sampleData';

interface UserStats {
  totalViews: number;
  totalFavorites: number;
  activeListings: number;
  activeRequests: number;
  lastActivity: Date;
}

interface UserDashboardContextType {
  listings: UserListing[];
  requests: any[];
  stats: UserStats;
  addListing: (listing: UserListing) => void;
  updateListing: (id: string, data: Partial<UserListing>) => void;
  deleteListing: (id: string) => void;
  addRequest: (request: any) => void;
  updateRequest: (id: string, data: any) => void;
  deleteRequest: (id: string) => void;
  refreshStats: () => void;
}

const UserDashboardContext = createContext<UserDashboardContextType | undefined>(undefined);

export const UserDashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuthContext();
  const [listings, setListings] = useState<UserListing[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalViews: 0,
    totalFavorites: 0,
    activeListings: 0,
    activeRequests: 0,
    lastActivity: new Date()
  });

  // Charger les données initiales
  useEffect(() => {
    if (user) {
      // Dans un environnement réel, ces données viendraient d'une API
      setListings(sampleListings);
      setRequests(sampleRequests);
      refreshStats();
    }
  }, [user]);

  const refreshStats = () => {
    const activeListings = listings.filter(l => l.status === 'active').length;
    const activeRequests = requests.filter(r => r.status === 'active').length;
    const totalViews = listings.reduce((sum, l) => sum + l.views, 0);

    setStats({
      totalViews,
      totalFavorites: 45, // Exemple statique
      activeListings,
      activeRequests,
      lastActivity: new Date()
    });
  };

  const addListing = (listing: UserListing) => {
    setListings(prev => [...prev, listing]);
    refreshStats();
  };

  const updateListing = (id: string, data: Partial<UserListing>) => {
    setListings(prev => prev.map(listing => 
      listing.id === id ? { ...listing, ...data } : listing
    ));
    refreshStats();
  };

  const deleteListing = (id: string) => {
    setListings(prev => prev.filter(listing => listing.id !== id));
    refreshStats();
  };

  const addRequest = (request: any) => {
    setRequests(prev => [...prev, request]);
    refreshStats();
  };

  const updateRequest = (id: string, data: any) => {
    setRequests(prev => prev.map(request => 
      request.id === id ? { ...request, ...data } : request
    ));
    refreshStats();
  };

  const deleteRequest = (id: string) => {
    setRequests(prev => prev.filter(request => request.id !== id));
    refreshStats();
  };

  return (
    <UserDashboardContext.Provider value={{
      listings,
      requests,
      stats,
      addListing,
      updateListing,
      deleteListing,
      addRequest,
      updateRequest,
      deleteRequest,
      refreshStats
    }}>
      {children}
    </UserDashboardContext.Provider>
  );
};

export const useUserDashboard = () => {
  const context = useContext(UserDashboardContext);
  if (context === undefined) {
    throw new Error('useUserDashboard must be used within a UserDashboardProvider');
  }
  return context;
};