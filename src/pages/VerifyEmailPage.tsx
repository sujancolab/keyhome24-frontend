import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { CheckCircle2, XCircle, Loader } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const { verifyEmail } = useAuthContext();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      return;
    }

    const verify = async () => {
      try {
        const success = await verifyEmail(token);
        setStatus(success ? 'success' : 'error');
        if (success) {
          setTimeout(() => {
            navigate('/auth', { replace: true });
          }, 3000);
        }
      } catch (error) {
        setStatus('error');
      }
    };

    verify();
  }, [searchParams, verifyEmail, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg text-center">
          {status === 'loading' && (
            <>
              <Loader className="h-16 w-16 text-red-600 mx-auto animate-spin" />
              <h2 className="text-2xl font-bold text-gray-900">
                Vérification de votre email...
              </h2>
              <p className="text-gray-600">
                Veuillez patienter pendant que nous vérifions votre adresse email.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900">
                Email vérifié avec succès !
              </h2>
              <p className="text-gray-600">
                Votre compte a été activé. Vous allez être redirigé vers la page de connexion...
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="h-16 w-16 text-red-600 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900">
                Erreur de vérification
              </h2>
              <p className="text-gray-600 mb-6">
                Le lien de vérification est invalide ou a expiré. Veuillez vous reconnecter pour recevoir un nouveau lien.
              </p>
              <button
                onClick={() => navigate('/auth')}
                className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Retour à la connexion
              </button>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VerifyEmailPage;