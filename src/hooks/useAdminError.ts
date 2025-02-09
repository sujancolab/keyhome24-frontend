import { useState, useCallback } from 'react';

export type AdminErrorType = 
  | 'AUTH_ERROR'
  | 'PERMISSION_ERROR' 
  | 'VALIDATION_ERROR'
  | 'DATABASE_ERROR'
  | 'NETWORK_ERROR';

interface AdminError {
  type: AdminErrorType;
  message: string;
  details?: string;
  timestamp: Date;
}

export function useAdminError() {
  const [errors, setErrors] = useState<AdminError[]>([]);

  const addError = useCallback((type: AdminErrorType, message: string, details?: string) => {
    const error: AdminError = {
      type,
      message,
      details,
      timestamp: new Date()
    };
    
    setErrors(prev => [...prev, error]);
    
    // Log l'erreur pour l'administrateur
    console.error(`[Admin Error] ${type}: ${message}`, details);
    
    return error;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const removeError = useCallback((index: number) => {
    setErrors(prev => prev.filter((_, i) => i !== index));
  }, []);

  return {
    errors,
    addError,
    clearErrors,
    removeError
  };
}