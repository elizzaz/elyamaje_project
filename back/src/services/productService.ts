import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, sql } from "drizzle-orm";
import { productsTable } from "../db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { AppError } from '../utils/errors';
import logger from '../utils/logger'
import { toCents, toDollars } from '../utils/price';
import { z } from 'zod';
import { createProductSchema, updateProductSchema } from '../validation/productSchema';

/**
 * Database connection instance
 */
const db = drizzle(process.env.DATABASE_URL!);

/**
 * Types for TypeScript
 * Product: Type for products retrieved from database
 * NewProduct: Type for creating new products
 */
export type Product = InferSelectModel<typeof productsTable>;
export type NewProduct = InferInsertModel<typeof productsTable>;

interface PaginationParams {
  page?: number
  limit?: number
}

interface PaginatedResponse<T> {
  data: T[]
  metadata: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

/**
 * GET /products
 * Retrieves a paginated list of products.
 * 
 * @queryParam {number} [page=1] - The page number for pagination.
 * @queryParam {number} [limit=10] - The number of products per page.
 * 
 * @returns {Object} A paginated list of products with metadata.
 * @returns {Array} products - List of products with prices in dollars.
 * @returns {Object} metadata - Pagination details.
 * @returns {number} metadata.currentPage - The current page number.
 * @returns {number} metadata.totalPages - The total number of pages.
 * @returns {number} metadata.totalItems - The total number of products.
 * @returns {number} metadata.itemsPerPage - The number of products per page.
 * 
 * @throws {Error} If an error occurs while retrieving the products.
 */
export const getAllProducts = async ({ page = 1, limit = 10 }: PaginationParams = {}): Promise<PaginatedResponse<Product>> => {
  try {
    const offset = (page - 1) * limit

    const [{ count }] = await db
      .select({ count: sql`count(*)` })
      .from(productsTable)

    const totalItems = Number(count)
    const totalPages = Math.ceil(totalItems / limit)

    const productsData = await db
      .select()
      .from(productsTable)
      .limit(limit)
      .offset(offset)
      .orderBy(productsTable.id)

    const data = productsData.map(product => ({
      ...product,
      price: toDollars(product.price),
    }))

    logger.info(`Retrieved ${data.length} products (page ${page}/${totalPages})`)

    return {
      data,
      metadata: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit
      }
    }
  } catch (error) {
    logger.error('Error getting products:', error)
    throw error
  }
}

/**
 * Retrieves a single product by its ID
 * @param id - The product ID to retrieve
 * @returns Promise<Product> Product with price in dollars
 * @throws AppError(404) if product not found
 */
export const getProductById = async (id: number): Promise<Product> => {
  const product = await db.select()
    .from(productsTable)
    .where(eq(productsTable.id, id))
    .limit(1);

  if (!product.length) {
    throw new AppError(404, 'Product not found', 'PRODUCT_NOT_FOUND');
  }

  return {
    ...product[0],
    price: toDollars(product[0].price),
  };
};

/**
 * Creates a new product in the database
 * @param product - Product data with price in dollars
 * @returns Promise<Product> Created product with price in dollars
 * @throws AppError(400) if validation fails
 */
export const createProduct = async (product: unknown): Promise<Product> => {
  try {
    // Validation des données
    const validatedData = await createProductSchema.parseAsync(product);
    
    const [newProduct] = await db.insert(productsTable)
      .values({
        ...validatedData,
        price: toCents(validatedData.price),
      })
      .returning();
    
    return {
      ...newProduct,
      price: toDollars(newProduct.price),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error('Validation error in createProduct', { error: error.errors });
      throw new AppError(400, 'Invalid product data', 'VALIDATION_ERROR');
    }
    throw new AppError(400, 'Failed to create product', 'CREATE_FAILED');
  }
};

/**
 * Updates an existing product
 * @param id - ID of the product to update
 * @param productData - Updated product data
 * @returns Promise<Product> Updated product with price in dollars
 * @throws AppError(400) if validation fails
 * @throws AppError(404) if product not found
 */
export const updateProduct = async (id: number, productData: unknown): Promise<Product> => {
  try {
    await getProductById(id);

    // Validation des données
    const validatedData = await updateProductSchema.parseAsync(productData);

    const updateData: Partial<Product> = {
      ...validatedData,
      ...(validatedData.price && { price: toCents(validatedData.price) })
    };

    const [updatedProduct] = await db
      .update(productsTable)
      .set(updateData)
      .where(eq(productsTable.id, id))
      .returning();

    if (!updatedProduct) {
      throw new AppError(500, 'Failed to update product', 'UPDATE_FAILED');
    }

    return {
      ...updatedProduct,
      price: toDollars(updatedProduct.price),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error('Validation error in updateProduct', { error: error.errors });
      throw new AppError(400, 'Invalid update data', 'VALIDATION_ERROR');
    }
    if (error instanceof AppError) throw error;
    throw new AppError(500, 'Failed to update product', 'UPDATE_FAILED');
  }
};

/**
 * Deletes a product from the database
 * @param id - ID of the product to delete
 * @returns Promise<Product> Deleted product with price in dollars
 * @throws AppError(404) if product not found
 */
export const deleteProduct = async (id: number): Promise<Product> => {
  const [deletedProduct] = await db.delete(productsTable)
    .where(eq(productsTable.id, id))
    .returning();

  if (!deletedProduct) {
    throw new AppError(404, 'Product not found', 'PRODUCT_NOT_FOUND');
  }

  return deletedProduct;
};
