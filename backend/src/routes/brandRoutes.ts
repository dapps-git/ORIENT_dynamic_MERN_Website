import express from 'express';
import {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} from '../controllers/brandController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.get('/', getBrands);
router.get('/:id', getBrandById);
router.post('/', protect, createBrand);
router.put('/:id', protect, updateBrand);
router.delete('/:id', protect, deleteBrand);

export default router;
