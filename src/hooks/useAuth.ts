import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { emailService } from '../services/emailService';
import { realUsers } from '../data/users';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'Administrateur' | 'Utilisateur' | 'Agent' | 'Agent Premium';
  avatar?: string;
  phone?: string;
  location?: string;
  verified?: boolean;
  createdAt: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Vérifier l'admin et l'utilisateur dans realUsers
    const userEntry = Object.values(realUsers).find(u => 
      u.email === email && u.password === password
    );

    if (userEntry) {
      const userData = { ...userEntry };
      delete userData.password;
      localStorage.setItem('currentUser', JSON.stringify(userData));
      setUser(userData);
      return true;
    }

    // Vérifier les utilisateurs enregistrés
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const foundUser = Object.values(users).find((u: any) => 
      u.email === email && u.password === password
    );

    if (foundUser) {
      if (!foundUser.verified) {
        throw new Error('Veuillez vérifier votre adresse email avant de vous connecter.');
      }

      const userData = { ...foundUser };
      delete userData.password;
      localStorage.setItem('currentUser', JSON.stringify(userData));
      setUser(userData);
      return true;
    }

    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('currentUser');
    setUser(null);
  }, []);

  const register = useCallback(async (data: { email: string; password: string; name: string }): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    // Vérifier si l'email existe déjà
    if (Object.values(users).some((u: any) => u.email === data.email)) {
      return false;
    }

    const userId = uuidv4();
    const newUser = {
      id: userId,
      ...data,
      role: 'Utilisateur',
      verified: false,
      createdAt: new Date().toISOString(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`
    };

    users[userId] = newUser;
    localStorage.setItem('users', JSON.stringify(users));

    // Envoyer l'email de vérification
    await emailService.sendVerificationEmail(data.email, userId, data.name);

    return true;
  }, []);

  const verifyEmail = useCallback(async (token: string): Promise<boolean> => {
    const userId = await emailService.verifyEmail(token);
    if (!userId) return false;

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (!users[userId]) return false;

    users[userId].verified = true;
    localStorage.setItem('users', JSON.stringify(users));

    return true;
  }, []);

  const resetPassword = useCallback(async (email: string): Promise<void> => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = Object.values(users).find((u: any) => u.email === email);

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    const resetToken = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
    resetTokens[resetToken] = {
      userId: user.id,
      expiresAt: expiresAt.toISOString()
    };
    localStorage.setItem('resetTokens', JSON.stringify(resetTokens));

    await emailService.sendPasswordResetEmail(email, resetToken);
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>): Promise<void> => {
    if (!user) return;

    const updatedUser = { ...user, ...data };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);

    if (user.role !== 'Administrateur') {
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      users[user.id] = { ...users[user.id], ...data };
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [user]);

  const isAdmin = useCallback(() => {
    return user?.role === 'Administrateur';
  }, [user]);

  return {
    user,
    loading,
    login,
    logout,
    register,
    verifyEmail,
    resetPassword,
    updateProfile,
    isAdmin
  };
}

export default useAuth;