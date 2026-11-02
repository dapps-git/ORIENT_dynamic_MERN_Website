"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanySetting = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const CompanySettingSchema = new mongoose_1.Schema({
    companyName: { type: String, default: 'Orient Energy' },
    tagline: { type: String, default: 'Industrial Supply & Engineering Solutions in Saudi Arabia' },
    aboutShort: {
        type: String,
        default: 'Orient Energy delivers world-class industrial equipment, engineering procurement, and field support across Saudi Arabia.'
    },
    aboutFull: {
        type: String,
        default: 'Orient Energy is a premier industrial solutions partner in the Kingdom of Saudi Arabia, catering to oil & gas, petrochemical, marine, heavy infrastructure, and energy sectors.'
    },
    phone: { type: String, default: '+966 13 888 0000' },
    email: { type: String, default: 'info@orientenergyco.com' },
    address: { type: String, default: 'King Fahd Road, Al Khobar / Dammam, Kingdom of Saudi Arabia' },
    locations: [{ type: String }],
    workingHours: { type: String, default: 'Sun - Thu: 8:00 AM - 5:30 PM' },
    socials: {
        linkedin: { type: String, default: 'https://linkedin.com' },
        instagram: { type: String, default: 'https://www.instagram.com/orientenergyco/' },
        twitter: { type: String, default: '' },
        facebook: { type: String, default: '' }
    },
    stats: {
        experienceYears: { type: Number, default: 15 },
        productsDelivered: { type: Number, default: 12500 },
        activeClients: { type: Number, default: 450 },
        satisfactionRate: { type: Number, default: 99 }
    }
}, { timestamps: true });
exports.CompanySetting = mongoose_1.default.model('CompanySetting', CompanySettingSchema);
