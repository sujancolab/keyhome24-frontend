import React, { useState } from "react";
import { UserListing } from "../types";
import ListingsList from "./ListingsList";
import DeleteListingModal from "./DeleteListingModal";

interface ListingsPageProps {
    listings: UserListing[];
    onDeleteListing: (listingId: string) => void;
    onEditListing: (
        listingId: string,
        updatedData: Partial<UserListing>
    ) => void;
}

const ListingsPage: React.FC<ListingsPageProps> = () => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedListing, setSelectedListing] = useState<UserListing | null>(
        null
    );

    const handleDeleteClick = (listing: UserListing) => {
        setSelectedListing(listing);
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = () => {
        if (selectedListing) {
            onDeleteListing(selectedListing.id);
            setShowDeleteConfirm(false);
            setSelectedListing(null);
        }
    };

    return (
        <div className="space-y-6">
            <ListingsList
                listings={listings}
                onDelete={handleDeleteClick}
                onEdit={onEditListing}
            />

            {showDeleteConfirm && selectedListing && (
                <DeleteListingModal
                    listing={selectedListing}
                    onClose={() => setShowDeleteConfirm(false)}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default ListingsPage;
