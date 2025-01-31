// import React, { useEffect, useState } from 'react';
// import { ArrowLeft, Check, Info, Lock, ChevronDown, ChevronUp, CreditCard } from 'lucide-react';
// import { useSubscriptionPlans } from '../../hooks/useSubscriptionPlans';
// import PaymentMethods from '../PaymentMethods';
// import Backend from '../../services/backend';

// interface Step3PaymentProps {
//   onBack: () => void;
//   onPayment: () => void;
// }

// const Step3Payment: React.FC<Step3PaymentProps> = ({ onBack, onPayment }) => {
//   const { plans, loading } = useSubscriptionPlans('property');
//   const [selectedPlan, setSelectedPlan] = useState<string>('');
//   // const [allplan, setAllPlan] = useState(null);
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState<'card' | 'twint'>('card');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!termsAccepted) {
//       alert('Veuillez accepter les conditions avant de procéder au paiement');
//       return;
//     }

//     if (paymentMethod === 'card') {
//       // Redirection vers Stripe
//       window.location.href = `https://checkout.stripe.com/pay/cs_test_${selectedPlan}`;
//     } else {
//       onPayment();
//     }
//   };
//   // const loadPlans = async() => {
//   //   let plan12s = await Backend.get("/plans");
//   //   setAllPlan(plan12s);
//   //   console.log(allplan);
//   // };
//   // useEffect(()=>{
//   //   loadPlans();
    
//   // },[])

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       <div className="form-section">
//         <h2 className="text-xl font-semibold mb-6">Choisissez votre durée de publication</h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           {plans.map((plan) => (
//             <div
//               key={plan.id}
//               onClick={() => setSelectedPlan(plan.id)}
//               className={`border rounded-lg p-6 cursor-pointer transition-all ${
                // selectedPlan === plan.id 
                //   ? 'border-red-600 bg-red-50 shadow-md' 
//                   : 'border-gray-200 hover:border-red-300'
//               }`}
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="font-semibold text-lg">{plan.name}</h3>
//                   <p className="text-sm text-gray-600">{plan.description}</p>
//                 </div>
//                 {selectedPlan === plan.id && (
//                   <Check className="h-5 w-5 text-red-600" />
//                 )}
//               </div>

//               <p className="text-2xl font-bold text-gray-900 mb-4">
//                 {plan.price.toFixed(2)} <span className="text-sm font-normal">CHF</span>
//               </p>

//               <ul className="space-y-2">
//                 {plan.features.map((feature, index) => (
//                   <li key={index} className="flex items-center text-sm">
//                     <Check className="h-4 w-4 text-green-500 mr-2" />
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         <PaymentMethods
//           selectedMethod={paymentMethod}
//           onMethodChange={setPaymentMethod}
//         />

//         {paymentMethod === 'twint' && (
//           <div className="mt-6 p-6 bg-blue-50 rounded-lg text-center">
//             <img 
//               src="https://www.twint.ch/content/uploads/2021/05/twint-qr.png"
//               alt="TWINT QR Code"
//               className="w-48 h-48 mx-auto mb-4"
//             />
//             <p className="text-blue-800">
//               Scannez ce QR code avec votre application TWINT pour payer
//             </p>
//           </div>
//         )}

//         <div className="mt-6">
//           <label className="flex items-start space-x-3">
//             <input
//               type="checkbox"
//               checked={termsAccepted}
//               onChange={(e) => setTermsAccepted(e.target.checked)}
//               className="mt-1 rounded text-red-600 focus:ring-red-500 h-4 w-4"
//               required
//             />
//             <span className="text-sm text-gray-600">
//               J'accepte les conditions de publication et la politique de confidentialité.
//               Je comprends que le paiement est non remboursable.
//             </span>
//           </label>
//         </div>
//       </div>

//       <div className="flex justify-between">
//         <button
//           onClick={onBack}
//           className="flex items-center text-gray-600 hover:text-gray-900"
//         >
//           <ArrowLeft className="h-5 w-5 mr-2" />
//           Retour
//         </button>
//         <button
//           onClick={handleSubmit}
//           className={`px-8 py-3 rounded-lg transition-colors shadow-sm ${
//             termsAccepted && selectedPlan
//               ? 'bg-red-600 text-white hover:bg-red-700'
//               : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//           }`}
//           disabled={!termsAccepted || !selectedPlan}
//         >
//           Payer {selectedPlan && plans.find(p => p.id === selectedPlan)?.price.toFixed(2)} CHF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Step3Payment;



import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useSubscriptionPlans } from '../../hooks/useSubscriptionPlans';
import PaymentMethods from '../PaymentMethods';

interface Step3PaymentProps {
  onBack: () => void;
  onPayment: () => void;
}

const Step3Payment: React.FC<Step3PaymentProps> = ({ onBack, onPayment }) => {
  const { plans, loading } = useSubscriptionPlans('property');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'twint'>('card');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert('Veuillez accepter les conditions avant de procéder au paiement');
      return;
    }

    if (paymentMethod === 'card') {
      // Redirect to Stripe
      window.location.href = `https://checkout.stripe.com/pay/cs_test_${selectedPlan}`;
    } else {
      onPayment();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="form-section">
        <h2 className="text-xl font-semibold mb-6">Choisissez votre durée de publication</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`border rounded-lg p-6 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? 'border-red-600 bg-red-50 shadow-md'
                  : 'border-gray-200 hover:border-red-300'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </div>
                {selectedPlan === plan.id && <Check className="h-5 w-5 text-red-600" />}
              </div>

              <p className="text-2xl font-bold text-gray-900 mb-4">
                {plan.price.toFixed(2)} <span className="text-sm font-normal">CHF</span>
              </p>

              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <PaymentMethods selectedMethod={paymentMethod} onMethodChange={setPaymentMethod} />

        {paymentMethod === 'twint' && (
          <div className="mt-6 p-6 bg-blue-50 rounded-lg text-center">
            <img
              src="https://www.twint.ch/content/uploads/2021/05/twint-qr.png"
              alt="TWINT QR Code"
              className="w-48 h-48 mx-auto mb-4"
            />
            <p className="text-blue-800">
              Scannez ce QR code avec votre application TWINT pour payer
            </p>
          </div>
        )}

        <div className="mt-6">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 rounded text-red-600 focus:ring-red-500 h-4 w-4"
            />
            <span className="text-sm text-gray-600">
              J'accepte les conditions de publication et la politique de confidentialité.
              Je comprends que le paiement est non remboursable.
            </span>
          </label>
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
          onClick={handleSubmit}
          className={`px-8 py-3 rounded-lg transition-colors shadow-sm ${
            termsAccepted && selectedPlan
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!termsAccepted || !selectedPlan}
        >
          Payer{' '}
          {selectedPlan && plans.find((p) => p.id === selectedPlan)?.price.toFixed(2)}{' '}
          CHF
        </button>
      </div>
    </div>
  );
};

export default Step3Payment;
