import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardHome from "./components/DashboardHome";
import ListingsPage from "./components/ListingsPage";
import PropertyListingForm from "../../components/PropertyListingForm/PropertyListingForm";
import SearchRequestForm from "../../components/SearchRequestForm/SearchRequestForm";
import { UserListing } from "./types";

const DashboardPage = () => {
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);
    const [listings, setListings] = useState<UserListing[]>([]);

    const handleAddListing = (listing: UserListing) => {
        setListings((prev) => [...prev, listing]);
    };

    const handleAddRequest = (request: any) => {
        console.log("Nouvelle demande:", request);
    };

    const handleDeleteListing = (listingId: string) => {
        setListings((prev) =>
            prev.filter((listing) => listing.id !== listingId)
        );
    };

    const handleEditListing = (
        listingId: string,
        updatedData: Partial<UserListing>
    ) => {
        setListings((prev) =>
            prev.map((listing) =>
                listing.id === listingId
                    ? { ...listing, ...updatedData }
                    : listing
            )
        );
    };

    return (
        <div className="page-container">
            <Navbar />

            <div className="page-content">
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                        className="w-full bg-white p-4 rounded-lg shadow-sm text-left font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Menu du tableau de bord
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div
                        className={`lg:block ${
                            showMobileSidebar ? "block" : "hidden"
                        }`}
                    >
                        <DashboardSidebar
                            onClose={() => setShowMobileSidebar(false)}
                        />
                    </div>

                    <div className="flex-1">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <DashboardHome
                                        listings={listings}
                                        onAddListing={handleAddListing}
                                        onAddRequest={handleAddRequest}
                                    />
                                }
                            />

                            {/*<Route
                                path="/listings"
                                element={
                                    <ListingsPage
                                        listings={listings}
                                        onDeleteListing={handleDeleteListing}
                                        onEditListing={handleEditListing}
                                    />
                                }
                            />*/}

                            <Route
                                path="/add-listing"
                                element={
                                    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                                        <h2 className="text-xl sm:text-2xl font-bold mb-6">
                                            Publier une annonce
                                        </h2>
                                        <PropertyListingForm
                                            onSubmit={handleAddListing}
                                        />
                                    </div>
                                }
                            />

                            <Route path="/add-request" element={
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-6">Publier une demande</h2>
                  <SearchRequestForm onSubmit={handleAddRequest} />
                </div>
              } />
                        </Routes>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DashboardPage;
