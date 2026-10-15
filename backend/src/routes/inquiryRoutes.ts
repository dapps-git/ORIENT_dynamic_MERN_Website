import express from 'express';
import { submitInquiry, getInquiries, updateInquiryStatus, deleteInquiry } from '../controllers/inquiryController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public — submit inquiry / quote request
router.post('/', submitInquiry);

// Protected admin — view and manage
router.get('/', protect, getInquiries);
router.put('/:id', protect, updateInquiryStatus);
router.delete('/:id', protect, deleteInquiry);

export default router;
