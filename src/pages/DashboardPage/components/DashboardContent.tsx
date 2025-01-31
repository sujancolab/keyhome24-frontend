import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from './DashboardOverview';
import ListingsPage from './ListingsPage';
import PropertyListingForm from '../../../components/PropertyListingForm/PropertyListingForm';
import SearchRequestForm from '../../../components/SearchRequestForm/SearchRequestForm';
import { UserListing } from '../types';

interface DashboardContentProps {
  showAddListing: boolean;
  showAddRequest: boolean;
  setShowAddListing: (show: boolean) => void;
  setShowAddRequest: (show: boolean) => void;
  userListings: UserListing[];
  onAddListing: (listing: UserListing) => void;
  onDeleteListing: (listingId: string) => void;
  onEditListing: (listingId: string, updatedData: Partial<UserListing>) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  showAddListing,
  showAddRequest,
  setShowAddListing,
  setShowAddRequest,
  userListings,
  onAddListing,
  onDeleteListing,
  onEditListing
}) => {
  return (
    <Routes>
      <Route path="/" element={
        <DashboardOverview 
          userListings={userListings}
          onAddListing={() => setShowAddListing(true)}
          onAddRequest={() => setShowAddRequest(true)}
        />
      } />
      <Route path="/listings" element={
        <ListingsPage 
          listings={userListings}
          onDeleteListing={onDeleteListing}
          onEditListing={onEditListing}
        />
      } />
      {showAddListing && (
        <Route path="/add-listing" element={
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Publier une annonce</h2>
            <PropertyListingForm onSubmit={onAddListing} />
          </div>
        } />
      )}
      {showAddRequest && (
        <Route path="/add-request" element={
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Publier une demande</h2>
            <SearchRequestForm />
          </div>
        } />
      )}
    </Routes>
  );
};

export default DashboardContent;