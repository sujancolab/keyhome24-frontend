import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

import { useQuery } from "@tanstack/react-query";
import Backend from "../services/backend";

const SuccessPaymentPage = () => {
    const { sessionId } = useParams();

    const { isLoading, data } = useQuery({
        queryKey: ["paymentSuccess", sessionId],
        queryFn: () => Backend.get(`/annonces/success/${sessionId}`),
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">
                    Le paiement a été validé
                </h1>
                <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                    <p>
                        Votre paiement a été validé avec succès. Vous pouvez
                        maintenant accéder à votre tableau de bord pour
                        consulter les détails de votre commande.
                    </p>
                    <a
                        href="/dashboard"
                        className="block w-full bg-primary-500 hover:bg-primary-600 text-white font-medium text-center rounded-lg py-3"
                    >
                        Accéder à mon tableau de bord
                    </a>
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">
                        Informations supplémentaires
                    </h2>
                    <p>
                        Merci d'avoir choisi notre service. Si vous avez des
                        questions ou des préoccupations, n'hésitez pas à nous
                        contacter.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SuccessPaymentPage;
