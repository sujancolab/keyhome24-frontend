import React from "react";
import { Mail, Phone, MapPin, Home, Calendar, X } from "lucide-react";

interface UserProfileModalProps {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
        status: string;
        lastLogin: string;
        properties: number;
        location: string;
        avatar?: string;
        phone?: string;
        joinDate?: string;
    };
    onClose: () => void;
    onSendEmail: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
    user,
    onClose,
    onSendEmail,
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <img
                            /*src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`}*/
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user.name
                            )}&background=random`}
                            alt={user.name}
                            className="w-16 h-16 rounded-full"
                        />
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">
                                {user.name}
                            </h3>
                            <p className="text-gray-600">{user.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Mail className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-900">{user.email}</span>
                        </div>
                        {user.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-900">
                                    {user.phone}
                                </span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-900">
                                {user.location}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Home className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-900">
                                {user.properties} annonces
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-900">
                                Dernière connexion : {user.lastLogin}
                            </span>
                        </div>
                        {user.joinDate && (
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-900">
                                    Membre depuis : {user.joinDate}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t pt-6">
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Fermer
                        </button>
                        <button
                            onClick={onSendEmail}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
                        >
                            <Mail className="h-5 w-5 mr-2" />
                            Envoyer un email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileModal;
