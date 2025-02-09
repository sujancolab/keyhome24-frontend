import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { emailService } from "../services/emailService";
import { realUsers } from "../data/users";

interface User {
    id: string;
    email: string;
    name: string;
    role: "Administrateur" | "Utilisateur" | "Agent" | "Agent Premium";
    avatar?: string;
    phone?: string;
    location?: string;
    verified?: boolean;
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => void;
    verifyEmail: (token: string) => Promise<boolean>;
    resetPassword: (email: string) => Promise<void>;
    updatePassword: (
        oldPassword: string,
        newPassword: string
    ) => Promise<boolean>;
    updateProfile: (data: Partial<User>) => Promise<void>;
    isAdmin: () => boolean;
}

export function useAuth(): AuthContextType {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        setUser(null);
    }, []);

    const verifyEmail = useCallback(async (token: string) => {
        const userId = await emailService.verifyEmail(token);
        if (!userId) return false;

        const users = JSON.parse(localStorage.getItem("users") || "{}");
        if (!users[userId]) return false;

        // Mettre à jour le statut de vérification
        users[userId].verified = true;
        localStorage.setItem("users", JSON.stringify(users));

        return true;
    }, []);

    const resetPassword = useCallback(async (email: string) => {
        const users = JSON.parse(localStorage.getItem("users") || "{}");
        const user = Object.values(users).find((u: any) => u.email === email);

        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }

        // Générer un token de réinitialisation
        const resetToken = uuidv4();
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1); // Expire après 1h

        // Stocker le token
        const resetTokens = JSON.parse(
            localStorage.getItem("resetTokens") || "{}"
        );
        resetTokens[resetToken] = {
            userId: user.id,
            expiresAt: expiresAt.toISOString(),
        };
        localStorage.setItem("resetTokens", JSON.stringify(resetTokens));

        // Envoyer l'email de réinitialisation
        await emailService.sendPasswordResetEmail(email, resetToken);
    }, []);

    const updatePassword = useCallback(
        async (oldPassword: string, newPassword: string): Promise<boolean> => {
            if (!user) return false;

            const users = JSON.parse(localStorage.getItem("users") || "{}");
            const currentUser = users[user.id];

            // Vérifier l'ancien mot de passe
            if (currentUser.password !== oldPassword) {
                return false;
            }

            // Mettre à jour le mot de passe
            users[user.id].password = newPassword;
            localStorage.setItem("users", JSON.stringify(users));

            return true;
        },
        [user]
    );

    const updateProfile = useCallback(
        async (data: Partial<User>) => {
            if (!user) return;

            const updatedUser = { ...user, ...data };
            localStorage.setItem("currentUser", JSON.stringify(updatedUser));
            setUser(updatedUser);

            // Update in users storage if not admin
            if (user.role !== "Administrateur") {
                const users = JSON.parse(localStorage.getItem("users") || "{}");
                users[user.id] = { ...users[user.id], ...data };
                localStorage.setItem("users", JSON.stringify(users));
            } else {
                // Update admin user in realUsers
                Object.assign(realUsers.admin, data);
            }
        },
        [user]
    );

    const isAdmin = useCallback(() => {
        return user?.role === "Administrateur";
    }, [user]);

    return {
        user,
        loading,
        logout,
        verifyEmail,
        resetPassword,
        updatePassword,
        updateProfile,
        isAdmin,
    };
}

export default useAuth;
