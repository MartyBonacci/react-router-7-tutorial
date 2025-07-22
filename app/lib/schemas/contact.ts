import { z } from 'zod';

// Base contact schema for form validation
export const contactSchema = z.object({
  firstName: z.string()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or less"),
  lastName: z.string()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or less"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(255, "Email must be 255 characters or less"),
  phone: z.string()
    .max(20, "Phone must be 20 characters or less")
    .optional()
    .or(z.literal('')),
  avatar: z.string()
    .url("Please enter a valid URL for avatar")
    .max(1000, "Avatar URL must be 1000 characters or less")
    .optional()
    .or(z.literal('')),
  twitter: z.string()
    .max(50, "Twitter handle must be 50 characters or less")
    .optional()
    .or(z.literal('')),
  notes: z.string()
    .max(5000, "Notes must be 5000 characters or less")
    .optional()
    .or(z.literal('')),
  favorite: z.boolean().optional(),
});

// Schema for contact creation (same as base)
export const contactCreateSchema = contactSchema;

// Schema for contact updates (all fields optional)
export const contactUpdateSchema = contactSchema.partial();

// Schema for form data (handles string conversion)
export const contactFormSchema = z.object({
  first: z.string()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or less"),
  last: z.string()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or less"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(255, "Email must be 255 characters or less"),
  phone: z.string()
    .max(20, "Phone must be 20 characters or less")
    .optional()
    .or(z.literal('')),
  avatar: z.string()
    .url("Please enter a valid URL for avatar")
    .max(1000, "Avatar URL must be 1000 characters or less")
    .optional()
    .or(z.literal('')),
  twitter: z.string()
    .max(50, "Twitter handle must be 50 characters or less")
    .optional()
    .or(z.literal('')),
  notes: z.string()
    .max(5000, "Notes must be 5000 characters or less")
    .optional()
    .or(z.literal('')),
  favorite: z.string().optional(),
});

// Schema for favorite toggle
export const favoriteToggleSchema = z.object({
  favorite: z.string().transform((val: string) => val === 'true'),
});

// Type exports
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ContactCreateData = z.infer<typeof contactCreateSchema>;
export type ContactUpdateData = z.infer<typeof contactUpdateSchema>;