import { z } from 'zod';
import { CONSTANTS } from './constants';

// Helper function to validate URLs
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Base schema for common fields
const baseSourceSchema = {
  title: z
    .string()
    .min(CONSTANTS.VALIDATION.TITLE.MIN_LENGTH, 'Title is required')
    .max(CONSTANTS.VALIDATION.TITLE.MAX_LENGTH, 'Title is too long')
    .trim(),
  author: z.string().trim().nullable(),
  year: z
    .number()
    .int('Year must be a whole number')
    .min(CONSTANTS.VALIDATION.YEAR.MIN, 'Year must be after 1000')
    .max(CONSTANTS.VALIDATION.YEAR.MAX, 'Year cannot be in the future')
    .nullable()
    .optional(),
  edition: z.string().trim().optional(),
  publisher: z.string().trim().optional(),
  source_url: z
    .string()
    .refine((val) => val === '' || isValidUrl(val), {
      message: 'Please enter a valid URL',
    })
    .max(CONSTANTS.VALIDATION.URL.MAX_LENGTH, 'URL is too long')
    .optional(),
};

// Schema for editing a source
export const editSourceSchema = z.object(baseSourceSchema);

// Type exports
export type EditSourceFormData = z.infer<typeof editSourceSchema>;
