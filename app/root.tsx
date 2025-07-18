import {
    Outlet,
    Scripts,
    ScrollRestoration,
    isRouteErrorResponse, redirect
} from "react-router";
import type { Route } from "./+types/root";
import tailwindStylesHref from "./tailwind.css?url";
import { createEmptyContact } from "./data";

export async function action() {
    const contact = await createEmptyContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

export default function App() {
    return <Outlet />;
}

// The Layout component is a special export for the root route.
// It acts as your document's "app shell" for all route components, HydrateFallback, and ErrorBoundary
// For more information, see https://reactrouter.com/explanation/special-files#layout-export
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href={tailwindStylesHref} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// The top most error boundary for the app, rendered when your app throws an error
// For more information, see https://reactrouter.com/start/framework/route-module#errorboundary
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">{message}</h1>
      <p className="text-gray-600 mb-4">{details}</p>
      {stack && (
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-w-full">
          <code className="text-sm">{stack}</code>
        </pre>
      )}
    </main>
  );
}

export function HydrateFallback() {
  return (
      <div className="fixed inset-0 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4" />
        <p className="text-gray-600">Loading, please wait...</p>
      </div>
  );
}
