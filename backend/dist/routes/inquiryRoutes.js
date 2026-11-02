"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inquiryController_1 = require("../controllers/inquiryController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Public — submit inquiry / quote request
router.post('/', inquiryController_1.submitInquiry);
// Protected admin — view and manage
router.get('/', auth_1.protect, inquiryController_1.getInquiries);
router.put('/:id', auth_1.protect, inquiryController_1.updateInquiryStatus);
router.delete('/:id', auth_1.protect, inquiryController_1.deleteInquiry);
exports.default = router;
