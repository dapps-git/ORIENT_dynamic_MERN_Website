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
exports.Product = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ProductSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    sku: { type: String, default: '' },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: false },
    categoryName: { type: String, default: '' },
    divisionSlug: { type: String, default: '' },
    shortDescription: { type: String, default: '' },
    fullDescription: { type: String, default: '' },
    specifications: [
        {
            label: { type: String, required: true },
            value: { type: String, required: true },
        },
    ],
    features: [{ type: String }],
    image: { type: String, default: '' },
    images: [{ type: String }],
    innerSections: [
        {
            title: { type: String, required: true },
            content: { type: String, required: true },
            image: { type: String, default: '' },
        },
    ],
    whatsappMessage: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    catalogueUrl: { type: String, default: '' },
    // SEO & Google Rich Results Optimization
    seoTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    focusKeyword: { type: String, default: '' },
    secondaryKeywords: [{ type: String }],
    imageAlt: { type: String, default: '' },
    imageTitle: { type: String, default: '' },
    brand: { type: String, default: 'Orient Energy' },
    canonicalUrl: { type: String, default: '' },
}, { timestamps: true });
exports.Product = mongoose_1.default.model('Product', ProductSchema);
