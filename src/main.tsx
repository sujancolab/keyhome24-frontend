import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./components/ErrorBoundary";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      suspense: true,
      useErrorBoundary: true,
    },
  },
});

const root = createRoot(container);
root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <Suspense fallback={
                        <div className="min-h-screen flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                        </div>
                    }>
                        <App />
                    </Suspense>
                </QueryClientProvider>
            </AuthProvider>
        </ErrorBoundary>
    </React.StrictMode>
);
