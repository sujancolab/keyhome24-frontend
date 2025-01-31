import React, { useState, useEffect } from 'react';
import { db } from '../../../services/database';
import { useAdmin } from '../../../hooks/useAdmin';
import { Home, Eye, Check, X } from 'lucide-react';
import TableActions from '../components/Tables/TableActions';
import TableStatus from '../components/Tables/TableStatus';
import PropertyViewModal from './PropertyViewModal';
import DeletePropertyModal from './DeletePropertyModal';

const PropertiesManagement = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { approveListing, rejectListing } = useAdmin();

  useEffect(() => {
    const loadProperties = async () => {
      const data = await db.getListings();
      setProperties(data);
      setLoading(false);
    };
    loadProperties();
  }, []);

  const handleApprove = async (property: any) => {
    const success = await approveListing(property.id);
    if (success) {
      setProperties(prev => prev.map(p => 
        p.id === property.id ? { ...p, status: 'active' } : p
      ));
    }
  };

  const handleReject = async (property: any) => {
    const success = await rejectListing(property.id, 'Non conforme aux critères');
    if (success) {
      setProperties(prev => prev.map(p => 
        p.id === property.id ? { ...p, status: 'rejected' } : p
      ));
    }
  };

  const handleDelete = async () => {
    if (selectedProperty) {
      await db.deleteListing(selectedProperty.id);
      setProperties(prev => prev.filter(p => p.id !== selectedProperty.id));
      setShowDeleteModal(false);
      setSelectedProperty(null);
    }
  };

  if (loading) {
    return <div>Chargement des annonces...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Home className="h-6 w-6 text-red-600" />
          Gestion des annonces
        </h2>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Annonce
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Propriétaire
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{property.title}</div>
                      <div className="text-sm text-gray-500">{property.location}</div>
                      <div className="text-sm font-medium text-red-600">{property.price}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TableStatus status={property.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{property.owner}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end space-x-2">
                    {property.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(property)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleReject(property)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        setSelectedProperty(property);
                        setShowViewModal(true);
                      }}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {showViewModal && selectedProperty && (
        <PropertyViewModal
          property={selectedProperty}
          onClose={() => {
            setShowViewModal(false);
            setSelectedProperty(null);
          }}
          onApprove={() => handleApprove(selectedProperty)}
          onReject={() => handleReject(selectedProperty)}
          onDelete={() => {
            setShowViewModal(false);
            setShowDeleteModal(true);
          }}
        />
      )}

      {showDeleteModal && selectedProperty && (
        <DeletePropertyModal
          property={selectedProperty}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedProperty(null);
          }}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default PropertiesManagement;