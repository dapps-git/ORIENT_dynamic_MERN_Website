import express from 'express';
import {
  getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct
} from '../controllers/productController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public
router.get('/', getProducts);
router.get('/:slug', getProductBySlug);

// Protected
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;
