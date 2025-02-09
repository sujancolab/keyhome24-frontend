import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';

// Mock du hook useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock du hook useAuth
jest.mock('../hooks/useAuth', () => ({
  __esModule: true,
  default: () => ({
    user: null,
    loading: false,
    login: jest.fn(),
    logout: jest.fn()
  })
}));

describe('AdminDashboard', () => {
  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          {component}
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('redirige vers la page de connexion si l\'utilisateur n\'est pas connecté', () => {
    renderWithProviders(<AdminDashboard />);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('redirige vers la page de connexion si l\'utilisateur n\'est pas admin', () => {
    jest.spyOn(require('../hooks/useAuth'), 'default').mockImplementation(() => ({
      user: { role: 'Utilisateur' },
      loading: false
    }));

    renderWithProviders(<AdminDashboard />);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('affiche le tableau de bord si l\'utilisateur est admin', () => {
    jest.spyOn(require('../hooks/useAuth'), 'default').mockImplementation(() => ({
      user: { role: 'Administrateur' },
      loading: false
    }));

    renderWithProviders(<AdminDashboard />);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('affiche un message de chargement pendant la vérification de l\'authentification', () => {
    jest.spyOn(require('../hooks/useAuth'), 'default').mockImplementation(() => ({
      user: null,
      loading: true
    }));

    renderWithProviders(<AdminDashboard />);
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  it('affiche une erreur d\'accès non autorisé pour les utilisateurs non-admin', async () => {
    jest.spyOn(require('../hooks/useAuth'), 'default').mockImplementation(() => ({
      user: { role: 'Utilisateur' },
      loading: false
    }));

    renderWithProviders(<AdminDashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Accès non autorisé')).toBeInTheDocument();
    });
  });
});