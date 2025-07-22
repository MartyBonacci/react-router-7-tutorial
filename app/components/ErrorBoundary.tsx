import type { ReactNode } from "react";
import { useRouteError } from "react-router";

interface ErrorBoundaryProps {
  children: ReactNode;
}

export function RootErrorBoundary() {
  const error = useRouteError();
  
  console.error("Root error:", error);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-4">
          We apologize for the inconvenience. Please try refreshing the page.
        </p>
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <p className="text-red-800 text-sm font-medium">Error Details:</p>
          <pre className="text-red-700 text-sm mt-2 overflow-auto">
            {error instanceof Error ? error.message : "Unknown error"}
          </pre>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}

export function ContactErrorBoundary() {
  const error = useRouteError();
  
  console.error("Contact error:", error);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-red-800 mb-2">Contact Error</h2>
        <p className="text-red-700 mb-4">
          {error instanceof Error ? error.message : "Failed to load contact"}
        </p>
        <a
          href="/"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          &larr; Back to contacts
        </a>
      </div>
    </div>
  );
}