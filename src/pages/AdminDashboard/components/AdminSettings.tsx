import React, { useState } from 'react';
import { Globe, Shield, User, Mail, Phone, MapPin, Lock, Save, AlertCircle } from 'lucide-react';

const AdminSettings = () => {
  const [formData, setFormData] = useState({
    profile: {
      name: 'Admin User',
      email: 'admin@example.com',
      phone: '+41 XX XXX XX XX',
      location: 'Lausanne, Suisse'
    },
    password: {
      current: '',
      new: '',
      confirm: ''
    },
    language: 'fr',
    security: {
      twoFactor: true,
      loginHistory: true
    }
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleProfileChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      password: {
        ...prev.password,
        [field]: value
      }
    }));
  };

  const handleSecurityChange = (field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de sauvegarde
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Paramètres</h2>

      {showSuccess && (
        <div className="mb-6 flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
          <Save className="h-5 w-5 flex-shrink-0" />
          <p>Les modifications ont été enregistrées avec succès.</p>
        </div>
      )}

      <div className="space-y-8">
        {/* Profil */}
        <div>
          <h3 className="text-lg font-medium flex items-center mb-4">
            <User className="h-5 w-5 mr-2 text-red-600" />
            Profil
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
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
                  value={formData.profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
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
                  value={formData.profile.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                />
                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Localisation
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.profile.location}
                  onChange={(e) => handleProfileChange('location', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                />
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Mot de passe */}
        <div>
          <h3 className="text-lg font-medium flex items-center mb-4">
            <Lock className="h-5 w-5 mr-2 text-red-600" />
            Mot de passe
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe actuel
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.password.current}
                  onChange={(e) => handlePasswordChange('current', e.target.value)}
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
                  value={formData.password.new}
                  onChange={(e) => handlePasswordChange('new', e.target.value)}
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
                  value={formData.password.confirm}
                  onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Langue */}
        <div>
          <h3 className="text-lg font-medium flex items-center mb-4">
            <Globe className="h-5 w-5 mr-2 text-red-600" />
            Langue
          </h3>
          <select 
            value={formData.language}
            onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
            className="w-full max-w-xs px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="it">Italiano</option>
          </select>
        </div>

        {/* Sécurité */}
        <div>
          <h3 className="text-lg font-medium flex items-center mb-4">
            <Shield className="h-5 w-5 mr-2 text-red-600" />
            Sécurité
          </h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.security.twoFactor}
                onChange={(e) => handleSecurityChange('twoFactor', e.target.checked)}
                className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
              />
              <span className="ml-3">Authentification à deux facteurs</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.security.loginHistory}
                onChange={(e) => handleSecurityChange('loginHistory', e.target.checked)}
                className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
              />
              <span className="ml-3">Historique des connexions</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
          >
            <Save className="h-5 w-5 mr-2" />
            Enregistrer
          </button>
        </div>
      </div>
    </form>
  );
};

export default AdminSettings;