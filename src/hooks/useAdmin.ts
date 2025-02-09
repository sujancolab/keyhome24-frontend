import { useState, useCallback } from 'react';
import { db } from '../services/database';
import { useAdminError } from './useAdminError';

export function useAdmin() {
  const [loading, setLoading] = useState(false);
  const { addError } = useAdminError();

  const approveListing = useCallback(async (listingId: string) => {
    try {
      setLoading(true);
      const listing = await db.updateListing(listingId, { status: 'active' });
      if (!listing) {
        throw new Error('Annonce non trouvée');
      }
      await db.createNotification(listingId, {
        type: 'listing_approved',
        message: 'Votre annonce a été approuvée'
      });
      return true;
    } catch (err) {
      addError(
        'DATABASE_ERROR',
        'Erreur lors de l\'approbation de l\'annonce',
        err instanceof Error ? err.message : undefined
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, [addError]);

  const rejectListing = useCallback(async (listingId: string, reason: string) => {
    try {
      setLoading(true);
      const listing = await db.updateListing(listingId, { status: 'rejected' });
      if (!listing) {
        throw new Error('Annonce non trouvée');
      }
      await db.createNotification(listingId, {
        type: 'listing_rejected',
        message: `Votre annonce a été refusée: ${reason}`
      });
      return true;
    } catch (err) {
      addError(
        'DATABASE_ERROR',
        'Erreur lors du rejet de l\'annonce',
        err instanceof Error ? err.message : undefined
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, [addError]);

  const suspendUser = useCallback(async (userId: string, reason: string) => {
    try {
      setLoading(true);
      const user = await db.updateUser(userId, { status: 'suspended' });
      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }
      await db.createNotification(userId, {
        type: 'account_suspended',
        message: `Votre compte a été suspendu: ${reason}`
      });
      return true;
    } catch (err) {
      addError(
        'DATABASE_ERROR',
        'Erreur lors de la suspension du compte',
        err instanceof Error ? err.message : undefined
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, [addError]);

  const getStats = useCallback(async () => {
    try {
      setLoading(true);
      const [users, listings] = await Promise.all([
        db.getUsers(),
        db.getListings()
      ]);

      return {
        totalUsers: users.length,
        activeUsers: users.filter((u: any) => u.status === 'active').length,
        totalListings: listings.length,
        pendingListings: listings.filter((l: any) => l.status === 'pending').length
      };
    } catch (err) {
      addError(
        'DATABASE_ERROR',
        'Erreur lors de la récupération des statistiques',
        err instanceof Error ? err.message : undefined
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, [addError]);

  return {
    loading,
    approveListing,
    rejectListing,
    suspendUser,
    getStats
  };
}