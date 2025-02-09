import React, { useState, useEffect } from 'react';
import { User, Menu, X, Building, Search, Home, LogOut, Globe } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'it', label: 'Italiano' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setShowLanguageMenu(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleLogoClick = () => {
    localStorage.removeItem('propertySearchFilters');
    navigate('/');
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode);
    setShowLanguageMenu(false);
    // Ici, vous pouvez ajouter la logique pour changer la langue de l'application
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[9999]">
        <nav className={`relative transition-all duration-300 ${
          isScrolled ? 'bg-dark-900/95 backdrop-blur-sm shadow-lg' : 'bg-dark-900'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <button 
                onClick={handleLogoClick}
                className="flex items-center group"
              >
                <Home className="h-8 w-8 text-red-500 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <span className="ml-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-red-500">KeyHome24</span>
              </button>
              
              <div className="hidden md:flex items-center space-x-8">
                <Link 
                  to="/properties" 
                  className="text-white hover:text-red-500 flex items-center transition-colors"
                >
                  <Building className="h-5 w-5 mr-1" />
                  Propriétés
                </Link>
                <Link 
                  to="/requests" 
                  className="text-white hover:text-red-500 flex items-center transition-colors"
                >
                  <Search className="h-5 w-5 mr-1" />
                  Demandes
                </Link>

                {/* Sélecteur de langue - Desktop */}
                <div className="relative">
                  <button
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    className="text-white hover:text-red-500 flex items-center transition-colors"
                  >
                    <Globe className="h-5 w-5 mr-2" />
                    {languages.find(lang => lang.code === currentLanguage)?.label}
                  </button>
                  
                  {showLanguageMenu && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                            currentLanguage === lang.code ? 'text-red-600 font-medium' : 'text-gray-700'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {user ? (
                  <div className="flex items-center space-x-4">
                    <Link 
                      to="/dashboard"
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                    >
                      <User className="h-5 w-5 mr-2" />
                      Tableau de bord
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-white hover:text-red-500 flex items-center transition-colors"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Déconnexion
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/auth" 
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Connexion
                  </Link>
                )}
              </div>
              
              <button 
                className="md:hidden text-white hover:text-red-500 transition-colors p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Menu mobile */}
          <div 
            className={`md:hidden fixed inset-0 top-16 bg-dark-900/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ height: 'calc(100vh - 4rem)' }}
          >
            <div className="h-full overflow-y-auto">
              <div className="p-4 space-y-4">
                {/* Sélecteur de langue - Mobile */}
                <div className="border-b border-dark-700 pb-4">
                  <p className="text-gray-400 text-sm mb-2 flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    Langue
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`py-2 px-3 rounded-lg text-sm ${
                          currentLanguage === lang.code
                            ? 'bg-red-500 text-white'
                            : 'text-white hover:bg-dark-700'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                <Link 
                  to="/properties"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center p-3 hover:bg-dark-700 rounded-lg text-white"
                >
                  <Building className="h-5 w-5 mr-3 text-red-500" />
                  Propriétés
                </Link>
                <Link 
                  to="/requests"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center p-3 hover:bg-dark-700 rounded-lg text-white"
                >
                  <Search className="h-5 w-5 mr-3 text-red-500" />
                  Demandes
                </Link>
                {user ? (
                  <>
                    <Link 
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center p-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <User className="h-5 w-5 mr-3" />
                      Tableau de bord
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full p-3 hover:bg-dark-700 rounded-lg text-white"
                    >
                      <LogOut className="h-5 w-5 mr-3 text-red-500" />
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/auth"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center p-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <User className="h-5 w-5 mr-3" />
                    Connexion
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="h-16"></div>
    </>
  );
};