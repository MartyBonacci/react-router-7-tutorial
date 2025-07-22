import { db } from "./lib/db";
import { contacts } from "../db/schema";
import { eq, or, like } from "drizzle-orm";
import type { Contact } from "../db/schema";

export type ContactRecord = Contact;

export type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

export async function getContacts(query?: string | null): Promise<Contact[]> {
  try {
    let allContacts;
    
    if (query) {
      allContacts = await db
        .select()
        .from(contacts)
        .where(
          or(
            like(contacts.firstName, `%${query}%`),
            like(contacts.lastName, `%${query}%`)
          )
        )
        .orderBy(contacts.lastName, contacts.createdAt);
    } else {
      allContacts = await db
        .select()
        .from(contacts)
        .orderBy(contacts.lastName, contacts.createdAt);
    }

    return allContacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw new Error('Failed to fetch contacts');
  }
}

export async function createEmptyContact(): Promise<Contact> {
  try {
    const [newContact] = await db
      .insert(contacts)
      .values({
        firstName: "",
        lastName: "",
        email: "new@example.com",
        phone: "",
        avatar: null,
        twitter: null,
        notes: null,
        favorite: "0",
      })
      .returning();

    if (!newContact) {
      throw new Error("Failed to create contact");
    }

    return newContact;
  } catch (error) {
    console.error('Error creating empty contact:', error);
    throw new Error('Failed to create contact');
  }
}

export async function getContact(id: string): Promise<Contact | null> {
  try {
    const contactId = parseInt(id);
    if (isNaN(contactId)) {
      return null;
    }
    
    const [contact] = await db
      .select()
      .from(contacts)
      .where(eq(contacts.id, contactId))
      .limit(1);

    return contact || null;
  } catch (error) {
    console.error('Error fetching contact:', error);
    throw new Error('Failed to fetch contact');
  }
}

export async function updateContact(
  id: string,
  updates: ContactMutation
): Promise<Contact> {
  try {
    const contactId = parseInt(id);
    if (isNaN(contactId)) {
      throw new Error(`Invalid contact ID: ${id}`);
    }

    const updateData: Partial<Contact> = {};

    if (updates.first !== undefined) updateData.firstName = updates.first;
    if (updates.last !== undefined) updateData.lastName = updates.last;
    if (updates.email !== undefined) updateData.email = updates.email;
    if (updates.phone !== undefined) updateData.phone = updates.phone;
    if (updates.avatar !== undefined) updateData.avatar = updates.avatar;
    if (updates.twitter !== undefined) updateData.twitter = updates.twitter;
    if (updates.notes !== undefined) updateData.notes = updates.notes;
    if (updates.favorite !== undefined) updateData.favorite = updates.favorite ? "1" : "0";

    const [updatedContact] = await db
      .update(contacts)
      .set(updateData)
      .where(eq(contacts.id, contactId))
      .returning();

    if (!updatedContact) {
      throw new Error(`No contact found for ${id}`);
    }

    return updatedContact;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw new Error('Failed to update contact');
  }
}

export async function deleteContact(id: string): Promise<void> {
  try {
    const contactId = parseInt(id);
    if (isNaN(contactId)) {
      throw new Error(`Invalid contact ID: ${id}`);
    }
    
    await db.delete(contacts).where(eq(contacts.id, contactId));
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw new Error('Failed to delete contact');
  }
}