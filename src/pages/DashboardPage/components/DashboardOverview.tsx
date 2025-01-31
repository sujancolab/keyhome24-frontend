import React from "react";
import {
    Upload,
    Search,
    Eye,
    Heart,
    Clock,
    ArrowUpRight,
    Home,
} from "lucide-react";
import { Link } from "react-router-dom";
import { UserListing } from "../types";

interface DashboardOverviewProps {
    userListings: UserListing[];
    onAddListing: () => void;
    onAddRequest: () => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
    userListings,
    onAddListing,
    onAddRequest,
}) => {
    const activeListings = userListings.filter(
        (listing) => listing.status === "active"
    );

    const stats = [
        {
            label: "Annonces actives",
            value: activeListings.length,
            icon: Home,
            change: "+2%",
            positive: true,
        },
        {
            label: "Vues totales",
            value: userListings
                .reduce((total, listing) => total + listing.views, 0)
                .toString(),
            icon: Eye,
            change: "+15%",
            positive: true,
        },
        {
            label: "Favoris",
            value: "45",
            icon: Heart,
            change: "+5%",
            positive: true,
        },
        {
            label: "Dernière activité",
            value: "Il y a 2h",
            icon: Clock,
            change: "",
            positive: true,
        },
    ];

    const recentActivity = userListings.slice(0, 3).map((listing) => ({
        type: "view",
        message: `Votre annonce "${listing.title}" a reçu ${listing.views} vues`,
        time: "Récemment",
    }));

    return (
        <div className="space-y-8">
            {/* Statistiques */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-red-50 rounded-lg">
                                    <Icon className="h-6 w-6 text-red-600" />
                                </div>
                                {stat.change && (
                                    <span
                                        className={`text-sm font-medium ${
                                            stat.positive
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {stat.change}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                {stat.value}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                {stat.label}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Actions principales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold mb-2">
                                Publier une annonce
                            </h2>
                            <p className="text-red-100 mb-4">
                                Créez une annonce attractive pour votre bien
                            </p>
                            <button
                                onClick={onAddListing}
                                className="bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-all transform hover:scale-105 flex items-center font-semibold shadow-md"
                            >
                                <Upload className="h-5 w-5 mr-2" />
                                Ajouter une annonce
                            </button>
                        </div>
                        <Upload className="h-12 w-12 text-red-200" />
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold mb-2">
                                Publier une demande
                            </h2>
                            <p className="text-blue-100 mb-4">
                                Créez une demande pour trouver votre bien idéal
                            </p>
                            <button
                                onClick={onAddRequest}
                                className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center font-semibold shadow-md"
                            >
                                <Search className="h-5 w-5 mr-2" />
                                Publier une demande
                            </button>
                        </div>
                        <Search className="h-12 w-12 text-blue-200" />
                    </div>
                </div>
            </div>

            {/* Activité récente */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Activité récente</h2>
                    <Link
                        to="/dashboard/activity"
                        className="text-red-600 hover:text-red-700 flex items-center text-sm font-medium"
                    >
                        Voir tout
                        <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Link>
                </div>

                <div className="space-y-4">
                    {recentActivity.length > 0 ? (
                        recentActivity.map((activity, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div>
                                    <p className="text-gray-900">
                                        {activity.message}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {activity.time}
                                    </p>
                                </div>
                                <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                                    Voir
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 py-4">
                            Aucune activité récente
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
