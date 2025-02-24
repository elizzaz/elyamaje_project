import { z } from 'zod';

// Regex to validate an URL
const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;%=]*)?$/;

/**
 * Base schema for product price validation
 * Ensures price is a valid dollar amount with 2 decimal places
 */
const priceSchema = z.number()
  .positive("Price must be positive")
  .min(0.01, "Minimum price is 0.01")
  .max(999999.99, "Maximum price is 999,999.99")
  .transform(val => Number(val.toFixed(2)));

/**
 * Schema for creating a new product
 */
export const createProductSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name must be less than 255 characters"),
  description: z.string()
    .min(10, "Description must be at least 10 characters")
    .optional(),
  price: priceSchema,
  stock: z.number()
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
  image: z.string()
    .optional().refine(value => !value || urlRegex.test(value), {
      message: "Invalid image URL",
    })
    .nullable(),
});

/**
 * Schema for updating an existing product
 * All fields are optional, but must follow the same validation rules if provided
 */
export const updateProductSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name must be less than 255 characters")
    .optional(),
  description: z.string()
    .min(10, "Description must be at least 10 characters")
    .optional(),
  price: priceSchema.optional(),
  stock: z.number()
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative")
    .optional(),
  image: z.string()
  .optional().refine(value => !value || urlRegex.test(value), {
    message: "Invalid image URL",
  })
    .nullable(),
});

// Types dérivés des schémas pour TypeScript
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;