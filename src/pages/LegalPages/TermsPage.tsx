import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Conditions Générales d'Utilisation</h1>

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Dispositions générales</h2>
            <p className="text-gray-700">
              Les présentes conditions générales régissent l'utilisation de la plateforme Keyhome24, 
              accessible à l'adresse www.keyhome24.com. En accédant à notre plateforme, vous acceptez 
              d'être lié par ces conditions. Dans le cas contraire, nous vous prions de bien vouloir 
              quitter notre page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Services proposés</h2>
            <p className="text-gray-700">
              Keyhome24 est une plateforme de mise en relation entre acheteurs, vendeurs, locataires 
              et bailleurs de biens immobiliers en Suisse. Nous ne sommes pas une agence immobilière 
              et n'intervenons pas dans les transactions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Obligations des utilisateurs</h2>
            <p className="text-gray-700">
              Les utilisateurs s'engagent à fournir des informations exactes et à jour, à respecter 
              la législation suisse en vigueur, à ne pas publier de contenus illégaux ou trompeurs, 
              et à respecter les droits des autres utilisateurs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Protection des données</h2>
            <p className="text-gray-700">
              Conformément à la Loi fédérale sur la protection des données (LPD), nous nous engageons 
              à protéger vos données personnelles. Pour plus d'informations, consultez notre politique 
              de confidentialité.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Responsabilité</h2>
            <p className="text-gray-700">
              Keyhome24 décline toute responsabilité quant aux contenus publiés par les utilisateurs 
              et aux transactions effectuées entre les parties. Les utilisateurs sont seuls responsables 
              de leurs actions sur la plateforme.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Droit applicable et for juridique</h2>
            <p className="text-gray-700">
              Les présentes conditions sont soumises au droit suisse. Tout litige sera soumis à la 
              compétence exclusive des tribunaux du canton de Bâle-Campagne, sous réserve d'un recours 
              au Tribunal fédéral.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;