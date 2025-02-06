import React, { useState, useEffect, useRef } from "react";
import { Home, User, Menu, X, Building, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Backend from "../services/backend";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const { user } = useAuthContext();

    const { isLoading: configurationIsLoading, data: configurationData } =
        useQuery({
            queryKey: ["configurationData"],
            queryFn: () => Backend.get("/configuration"),
        });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const isAdmin = user?.role === "Administrateur";
    const isAdminRoute = location.pathname.startsWith("/admin");

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-dark-900/95 backdrop-blur-sm shadow-lg"
                        : "bg-dark-900"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link to="/" className="flex items-center">
                            <Home className="h-6 sm:h-8 w-6 sm:w-8 text-red-500" />
                            <span className="ml-2 text-lg sm:text-xl font-bold text-white">
                                {!configurationIsLoading &&
                                    configurationData?.name}
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center space-x-8">
                            {!isAdminRoute && (
                                <>
                                    <Link
                                        to="/properties"
                                        className="text-white hover:text-red-500 flex items-center transition-colors"
                                    >
                                        <Building className="h-5 w-5 mr-1" />
                                        Propriétés
                                    </Link>
                                    {/*<Link
                                        to="/requests"
                                        className="text-white hover:text-red-500 flex items-center transition-colors"
                                    >
                                        <Search className="h-5 w-5 mr-1" />
                                        Demandes
                                    </Link>*/}
                                </>
                            )}
                            {user ? (
                                <Link
                                    to={isAdmin ? "/admin" : "/dashboard"}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                                >
                                    <User className="h-5 w-5 mr-2" />
                                    {isAdmin
                                        ? "Administration"
                                        : "Tableau de bord"}
                                </Link>
                            ) : (
                                <Link
                                    to="/auth"
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                                >
                                    <User className="h-5 w-5 mr-2" />
                                    Connexion
                                </Link>
                            )}
                        </div>

                        <button
                            className="md:hidden text-white hover:text-red-500 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={
                                isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"
                            }
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Menu mobile */}
                <div
                    className={`md:hidden fixed inset-0 top-16 bg-dark-900/95 backdrop-blur-sm transform transition-transform duration-300 ${
                        isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="p-4 space-y-4">
                        {!isAdminRoute && (
                            <>
                                <Link
                                    to="/properties"
                                    className="flex items-center p-3 hover:bg-dark-700 rounded-lg text-white"
                                >
                                    <Building className="h-5 w-5 mr-3 text-red-500" />
                                    Propriétés
                                </Link>
                                {/*<Link
                                    to="/requests"
                                    className="flex items-center p-3 hover:bg-dark-700 rounded-lg text-white"
                                >
                                    <Search className="h-5 w-5 mr-3 text-red-500" />
                                    Demandes
                                </Link>*/}
                            </>
                        )}
                        {user ? (
                            <Link
                                to={isAdmin ? "/admin" : "/dashboard"}
                                className="flex items-center p-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                <User className="h-5 w-5 mr-3" />
                                {isAdmin ? "Administration" : "Tableau de bord"}
                            </Link>
                        ) : (
                            <Link
                                to="/auth"
                                className="flex items-center p-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                <User className="h-5 w-5 mr-3" />
                                Connexion
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
            {/* Spacer pour éviter la superposition */}
            <div className="h-16"></div>
        </>
    );
};
