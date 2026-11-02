"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.getMe = exports.adminLogin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AdminUser_1 = require("../models/AdminUser");
const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('FATAL: JWT_SECRET environment variable is missing.');
    }
    return secret;
};
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }
        const admin = await AdminUser_1.AdminUser.findOne({ email: email.toLowerCase() });
        if (!admin) {
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }
        const token = jsonwebtoken_1.default.sign({ id: admin._id, role: admin.role }, getJwtSecret(), { expiresIn: '7d' });
        res.json({
            success: true,
            token,
            user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.adminLogin = adminLogin;
const getMe = async (req, res) => {
    try {
        const admin = await AdminUser_1.AdminUser.findById(req.admin.id).select('-password');
        if (!admin)
            return res.status(404).json({ success: false, message: 'Admin not found' });
        res.json({ success: true, data: admin });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getMe = getMe;
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const admin = await AdminUser_1.AdminUser.findById(req.admin.id);
        if (!admin)
            return res.status(404).json({ success: false, message: 'Admin not found' });
        const isMatch = await bcryptjs_1.default.compare(currentPassword, admin.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Current password is incorrect' });
        }
        admin.password = await bcryptjs_1.default.hash(newPassword, 12);
        await admin.save();
        res.json({ success: true, message: 'Password updated successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.changePassword = changePassword;
