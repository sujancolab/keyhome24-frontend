import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Home,
    Search,
    Settings,
    User,
    LogOut,
    X,
    Activity,
    Bell,
    CreditCard,
} from "lucide-react";
import { useAuthContext } from "../../../contexts/AuthContext";

interface AdminSidebarProps {
    onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onClose }) => {
    const { user, logout } = useAuthContext();
    const location = useLocation();
    const currentPath = location.pathname;

    const menuItems = [
        {
            icon: LayoutDashboard,
            label: "Tableau de bord",
            path: "/admin",
        },
        {
            icon: Users,
            label: "Utilisateurs",
            path: "/admin/users",
        },
        {
            icon: Home,
            label: "Annonces",
            path: "/admin/properties",
        },
        {
            icon: Search,
            label: "Demandes",
            path: "/admin/requests",
        },
        {
            icon: CreditCard,
            label: "Offres de publication",
            path: "/admin/subscriptions",
        },
        {
            icon: Activity,
            label: "Activité",
            path: "/admin/activity",
        },
        {
            icon: Bell,
            label: "Notifications",
            path: "/admin/notifications",
        },
        {
            icon: User,
            label: "Profil",
            path: "/admin/profile",
        },
        {
            icon: Settings,
            label: "Paramètres",
            path: "/admin/settings",
        },
    ];

    const handleLogout = () => {
        logout();
        window.location.href = "/auth";
    };

    return (
        <div className="w-full lg:w-64 space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
                {/* Profil utilisateur */}
                <div className="flex items-center space-x-3 mb-6 p-2 rounded-lg bg-gray-50">
                    <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-12 h-12 rounded-full"
                    />
                    <div>
                        <h3 className="font-semibold">{user?.name}</h3>
                        <p className="text-sm text-gray-600">{user?.role}</p>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg ml-auto"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    )}
                </div>

                {/* Menu de navigation */}
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                                currentPath === item.path
                                    ? "bg-red-50 text-red-600"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </Link>
                    ))}

                    {/* Bouton de déconnexion */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        <span>Déconnexion</span>
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default AdminSidebar;
