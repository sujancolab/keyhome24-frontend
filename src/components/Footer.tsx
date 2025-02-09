import React from 'react';
import { Home, Mail, Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import TikTokIcon from './TikTokIcon';

export const Footer = () => {
  const navigate = useNavigate();
  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/keyhome24-com', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61565481790114', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/keyhome24com/', label: 'Instagram' },
    { icon: TikTokIcon, href: 'https://www.tiktok.com/@keyhome24?_t=ZN-8svs8ze7MwA&_r=1', label: 'TikTok' },
    { icon: Youtube, href: 'https://www.youtube.com/@KeyHome24', label: 'YouTube' }
  ];

  const handleNavigation = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate(path);
    }, 100);
  };

  return (
    <footer className="bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <button 
              onClick={() => handleNavigation('/')} 
              className="flex items-center mb-4"
            >
              <Home className="h-6 sm:h-8 w-6 sm:w-8 text-red-500" />
              <span className="ml-2 text-lg sm:text-xl font-bold">KeyHome24</span>
            </button>
            <p className="text-sm sm:text-base text-gray-400 mb-4">
              Votre partenaire de confiance pour trouver le bien immobilier de vos rêves.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <a href="mailto:info@keyhome24.com" className="flex items-center text-sm sm:text-base hover:text-red-500">
                <Mail className="h-5 w-5 mr-2 text-red-500" />
                <span>info@keyhome24.com</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <button onClick={() => handleNavigation('/properties')} className="hover:text-red-500">
                  Rechercher
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/requests')} className="hover:text-red-500">
                  Demandes
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/auth')} className="hover:text-red-500">
                  Espace utilisateur
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4">Liens légaux</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <button onClick={() => handleNavigation('/terms')} className="hover:text-red-500">
                  Conditions générales
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/privacy')} className="hover:text-red-500">
                  Protection des données
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('/imprint')} className="hover:text-red-500">
                  Mentions légales
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-dark-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2024 KeyHome24. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};