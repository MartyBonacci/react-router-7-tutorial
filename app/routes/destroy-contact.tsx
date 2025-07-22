import { redirect } from "react-router";
import type { Route } from "./+types/destroy-contact";
import { deleteContact, getContact } from "../data";

export async function action({ params }: Route.ActionArgs) {
    try {
        // Verify contact exists before deletion
        const contact = await getContact(params.contactId);
        if (!contact) {
            throw new Response("Contact not found", { status: 404 });
        }

        await deleteContact(params.contactId);
        return redirect("/");
    } catch (error) {
        if (error instanceof Response) {
            throw error;
        }
        throw new Response("Failed to delete contact", { status: 500 });
    }
}
