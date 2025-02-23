import express from 'express';
import { validateRequest } from '../validation/validateRequest';
import { createProductSchema, updateProductSchema } from '../validation/productSchema';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', validateRequest(createProductSchema), createProduct);
router.put('/:id', validateRequest(updateProductSchema), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
