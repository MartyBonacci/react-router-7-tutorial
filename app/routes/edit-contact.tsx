import {Form, redirect, useNavigate} from "react-router";
import type { Route } from "./+types/edit-contact";
import { z } from "zod";

import {getContact, updateContact} from "../data";
import { contactFormSchema } from "../lib/schemas/contact";

export async function action({ params, request, }: Route.ActionArgs) {
    const formData = await request.formData();
    
    try {
        // Parse and validate form data
        const validatedData = contactFormSchema.parse({
            first: formData.get('firstName'),
            last: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            twitter: formData.get('twitter'),
            avatar: formData.get('avatar'),
            notes: formData.get('notes'),
        });

        // Map form data to database fields
        const updates = {
            first: validatedData.first,
            last: validatedData.last,
            email: validatedData.email,
            phone: validatedData.phone || undefined,
            twitter: validatedData.twitter || undefined,
            avatar: validatedData.avatar || undefined,
            notes: validatedData.notes || undefined,
        };

        await updateContact(params.contactId, updates);
        return redirect(`/contacts/${params.contactId}`);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                errors: error.flatten().fieldErrors,
                values: Object.fromEntries(formData),
            };
        }
        throw error;
    }
}

export async function loader({ params }: Route.LoaderArgs) {
    const contact = await getContact(params.contactId);
    if (!contact) {
        throw new Response("Not Found", { status: 404 });
    }
    return { contact };
}

export default function EditContact({ loaderData, actionData }: Route.ComponentProps) {
    const { contact } = loaderData;
    const navigate = useNavigate();
    const errors = actionData?.errors as Record<string, string[]> | undefined;
    const values = actionData?.values as Record<string, string> | undefined || {};

    return (
        <Form key={contact.id} method="post" className="flex flex-col max-w-2xl gap-4">
            <div className="flex flex-col">
                <span className="w-full sm:w-32 mb-2 sm:mb-0">Name</span>
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                        <input
                            aria-label="First name"
                            defaultValue={values.firstName || contact.firstName}
                            name="firstName"
                            placeholder="First"
                            type="text"
                            className="w-full text-base rounded-lg px-3 py-2 shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
                        {errors?.first && (
                            <p className="text-red-500 text-sm mt-1">{errors.first[0]}</p>
                        )}
                    </div>
                    <div className="flex-1">
                        <input
                            aria-label="Last name"
                            defaultValue={values.lastName || contact.lastName}
                            name="lastName"
                            placeholder="Last"
                            type="text"
                            className="w-full text-base rounded-lg px-3 py-2 shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
                        {errors?.last && (
                            <p className="text-red-500 text-sm mt-1">{errors.last[0]}</p>
                        )}
                    </div>
                </div>
            </div>

            <label className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-32 mb-2 sm:mb-0">Email</span>
                <div className="flex-1">
                    <input
                        defaultValue={values.email || contact.email}
                        name="email"
                        placeholder="user@example.com"
                        type="email"
                        className="w-full text-base rounded-lg px-3 py-2 shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    {errors?.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
                    )}
                </div>
            </label>

            <label className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-32 mb-2 sm:mb-0">Phone</span>
                <div className="flex-1">
                    <input
                        defaultValue={values.phone || contact.phone || ''}
                        name="phone"
                        placeholder="(123) 456-7890"
                        type="tel"
                        className="w-full text-base rounded-lg px-3 py-2 shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    {errors?.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone[0]}</p>
                    )}
                </div>
            </label>

            <label className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-32 mb-2 sm:mb-0">Twitter</span>
                <div className="flex-1">
                    <input
                        defaultValue={values.twitter || contact.twitter || ''}
                        name="twitter"
                        placeholder="@jack"
                        type="text"
                        className="w-full text-base rounded-lg px-3 py-2 shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    {errors?.twitter && (
                        <p className="text-red-500 text-sm mt-1">{errors.twitter[0]}</p>
                    )}
                </div>
            </label>

            <label className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-32 mb-2 sm:mb-0">Avatar URL</span>
                <div className="flex-1">
                    <input
                        aria-label="Avatar URL"
                        defaultValue={values.avatar || contact.avatar || ''}
                        name="avatar"
                        placeholder="https://example.com/avatar.jpg"
                        type="text"
                        className="w-full text-base rounded-lg px-3 py-2 shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    {errors?.avatar && (
                        <p className="text-red-500 text-sm mt-1">{errors.avatar[0]}</p>
                    )}
                </div>
            </label>

            <label className="flex flex-col sm:flex-row">
                <span className="w-full sm:w-32 mb-2 sm:mb-0">Notes</span>
                <div className="flex-1">
                    <textarea
                        defaultValue={values.notes || contact.notes || ''}
                        name="notes"
                        rows={6}
                        className="w-full text-base rounded-lg px-3 py-2 shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    {errors?.notes && (
                        <p className="text-red-500 text-sm mt-1">{errors.notes[0]}</p>
                    )}
                </div>
            </label>

            <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:ml-32">
                <button type="submit" className="text-base font-medium text-blue-500 px-3 py-2 rounded-lg shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 bg-white">Save</button>
                <button onClick={() => navigate(-1)} type="button" className="text-base font-medium text-gray-700 px-3 py-2 rounded-lg shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 bg-white">Cancel</button>
            </div>
        </Form>
    );
}
