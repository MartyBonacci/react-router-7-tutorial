import { Link } from "react-router";

export default function About() {
    return (
        <div className="flex-1 p-8 max-w-4xl mx-auto">
            <Link to="/" className="text-blue-500 hover:underline inline-block mb-4">← Go to demo</Link>
            <h1 className="text-3xl font-bold mb-6">About React Router Contacts</h1>

            <div className="prose prose-lg">
                <p className="text-gray-700 mb-4">
                    This is a demo application showing off some of the
                    powerful features of React Router, including
                    dynamic routing, nested routes, loaders, actions,
                    and more.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
                <p className="text-gray-700 mb-2">
                    Explore the demo to see how React Router handles:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    <li>
                        Data loading and mutations with loaders and
                        actions
                    </li>
                    <li>
                        Nested routing with parent/child relationships
                    </li>
                    <li>URL-based routing with dynamic segments</li>
                    <li>Pending and optimistic UI</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Learn More</h2>
                <p className="text-gray-700">
                    Check out the official documentation at{" "}
                    <a href="https://reactrouter.com" className="text-blue-500 hover:underline">
                        reactrouter.com
                    </a>{" "}
                    to learn more about building great web
                    applications with React Router.
                </p>
            </div>
        </div>
    );
}
