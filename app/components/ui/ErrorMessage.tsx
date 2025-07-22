import type { ReactNode } from "react";

interface ErrorMessageProps {
  errors?: Record<string, string[]>;
  message?: string;
  className?: string;
}

export function ErrorMessage({ errors, message, className = "" }: ErrorMessageProps) {
  if (!errors && !message) return null;

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      {message && (
        <p className="text-red-800 font-medium mb-2">{message}</p>
      )}
      {errors && Object.keys(errors).length > 0 && (
        <ul className="text-red-700 text-sm space-y-1">
          {Object.entries(errors).map(([field, messages]) =>
            messages.map((msg, index) => (
              <li key={`${field}-${index}`}>
                <span className="font-medium">{field}:</span> {msg}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

interface FieldErrorProps {
  error?: string;
  className?: string;
}

export function FieldError({ error, className = "" }: FieldErrorProps) {
  if (!error) return null;

  return (
    <p className={`text-red-600 text-sm mt-1 ${className}`} role="alert">
      {error}
    </p>
  );
}