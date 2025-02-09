import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const CancelPaymentPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">
                    Le paiement a été annulé
                </h1>
                <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                    <p>
                        Votre paiement a été annulé. Vous pouvez réessayer ou
                        contacter le support si vous rencontrez des problèmes.
                    </p>
                    <a
                        href="/"
                        className="block w-full bg-primary-500 hover:bg-primary-600 text-white font-medium text-center rounded-lg py-3"
                    >
                        Retour à l'accueil
                    </a>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CancelPaymentPage;
