import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Protection des données</h2>
            <p className="text-gray-700">
              Conformément à la Loi fédérale sur la protection des données (LPD) et au Règlement 
              général sur la protection des données (RGPD), nous nous engageons à protéger vos 
              données personnelles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Données collectées</h2>
            <p className="text-gray-700">
              Nous collectons les données suivantes : les informations d'identification (nom, prénom, 
              email), les coordonnées de contact, les données de connexion et d'utilisation, ainsi 
              que les informations relatives aux annonces publiées.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Utilisation des données</h2>
            <p className="text-gray-700">
              Vos données sont utilisées pour gérer votre compte et vos annonces, faciliter la mise 
              en relation entre utilisateurs, améliorer nos services et respecter nos obligations légales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Conservation des données</h2>
            <p className="text-gray-700">
              Vos données sont conservées aussi longtemps que nécessaire pour les finalités poursuivies, 
              conformément aux exigences légales. Vous pouvez demander leur suppression à tout moment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Droits des utilisateurs</h2>
            <p className="text-gray-700">
              Conformément à la LPD, vous disposez des droits suivants : le droit d'accès à vos données, 
              le droit de rectification, le droit à l'effacement, le droit d'opposition au traitement, 
              ainsi que le droit à la portabilité des données.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Sécurité</h2>
            <p className="text-gray-700">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger 
              vos données contre tout accès non autorisé, modification, divulgation ou destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Contact</h2>
            <p className="text-gray-700">
              Pour toute question concernant la protection de vos données, vous pouvez contacter notre 
              délégué à la protection des données à l'adresse : info@keyhome24.com
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;