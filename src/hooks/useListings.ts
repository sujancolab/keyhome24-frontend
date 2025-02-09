import { useState, useCallback } from 'react';
import { db } from '../services/database';

export function useListings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createListing = useCallback(async (data: any) => {
    try {
      setLoading(true);
      return await db.createListing(data);
    } catch (err) {
      setError('Erreur lors de la création de l\'annonce');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateListing = useCallback(async (id: string, data: any) => {
    try {
      setLoading(true);
      return await db.updateListing(id, data);
    } catch (err) {
      setError('Erreur lors de la mise à jour de l\'annonce');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteListing = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await db.deleteListing(id);
      return true;
    } catch (err) {
      setError('Erreur lors de la suppression de l\'annonce');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getListings = useCallback(async (filters?: any) => {
    try {
      setLoading(true);
      return await db.getListings(filters);
    } catch (err) {
      setError('Erreur lors de la récupération des annonces');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createListing,
    updateListing,
    deleteListing,
    getListings
  };
}