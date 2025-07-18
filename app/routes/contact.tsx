import {Form, useFetcher} from "react-router";
import {type ContactRecord, updateContact} from "../data";
import { getContact } from "../data";
import type { Route } from "./+types/contact";

export async function action({ params, request,}: Route.ActionArgs) {
    const formData = await request.formData();
    return updateContact(params.contactId, {
        favorite: formData.get("favorite") === "true",
    });
}

export async function loader({ params }: Route.LoaderArgs) {
    const contact = await getContact(params.contactId);
    if (!contact) {
        throw new Response("Not Found", { status: 404 });
    }
    return { contact };
}

export default function Contact({ loaderData, }: Route.ComponentProps) {
    const { contact } = loaderData;

    return (
        <div className="flex flex-col sm:flex-row max-w-2xl">
            <div className="flex-shrink-0 mb-4 sm:mb-0">
                <img
                    alt={`${contact.first} ${contact.last} avatar`}
                    key={contact.avatar}
                    src={contact.avatar}
                    className="w-48 h-48 bg-gray-300 rounded-3xl object-cover mx-auto sm:mr-8"
                />
            </div>

            <div className="flex-1 text-center sm:text-left">
                <h1 className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-3xl font-bold mb-0">
                    <span className="flex-1">
                        {contact.first || contact.last ? (
                            <>
                                {contact.first} {contact.last}
                            </>
                        ) : (
                            <i className="text-gray-500">No Name</i>
                        )}
                    </span>
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter ? (
                    <p className="mt-0">
                        <a
                            href={`https://twitter.com/${contact.twitter}`}
                            className="flex items-center justify-center sm:justify-start text-2xl text-blue-500 hover:underline"
                        >
                            {contact.twitter}
                        </a>
                    </p>
                ) : null}

                {contact.notes ? <p className="whitespace-pre-wrap">{contact.notes}</p> : null}

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Form action="edit">
                        <button type="submit" className="w-full sm:w-auto text-base font-medium text-blue-500 px-3 py-2 rounded-lg shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 bg-white">Edit</button>
                    </Form>

                    <Form
                        action="destroy"
                        method="post"
                        onSubmit={(event) => {
                            const response = confirm(
                                "Please confirm you want to delete this record."
                            );
                            if (!response) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit" className="w-full sm:w-auto text-base font-medium text-red-500 px-3 py-2 rounded-lg shadow-sm ring-1 ring-gray-200 hover:ring-gray-300 bg-white">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

function Favorite({
                      contact,
                  }: {
    contact: Pick<ContactRecord, "favorite">;
}) {
    const fetcher = useFetcher()
    const favorite = fetcher.formData
        ? fetcher.formData.get("favorite") === "true"
        : contact.favorite

    return (
        <fetcher.Form method="post" className="flex items-center">
            <button
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
                name="favorite"
                value={favorite ? "false" : "true"}
                className="text-2xl font-normal p-0 shadow-none ring-0 hover:ring-0 bg-transparent"
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}
