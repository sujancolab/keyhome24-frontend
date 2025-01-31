import React, { useState, useEffect } from "react";
import { Users, Plus } from "lucide-react";
import TableActions from "./Tables/TableActions";
import TableStatus from "./Tables/TableStatus";
import UserProfileModal from "./UserProfileModal";
import UserEditModal from "./UserEditModal";
import CreateUserModal from "./CreateUserModal";
import SendEmailModal from "./SendEmailModal";
import DeleteUserModal from "./DeleteUserModal";

const UsersManagement = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                // Récupérer les utilisateurs depuis le localStorage
                const storedUsers = localStorage.getItem("users");
                const usersList = storedUsers
                    ? Object.values(JSON.parse(storedUsers))
                    : [];
                setUsers(usersList);
            } catch (error) {
                console.error(
                    "Erreur lors du chargement des utilisateurs:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const handleCreateUser = async (userData: any) => {
        try {
            const updatedUsers = [...users, userData];
            const usersObj = updatedUsers.reduce(
                (acc, user) => ({ ...acc, [user.id]: user }),
                {}
            );
            localStorage.setItem("users", JSON.stringify(usersObj));
            setUsers(updatedUsers);
        } catch (error) {
            console.error("Erreur lors de la création:", error);
            throw error;
        }
    };

    const handleUpdateUser = async (userId: string, updatedData: any) => {
        try {
            const updatedUsers = users.map((user) =>
                user.id === userId ? { ...user, ...updatedData } : user
            );
            setUsers(updatedUsers);
            localStorage.setItem(
                "users",
                JSON.stringify(
                    updatedUsers.reduce(
                        (acc, user) => ({ ...acc, [user.id]: user }),
                        {}
                    )
                )
            );
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
            throw error;
        }
    };

    const handleDelete = async () => {
        if (selectedUser) {
            try {
                const updatedUsers = users.filter(
                    (u) => u.id !== selectedUser.id
                );
                setUsers(updatedUsers);
                localStorage.setItem(
                    "users",
                    JSON.stringify(
                        updatedUsers.reduce(
                            (acc, user) => ({ ...acc, [user.id]: user }),
                            {}
                        )
                    )
                );
                setShowDeleteModal(false);
                setSelectedUser(null);
            } catch (error) {
                console.error("Erreur lors de la suppression:", error);
            }
        }
    };

    const filteredUsers = users.filter((user) => {
        if (!searchTerm) return true;
        return (
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Users className="h-6 w-6 text-red-600" />
                    Gestion des utilisateurs
                    <span className="text-sm text-gray-500">
                        ({filteredUsers.length})
                    </span>
                </h2>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Nouvel utilisateur
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Utilisateur
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Statut
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date d'inscription
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="h-10 w-10 rounded-full"
                                        />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <TableStatus
                                        status={user.status || "active"}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(
                                        user.createdAt
                                    ).toLocaleDateString("fr-CH")}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <TableActions
                                        onView={() => {
                                            setSelectedUser(user);
                                            setShowProfileModal(true);
                                        }}
                                        onEdit={() => {
                                            setSelectedUser(user);
                                            setShowEditModal(true);
                                        }}
                                        onEmail={() => {
                                            setSelectedUser(user);
                                            setShowEmailModal(true);
                                        }}
                                        onDelete={() => {
                                            setSelectedUser(user);
                                            setShowDeleteModal(true);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            {showCreateModal && (
                <CreateUserModal
                    onClose={() => setShowCreateModal(false)}
                    onSave={handleCreateUser}
                />
            )}

            {showProfileModal && selectedUser && (
                <UserProfileModal
                    user={selectedUser}
                    onClose={() => {
                        setShowProfileModal(false);
                        setSelectedUser(null);
                    }}
                    onSendEmail={() => {
                        setShowProfileModal(false);
                        setShowEmailModal(true);
                    }}
                />
            )}

            {showEditModal && selectedUser && (
                <UserEditModal
                    user={selectedUser}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedUser(null);
                    }}
                    onSave={handleUpdateUser}
                />
            )}

            {showEmailModal && selectedUser && (
                <SendEmailModal
                    user={selectedUser}
                    onClose={() => {
                        setShowEmailModal(false);
                        setSelectedUser(null);
                    }}
                    onSend={(subject, message) => {
                        console.log("Email envoyé:", { subject, message });
                        setShowEmailModal(false);
                        setSelectedUser(null);
                    }}
                />
            )}

            {showDeleteModal && selectedUser && (
                <DeleteUserModal
                    user={selectedUser}
                    onClose={() => {
                        setShowDeleteModal(false);
                        setSelectedUser(null);
                    }}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
};

export default UsersManagement;
