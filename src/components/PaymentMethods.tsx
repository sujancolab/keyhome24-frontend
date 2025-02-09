import React from "react";
import { CreditCard } from "lucide-react";

interface PaymentMethodsProps {
    selectedMethod: "card" | "twint";
    onMethodChange: (method: "card" | "twint") => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
    selectedMethod,
    onMethodChange,
}) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
                Moyen de paiement
            </h3>

            {/* sm:grid-cols-2 gap-4 */}
            <div className="grid grid-cols-1">
                <button
                    type="button"
                    onClick={() => onMethodChange("card")}
                    className={`flex items-center justify-center p-4 border rounded-lg transition-colors ${
                        selectedMethod === "card"
                            ? "border-red-600 bg-red-50"
                            : "border-gray-200 hover:border-red-300"
                    }`}
                >
                    <CreditCard className="h-6 w-6 mr-3 text-gray-600" />
                    <span className="font-medium">Carte bancaire</span>
                </button>

                {/*         <button
          type="button"
          onClick={() => onMethodChange('twint')}
          className={`flex items-center justify-center p-4 border rounded-lg transition-colors ${
            selectedMethod === 'twint'
              ? 'border-red-600 bg-red-50'
              : 'border-gray-200 hover:border-red-300'
          }`}
        >
          <img 
            src="https://www.twint.ch/content/uploads/2021/05/twint-logo.svg"
            alt="TWINT"
            className="h-6 mr-3"
          />
          <span className="font-medium">TWINT</span>
        </button> */}
            </div>
        </div>
    );
};

export default PaymentMethods;
