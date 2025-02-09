import React from "react";
import { UserListing } from "../types";
import StatsGrid from "./Stats/StatsGrid";
import ActionsGrid from "./Actions/ActionsGrid";
//import ActivityList from './Activity/ActivityList';
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Backend from "../../../services/backend";

interface DashboardHomeProps {
    listings: UserListing[];
    onAddListing: () => void;
    onAddRequest: () => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({
    listings,
    onAddListing,
    onAddRequest,
}) => {
    const { isLoading, data } = useQuery({
        queryKey: ["annonceUserData"],
        queryFn: () => Backend.get("/annonces/@me"),
    });

    return (
        <div className="space-y-8">
            <StatsGrid listings={listings} />
            <ActionsGrid
                onAddListing={onAddListing}
                onAddRequest={onAddRequest}
            />
           
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Informations de votre Compte
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Détails de votre compte et de vos annonces
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Nom complet
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {
                                    JSON.parse(
                                        localStorage.getItem("currentUser") ||
                                            "{}"
                                    ).name
                                }
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Email
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {
                                    JSON.parse(
                                        localStorage.getItem("currentUser") ||
                                            "{}"
                                    ).email
                                }
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Numéro de téléphone
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {
                                    JSON.parse(
                                        localStorage.getItem("currentUser") ||
                                            "{}"
                                    ).phone
                                }
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Nombre d'annonces actives
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {(!isLoading && data && data.length) || 0}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Titre
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Type
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Prix
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Expiration
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Statut
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {!isLoading &&
                        data &&
                        data.length > 0 &&
                        data.map((listing: any) => (
                            <tr key={listing.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        <Link
                                            to={"/property/" + listing.id}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {listing.title}
                                        </Link>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {listing.type}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {listing.price} CHF
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {new Date(
                                            listing.expirationDate
                                        ).toLocaleDateString("ch-CH")}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={
                                            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-grey-100 text-grey-800"
                                        }
                                    >
                                        {listing.status === "pending"
                                            ? "Non payé"
                                            : "Payé"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardHome;
