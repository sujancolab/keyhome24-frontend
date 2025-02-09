import React from 'react';
import { ArrowLeft, Check, Info } from 'lucide-react';
import { subscriptionPlans } from '../../types/propertyListing';

interface Step4PaymentProps {
  onBack: () => void;
}

const Step4Payment: React.FC<Step4PaymentProps> = ({ onBack }) => {
  const [selectedPlan, setSelectedPlan] = React.useState(subscriptionPlans[0].id);
  const [termsAccepted, setTermsAccepted] = React.useState(false);

  return (
    <div className="space-y-8">
      <div className="form-section">
        <h2 className="text-xl font-semibold mb-6">Choisissez votre offre de publication</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg p-6 cursor-pointer transition-all ${
                selectedPlan === plan.id 
                  ? 'border-red-600 bg-red-50 shadow-md' 
                  : 'border-gray-200 hover:border-red-300'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <p className="text-sm text-gray-600">{plan.duration} jours</p>
                </div>
                {selectedPlan === plan.id && (
                  <Check className="h-5 w-5 text-red-600" />
                )}
              </div>

              <p className="text-2xl font-bold text-gray-900 mb-4">
                {plan.price.toFixed(2)} <span className="text-sm font-normal">CHF</span>
              </p>

              <ul className="space-y-2 text-sm text-gray-600">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-red-600 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-900 mb-2">Informations importantes</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                <li>Votre annonce sera visible après validation (24-48h ouvrables)</li>
                <li>Paiement sécurisé par carte bancaire</li>
                <li>Suppression automatique à la fin de la période choisie</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
              J'accepte les conditions de publication et comprends que le paiement est non remboursable
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </button>
        <button
          type="submit"
          className={`px-8 py-3 rounded-lg transition-colors shadow-sm flex items-center ${
            termsAccepted
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!termsAccepted}
        >
          Payer {subscriptionPlans.find(p => p.id === selectedPlan)?.price.toFixed(2)} CHF
        </button>
      </div>
    </div>
  );
};

export default Step4Payment;