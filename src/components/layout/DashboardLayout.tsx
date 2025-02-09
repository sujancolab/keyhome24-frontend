import React from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  showMobileSidebar?: boolean;
  onToggleMobileSidebar?: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebar,
  showMobileSidebar,
  onToggleMobileSidebar
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sidebar && (
          <div className="lg:hidden mb-4">
            <button
              onClick={onToggleMobileSidebar}
              className="w-full bg-white p-4 rounded-lg shadow-sm text-left font-medium text-gray-700 hover:bg-gray-50"
            >
              Menu du tableau de bord
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {sidebar && (
            <div className={`lg:block ${showMobileSidebar ? 'block' : 'hidden'}`}>
              {sidebar}
            </div>
          )}

          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;