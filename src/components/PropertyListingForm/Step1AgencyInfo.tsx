import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import FormActions from '../common/FormActions';

interface Step1AgencyInfoProps {
  onNext: () => void;
}

const Step1AgencyInfo: React.FC<Step1AgencyInfoProps> = ({ onNext }) => {
  const { register, formState: { errors, isValid } } = useFormContext();

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Informations de l'agence</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de l'agence *
            </label>
            <div className="relative">
              <input
                type="text"
                {...register('agencyInfo.name', { required: "Le nom de l'agence est requis" })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500"
                placeholder="Immobilier SA"
              />
              <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            {errors.agencyInfo?.name && (
              <p className="mt-1 text-sm text-red-600">{errors.agencyInfo.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email professionnel *
            </label>
            <div className="relative">
              <input
                type="email"
                {...register('agencyInfo.email', { 
                  required: "L'email est requis",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "L'adresse email n'est pas valide"
                  }
                })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500"
                placeholder="contact@agence.ch"
              />
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            {errors.agencyInfo?.email && (
              <p className="mt-1 text-sm text-red-600">{errors.agencyInfo.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone *
            </label>
            <div className="relative">
              <input
                type="tel"
                {...register('agencyInfo.phone', { 
                  required: "Le téléphone est requis",
                  pattern: {
                    value: /^\+?[0-9\s-]{10,}$/,
                    message: "Le numéro de téléphone n'est pas valide"
                  }
                })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500"
                placeholder="+41 XX XXX XX XX"
              />
              <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            {errors.agencyInfo?.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.agencyInfo.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse *
            </label>
            <div className="relative">
              <input
                type="text"
                {...register('agencyInfo.address', { required: "L'adresse est requise" })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500"
                placeholder="Rue de la Gare 1"
              />
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            {errors.agencyInfo?.address && (
              <p className="mt-1 text-sm text-red-600">{errors.agencyInfo.address.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Localité *
            </label>
            <div className="relative">
              <input
                type="text"
                {...register('agencyInfo.location', { required: "La localité est requise" })}
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500"
                placeholder="1000 Lausanne"
              />
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            {errors.agencyInfo?.location && (
              <p className="mt-1 text-sm text-red-600">{errors.agencyInfo.location.message}</p>
            )}
          </div>
        </div>
      </div>

      <FormActions
        onNext={onNext}
        showNext={true}
        disabled={!isValid}
      />
    </div>
  );
};

export default Step1AgencyInfo;