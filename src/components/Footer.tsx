import React from "react";
import { Home, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Backend from "../services/backend";

export const Footer = () => {
    const { isLoading: configurationIsLoading, data: configurationData } =
        useQuery({
            queryKey: ["configurationData"],
            queryFn: () => Backend.get("/configuration"),
        });

    return (
        <footer className="bg-dark-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <Link to="/" className="flex items-center mb-4">
                            <Home className="h-6 sm:h-8 w-6 sm:w-8 text-red-500" />
                            <span className="ml-2 text-lg sm:text-xl font-bold">
                                {!configurationIsLoading &&
                                    configurationData?.name || ''}
                            </span>
                        </Link>
                        <p className="text-sm sm:text-base text-gray-400">
                            {!configurationIsLoading &&
                                configurationData?.description || ''}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-4">
                            Contact
                        </h3>
                        <div className="space-y-2">
                            <a
                                href={
                                    !configurationIsLoading &&
                                    configurationData?.email
                                        ? `mailto:${configurationData?.email}`
                                        : "#"
                                }
                                className="flex items-center text-sm sm:text-base hover:text-red-500"
                            >
                                <Mail className="h-5 w-5 mr-2 text-red-500" />
                                <span>
                                    {!configurationIsLoading &&
                                        configurationData?.email || ''}
                                </span>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-4">
                            Liens Rapides
                        </h3>
                        <ul className="space-y-2 text-sm sm:text-base">
                            <li>
                                <Link
                                    to="/search"
                                    className="hover:text-red-500"
                                >
                                    Rechercher
                                </Link>
                            </li>
                            {/*<li>
                                <Link
                                    to="/search-requests"
                                    className="hover:text-red-500"
                                >
                                    Demandes
                                </Link>
                            </li>*/}
                            <li>
                                <Link to="/auth" className="hover:text-red-500">
                                    Espace utilisateur
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-4">
                            Liens légaux
                        </h3>
                        <ul className="space-y-2 text-sm sm:text-base">
                            <li>
                                <Link
                                    to="/terms"
                                    className="hover:text-red-500"
                                >
                                    Conditions générales
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy"
                                    className="hover:text-red-500"
                                >
                                    Protection des données
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/imprint"
                                    className="hover:text-red-500"
                                >
                                    Mentions légales
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div id="google_translate_element"></div>
                </div>

                <div className="border-t border-dark-800 mt-8 pt-8 text-center">
                    <p className="text-sm text-gray-400">
                        &copy; 2024{" "}
                        {!configurationIsLoading && configurationData?.name || ''}.
                        Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
