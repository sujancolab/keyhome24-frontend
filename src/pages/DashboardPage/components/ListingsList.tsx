import React, { useState } from "react";
import {
    Edit3,
    Eye,
    Trash2,
    Home,
    AlertCircle,
    MapPin,
    ChevronRight,
} from "lucide-react";
import { UserListing } from "../types";
import EditListingModal from "./EditListingModal";
import ViewListingModal from "./ViewListingModal";

interface ListingsListProps {
    listings: UserListing[];
    onDelete: (listing: UserListing) => void;
    onEdit: (listingId: string, updatedData: Partial<UserListing>) => void;
}

const ListingsList: React.FC<ListingsListProps> = ({
    listings,
    onDelete,
    onEdit,
}) => {
    const [editingListing, setEditingListing] = useState<UserListing | null>(
        null
    );
    const [viewingListing, setViewingListing] = useState<UserListing | null>(
        null
    );

    const handleEdit = (listing: UserListing) => {
        if (listing.hasBeenEdited) {
            alert(
                "Cette annonce a déjà été modifiée une fois. Vous ne pouvez plus la modifier."
            );
            return;
        }
        setEditingListing(listing);
    };

    const handleView = (listing: UserListing) => {
        setViewingListing(listing);
    };

    const handleSave = (id: string, updatedData: Partial<UserListing>) => {
        onEdit(id, { ...updatedData, hasBeenEdited: true });
        setEditingListing(null);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Mes annonces</h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                        {listings.length} annonce
                        {listings.length > 1 ? "s" : ""} active
                        {listings.length > 1 ? "s" : ""}
                    </span>
                </div>
            </div>

            {listings.length > 0 ? (
                <div className="space-y-4">
                    {listings.map((listing) => (
                        <div
                            key={listing.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                            <img
                                src={listing.image}
                                alt={listing.title}
                                className="w-full sm:w-48 h-32 object-cover rounded-lg"
                            />

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-lg truncate">
                                        {listing.title}
                                    </h3>
                                    <span
                                        className={`inline-flex px-2 py-1 rounded-full text-sm ${
                                            listing.status === "active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {listing.status === "active"
                                            ? "Active"
                                            : "En attente"}
                                    </span>
                                </div>

                                <div className="flex items-center text-gray-600 mb-2">
                                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                                    <span className="truncate">
                                        {listing.location}
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                    <span className="font-medium text-red-600">
                                        {listing.price}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        {listing.views} vues
                                    </span>
                                    {listing.hasBeenEdited && (
                                        <span className="text-sm text-gray-600 flex items-center">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            Modifiée
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                                <button
                                    onClick={() => handleEdit(listing)}
                                    className={`flex-1 sm:flex-none sm:w-auto px-4 py-2 rounded-lg transition-colors ${
                                        listing.hasBeenEdited
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                                    }`}
                                    disabled={listing.hasBeenEdited}
                                    title={
                                        listing.hasBeenEdited
                                            ? "Cette annonce a déjà été modifiée"
                                            : "Modifier l'annonce"
                                    }
                                >
                                    <Edit3 className="h-5 w-5 sm:mx-auto" />
                                    <span className="sm:hidden ml-2">
                                        Modifier
                                    </span>
                                </button>

                                <button
                                    onClick={() => handleView(listing)}
                                    className="flex-1 sm:flex-none sm:w-auto px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <Eye className="h-5 w-5 sm:mx-auto" />
                                    <span className="sm:hidden ml-2">Voir</span>
                                </button>

                                <button
                                    onClick={() => onDelete(listing)}
                                    className="flex-1 sm:flex-none sm:w-auto px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                >
                                    <Trash2 className="h-5 w-5 sm:mx-auto" />
                                    <span className="sm:hidden ml-2">
                                        Supprimer
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Aucune annonce pour le moment
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Commencez par créer votre première annonce
                    </p>
                </div>
            )}

            {editingListing && (
                <EditListingModal
                    listing={editingListing}
                    onClose={() => setEditingListing(null)}
                    onSave={handleSave}
                />
            )}

            {viewingListing && (
                <ViewListingModal
                    listing={viewingListing}
                    onClose={() => setViewingListing(null)}
                />
            )}
        </div>
    );
};

export default ListingsList;
