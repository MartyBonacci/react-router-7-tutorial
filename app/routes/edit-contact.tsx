import {Form, redirect, useNavigate} from "react-router";
import type { Route } from "./+types/edit-contact";

import {getContact, updateContact} from "../data";

export async function action({ params, request, }: Route.ActionArgs) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
}

export async function loader({ params }: Route.LoaderArgs) {
    const contact = await getContact(params.contactId);
    if (!contact) {
        throw new Response("Not Found", { status: 404 });
    }
    return { contact };
}

export default function EditContact({ loaderData, }: Route.ComponentProps) {
    const { contact } = loaderData;
    const navigate = useNavigate();

    return (
        <Form key={contact.id} method="post" className="flex flex-col max-w-2xl gap-4">
            <div className="flex flex-col">
                <span className="w-full sm:w-32 mb-2 sm:mb-0">Name</span>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        aria-label="First name"
                        defaultValue={contact.first}
                        name="first"
                        placeholder="First"
                        type="text"
                        className="flex-1 text-base rounded-lg px-3 py-2 shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        aria-label="Last name"
                        defaultValue={contact.last}
                        name="last"
                        placeholder="Last"
                        type="text"
                        className="flex-1 text-base rounded-lg px-3 py-2 shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <label className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-32 mb-2 sm:mb-0">Twitter</span>
                <input
                    defaultValue={contact.twitter}
                    name="twitter"
                    placeholder="@jack"
                    type="text"
                    className="flex-1 text-base rounded-lg px-3 py-2 shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 focus:ring-2 focus:ring-blue-500"
                />
            </label>
            <label className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-32 mb-2 sm:mb-0">Avatar URL</span>
                <input
                    aria-label="Avatar URL"
                    defaultValue={contact.avatar}
                    name="avatar"
                    placeholder="https://example.com/avatar.jpg"
                    type="text"
                    className="flex-1 text-base rounded-lg px-3 py-2 shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 focus:ring-2 focus:ring-blue-500"
                />
            </label>
            <label className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-32 mb-2 sm:mb-0">Notes</span>
                <textarea
                    defaultValue={contact.notes}
                    name="notes"
                    rows={6}
                    className="flex-1 text-base rounded-lg px-3 py-2 shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 focus:ring-2 focus:ring-blue-500 resize-none"
                />
            </label>
            <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:ml-32">
                <button type="submit" className="text-base font-medium text-blue-500 px-3 py-2 rounded-lg shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 bg-white">Save</button>
                <button onClick={() => navigate(-1)} type="button" className="text-base font-medium text-gray-700 px-3 py-2 rounded-lg shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 bg-white">Cancel</button>
            </div>
        </Form>
    );
}
