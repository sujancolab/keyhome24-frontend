import { useState, useEffect, useCallback } from 'react';

export interface SubscriptionPlan {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  features: string[];
  type: 'property' | 'request';
}

const PLANS_UPDATE_EVENT = 'subscriptionPlansUpdate';

export function useSubscriptionPlans(type?: 'property' | 'request') {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPlans = useCallback(() => {
    const storedPlans = localStorage.getItem('subscriptionPlans');
    let allPlans: SubscriptionPlan[];

    if (storedPlans) {
      allPlans = JSON.parse(storedPlans);
    } else {
      // Plans basés sur l'analyse du marché suisse
      allPlans = [
        // Plans pour les annonces immobilières
        {
          id: 'property-basic',
          name: 'Basic',
          duration: 30,
          price: 29.90,
          description: 'Idéal pour une annonce unique',
          features: [
            'Une annonce pendant 30 jours',
            'Photos HD illimitées',
            'Statistiques de base',
            'Support par email'
          ],
          type: 'property'
        },
        {
          id: 'property-pro',
          name: 'Pro',
          duration: 60,
          price: 79.90,
          description: 'Pour les agents immobiliers',
          features: [
            'Jusqu\'à 5 annonces simultanées',
            'Photos HD illimitées',
            'Visite virtuelle',
            'Statistiques avancées',
            'Position premium',
            'Support prioritaire'
          ],
          type: 'property'
        },
        {
          id: 'property-premium',
          name: 'Premium',
          duration: 90,
          price: 149.90,
          description: 'Solution complète pour les professionnels',
          features: [
            'Annonces illimitées',
            'Photos HD et vidéos',
            'Visite virtuelle 3D',
            'Statistiques détaillées',
            'Position premium garantie',
            'Support dédié 7j/7',
            'Export des contacts',
            'API disponible'
          ],
          type: 'property'
        },
        // Plans pour les demandes
        {
          id: 'request-basic',
          name: 'Basic',
          duration: 30,
          price: 9.90,
          description: 'Pour une recherche simple',
          features: [
            'Une demande pendant 30 jours',
            'Alertes email',
            'Contact direct'
          ],
          type: 'request'
        },
        {
          id: 'request-plus',
          name: 'Plus',
          duration: 60,
          price: 19.90,
          description: 'Pour une recherche approfondie',
          features: [
            'Une demande pendant 60 jours',
            'Position premium',
            'Alertes email et SMS',
            'Contact prioritaire',
            'Statistiques de recherche'
          ],
          type: 'request'
        },
        {
          id: 'request-premium',
          name: 'Premium',
          duration: 90,
          price: 39.90,
          description: 'Pour les recherches multiples',
          features: [
            'Jusqu\'à 3 demandes actives',
            'Durée de 90 jours',
            'Position premium garantie',
            'Alertes personnalisées',
            'Contact prioritaire',
            'Statistiques détaillées',
            'Accompagnement personnalisé'
          ],
          type: 'request'
        }
      ];
      localStorage.setItem('subscriptionPlans', JSON.stringify(allPlans));
    }

    const filteredPlans = type ? allPlans.filter(plan => plan.type === type) : allPlans;
    setPlans(filteredPlans);
    setLoading(false);
  }, [type]);

  const updatePlans = useCallback((newPlans: SubscriptionPlan[]) => {
    localStorage.setItem('subscriptionPlans', JSON.stringify(newPlans));
    
    const event = new CustomEvent(PLANS_UPDATE_EVENT, { detail: newPlans });
    window.dispatchEvent(event);
    
    if (type) {
      setPlans(newPlans.filter(plan => plan.type === type));
    } else {
      setPlans(newPlans);
    }
  }, [type]);

  useEffect(() => {
    loadPlans();

    const handlePlansUpdate = (e: CustomEvent<SubscriptionPlan[]>) => {
      if (type) {
        setPlans(e.detail.filter(plan => plan.type === type));
      } else {
        setPlans(e.detail);
      }
    };

    window.addEventListener(PLANS_UPDATE_EVENT, handlePlansUpdate as EventListener);
    
    return () => {
      window.removeEventListener(PLANS_UPDATE_EVENT, handlePlansUpdate as EventListener);
    };
  }, [loadPlans, type]);

  return { plans, loading, updatePlans };
}