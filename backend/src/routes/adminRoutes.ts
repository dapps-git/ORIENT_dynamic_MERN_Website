import express from 'express';
import { adminLogin, getMe, changePassword } from '../controllers/authController';
import { getDashboardStats, getSettings, updateSettings } from '../controllers/settingsController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePassword);
router.get('/dashboard', protect, getDashboardStats);
router.get('/settings', protect, getSettings);
router.put('/settings', protect, updateSettings);

export default router;
