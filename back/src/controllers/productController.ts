import { Request, Response, NextFunction } from 'express';
import * as productService from "../services/productService";
import logger from '../utils/logger'
import { AppError } from '../utils/errors';

/**
 * Product Controller
 * Handles HTTP requests for product operations
 * All prices in requests/responses are in euros
 * Internal storage uses cents
 */

/**
 * GET /products
 * Retrieves a paginated list of products.
 * 
 * @queryParam {number} [page=1] - The page number for pagination.
 * @queryParam {number} [limit=10] - The number of products per page.
 * 
 * @returns {Object} A paginated list of products with metadata.
 * @returns {Array} products - List of products with prices in euros.
 * @returns {Object} metadata - Pagination details.
 * @returns {number} metadata.currentPage - The current page number.
 * @returns {number} metadata.totalPages - The total number of pages.
 * @returns {number} metadata.totalItems - The total number of products.
 * @returns {number} metadata.itemsPerPage - The number of products per page.
 * 
 * @throws {Error} If an error occurs while retrieving the products.
 */
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    logger.info('Fetching products with pagination', { 
      page,
      limit,
      requestPath: req.path 
    });

    const result = await productService.getAllProducts({ page, limit });
    
    logger.info('Products retrieved successfully', { 
      currentPage: result.metadata.currentPage,
      totalPages: result.metadata.totalPages,
      totalItems: result.metadata.totalItems,
      itemsPerPage: result.metadata.itemsPerPage
    });
    
    res.json(result);
  } catch (error) {
    logger.error('Error retrieving products', { 
      error,
      requestPath: req.path 
    });
    next(error);
  }
};

/**
 * GET /products/:id
 * Retrieves a single product by ID
 * @param req.params.id - Product ID
 * @returns Single product with price in euros
 * @throws 400 if ID is invalid
 * @throws 404 if product not found
 */
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      throw new AppError(400, 'Invalid ID format', 'INVALID_ID');
    }

    const product = await productService.getProductById(id);
    logger.info('Product retrieved successfully', { 
      product
    });
    res.json(product);
  } catch (error) {
    logger.error('Error retrieving product', { 
      error,
      productId: req.params.id,
      requestPath: req.path 
    });
    next(error);
  }
};

/**
 * POST /products
 * Creates a new product
 * @param req.body - Product data with price in euros
 * @returns Created product with 201 status
 * @throws 400 if validation fails
 */
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productService.createProduct(req.body);
    logger.info('Product created successfully', { 
      product 
    });
    res.status(201).json({
      message: "Product created successfully",
      product
    });
  } catch (error) {
    logger.error('Error creating product', { 
      error, 
      requestBody: req.body 
    });
    next(error);
  }
};

/**
 * PUT /products/:id
 * Updates an existing product
 * @param req.params.id - Product ID
 * @param req.body - Updated product data
 * @returns Updated product
 * @throws 400 if ID is invalid or validation fails
 * @throws 404 if product not found
 */
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      throw new AppError(400, 'Invalid ID format', 'INVALID_ID');
    }

    const updatedProduct = await productService.updateProduct(id, req.body);
    logger.info('Product updated successfully', { 
      productId: id, 
      updatedProduct 
    });
    res.json({
      message: "Product updated successfully",
      product: updatedProduct
    });
  } catch (error) {
    logger.error('Error updating product', { 
      error, 
      productId: req.params.id, 
      updateData: req.body });
    next(error);
  }
};

/**
 * DELETE /products/:id
 * Deletes a product
 * @param req.params.id - Product ID
 * @returns Success message with deleted product
 * @throws 400 if ID is invalid
 * @throws 404 if product not found
 */
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      throw new AppError(400, 'Invalid ID format', 'INVALID_ID');
    }

    const deletedProduct = await productService.deleteProduct(id);
    
    logger.info('Product deleted successfully', { productId: id });
    res.json({
      message: "Product deleted successfully",
      product: deletedProduct
    });
  } catch (error) {
    logger.error('Error deleting product', { 
      error, 
      productId: req.params.id 
    });
    next(error);
  }
};