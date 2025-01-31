import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

interface AuthContextType {
    user: any;
    loading: boolean;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    register: (data: {
        email: string;
        password: string;
        name: string;
    }) => boolean;
    isAdmin: () => boolean;
    updateProfile: (data: Partial<any>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const auth = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Vérifier si un utilisateur est déjà connecté
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            auth.user = JSON.parse(storedUser);
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ ...auth, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}

export default AuthContext;
