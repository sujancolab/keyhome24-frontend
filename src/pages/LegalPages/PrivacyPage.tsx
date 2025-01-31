import React from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

import { useQuery } from "@tanstack/react-query";
import Backend from "../../services/backend";

const PrivacyPage = () => {
    const { isLoading: configurationIsLoading, data: configurationData } =
        useQuery({
            queryKey: ["configurationData"],
            queryFn: () => Backend.get("/configuration"),
        });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">
                    Politique de Confidentialité
                </h1>

                <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                    {!configurationIsLoading &&
                        configurationData &&
                        configurationData.pdd.map(
                            (item: any, index: number) => (
                                <section key={index}>
                                    <h2 className="text-xl font-semibold mb-4">
                                        {index + 1}. {item.title}
                                    </h2>
                                    <p className="text-gray-700">
                                        {item.description}
                                    </p>
                                </section>
                            )
                        )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPage;
