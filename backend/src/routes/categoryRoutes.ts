import express from 'express';
import {
  getCategories, getCategoryBySlug, createCategory, updateCategory, deleteCategory
} from '../controllers/categoryController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public
router.get('/', getCategories);
router.get('/:slug', getCategoryBySlug);

// Protected (admin only)
router.post('/', protect, createCategory);
router.put('/:id', protect, updateCategory);
router.delete('/:id', protect, deleteCategory);

export default router;
