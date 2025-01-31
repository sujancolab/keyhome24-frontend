import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { User, Mail, Phone, Lock, Globe, Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SettingsPage = () => {
    const { user } = useAuth();
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        language: "fr",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simuler la sauvegarde
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    to="/dashboard"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Retour au tableau de bord
                </Link>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {showSuccess && (
                        <div className="bg-green-50 text-green-800 p-4 rounded-lg flex items-center">
                            <Save className="h-5 w-5 mr-2" />
                            Vos modifications ont été enregistrées avec succès
                        </div>
                    )}

                    {/* Profil */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold mb-6 flex items-center">
                            <User className="h-5 w-5 mr-2 text-red-600" />
                            Informations personnelles
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom complet
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                                    />
                                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                                    />
                                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Téléphone
                                </label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                phone: e.target.value,
                                            })
                                        }
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                                    />
                                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Langue
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.language}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                language: e.target.value,
                                            })
                                        }
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="fr">Français</option>
                                        <option value="en">English</option>
                                        <option value="de">Deutsch</option>
                                        <option value="it">Italiano</option>
                                    </select>
                                    <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sécurité */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold mb-6 flex items-center">
                            <Lock className="h-5 w-5 mr-2 text-red-600" />
                            Changer le mot de passe
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mot de passe actuel
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={formData.currentPassword}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                currentPassword: e.target.value,
                                            })
                                        }
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                                    />
                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nouveau mot de passe
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={formData.newPassword}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                newPassword: e.target.value,
                                            })
                                        }
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                                    />
                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirmer le nouveau mot de passe
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                                    />
                                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex justify-end space-x-4">
                        <Link
                            to="/dashboard"
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Annuler
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                        >
                            <Save className="h-5 w-5 mr-2" />
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default SettingsPage;
