import React from 'react';
import { CreditCard } from 'lucide-react';

interface PaymentMethodsProps {
  selectedMethod: 'card';
  onMethodChange: (method: 'card') => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ selectedMethod, onMethodChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Moyen de paiement</h3>
      
      <button
        type="button"
        onClick={() => onMethodChange('card')}
        className="w-full flex items-center justify-center p-4 border rounded-lg transition-colors border-red-600 bg-red-50"
      >
        <CreditCard className="h-6 w-6 mr-3 text-gray-600" />
        <span className="font-medium">Carte bancaire</span>
      </button>
    </div>
  );
};

export default PaymentMethods;