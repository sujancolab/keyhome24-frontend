import React, { Component, ErrorInfo } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class AdminErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Admin Error Boundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-sm p-6 max-w-lg w-full">
            <div className="flex items-center gap-4 text-red-600 mb-4">
              <AlertTriangle className="h-8 w-8" />
              <h2 className="text-xl font-bold">Erreur système</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Une erreur inattendue s'est produite dans l'interface d'administration. 
              Veuillez réessayer ou contacter le support technique.
            </p>

            <div className="bg-red-50 p-4 rounded-lg mb-6">
              <p className="text-sm font-mono text-red-800">
                {this.state.error?.message}
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Recharger la page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}