import { useState, useEffect, useCallback } from "react";
import Backend from "../services/Backend";

export interface SubscriptionPlan {
    id: string;
    name: string;
    duration: number;
    price: number;
    description: string;
    features: string[];
    type: "property" | "request";
}

// Événement personnalisé pour la synchronisation des plans
const PLANS_UPDATE_EVENT = "subscriptionPlansUpdate";

export function useSubscriptionPlans(type?: "property" | "request") {
    const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
    const [loading, setLoading] = useState(true);

    const loadPlans = useCallback(async () => {
        const storedPlans = localStorage.getItem("subscriptionPlans");
        let allPlans: SubscriptionPlan[];

        if (storedPlans) {
            allPlans = JSON.parse(storedPlans);
        } else {
            // Plans par défaut
            allPlans = await Backend.get("/plans");
            localStorage.setItem("subscriptionPlans", JSON.stringify(allPlans));
        }

        // Filtrer les plans selon le type si spécifié
        const filteredPlans = type
            ? allPlans.filter((plan) => plan.type === type)
            : allPlans;
        setPlans(filteredPlans);
        setLoading(false);
    }, [type]);

    // Fonction pour mettre à jour les plans
    const updatePlans = useCallback(
        (newPlans: SubscriptionPlan[]) => {
            localStorage.setItem("subscriptionPlans", JSON.stringify(newPlans));

            // Émettre un événement personnalisé pour notifier les autres composants
            const event = new CustomEvent(PLANS_UPDATE_EVENT, {
                detail: newPlans,
            });
            window.dispatchEvent(event);

            // Mettre à jour l'état local
            if (type) {
                setPlans(newPlans.filter((plan) => plan.type === type));
            } else {
                setPlans(newPlans);
            }
        },
        [type]
    );

    useEffect(() => {
        loadPlans();

        // Écouter les changements des plans via l'événement personnalisé
        const handlePlansUpdate = (e: CustomEvent<SubscriptionPlan[]>) => {
            if (type) {
                setPlans(e.detail.filter((plan) => plan.type === type));
            } else {
                setPlans(e.detail);
            }
        };

        window.addEventListener(
            PLANS_UPDATE_EVENT,
            handlePlansUpdate as EventListener
        );

        return () => {
            window.removeEventListener(
                PLANS_UPDATE_EVENT,
                handlePlansUpdate as EventListener
            );
        };
    }, [loadPlans, type]);

    return { plans, loading, updatePlans };
}
