import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

const ImprintPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Informations légales</h2>
            <div className="space-y-3 text-gray-700">
              <p>Keyhome24 GmbH</p>
              <p>CHE-XXX.XXX.XXX</p>
              <p>Dürrenmatten 6</p>
              <p>4123 Allschwil</p>
              <p>Suisse</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Contact</h2>
            <div className="space-y-3 text-gray-700">
              <p>Téléphone : +41 XX XXX XX XX</p>
              <p>Email : info@keyhome24.ch</p>
              <p>Site web : www.keyhome24.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Responsabilité éditoriale</h2>
            <div className="space-y-3 text-gray-700">
              <p>Directeur de la publication et responsable éditorial : Bekjiri Nderim</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Hébergement</h2>
            <div className="space-y-3 text-gray-700">
              <p>IONOS SARL</p>
              <p>7, place de la Gare</p>
              <p>BP 70109</p>
              <p>57201 SARREGUEMINES</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Autorités de surveillance</h2>
            <div className="space-y-3 text-gray-700">
              <p>FINMA - Autorité fédérale de surveillance des marchés financiers</p>
              <p>Laupenstrasse 27</p>
              <p>3003 Berne</p>
              <p>Suisse</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Propriété intellectuelle</h2>
            <p className="text-gray-700">
              L'ensemble du contenu de ce site est protégé par le droit d'auteur selon la 
              législation suisse. Toute reproduction ou utilisation non autorisée est interdite.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ImprintPage;