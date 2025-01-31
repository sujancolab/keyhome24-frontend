import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuthContext } from '../contexts/AuthContext';

const TestComponent = () => {
  const { user, login, logout } = useAuthContext();
  
  return (
    <div>
      {user ? (
        <>
          <div data-testid="user-role">{user.role}</div>
          <button onClick={logout}>Déconnexion</button>
        </>
      ) : (
        <button onClick={() => login('admin@immofrance.ch', 'Admin2024!')}>
          Connexion
        </button>
      )}
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('permet à l\'administrateur de se connecter avec les bonnes informations', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByText('Connexion');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByTestId('user-role')).toHaveTextContent('Administrateur');
    });
  });

  it('maintient la session de l\'utilisateur après un rechargement', () => {
    const adminUser = {
      id: 'admin',
      email: 'admin@immofrance.ch',
      role: 'Administrateur'
    };
    localStorage.setItem('currentUser', JSON.stringify(adminUser));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user-role')).toHaveTextContent('Administrateur');
  });

  it('permet à l\'utilisateur de se déconnecter', async () => {
    const adminUser = {
      id: 'admin',
      email: 'admin@immofrance.ch',
      role: 'Administrateur'
    };
    localStorage.setItem('currentUser', JSON.stringify(adminUser));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const logoutButton = screen.getByText('Déconnexion');
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(screen.getByText('Connexion')).toBeInTheDocument();
      expect(localStorage.getItem('currentUser')).toBeNull();
    });
  });
});