"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogController_1 = require("../controllers/blogController");
const router = (0, express_1.Router)();
// Public routes
router.get('/', blogController_1.getBlogs);
router.get('/:slug', blogController_1.getBlogBySlug);
// Admin routes (CRUD)
router.post('/', blogController_1.createBlog);
router.put('/:id', blogController_1.updateBlog);
router.delete('/:id', blogController_1.deleteBlog);
exports.default = router;
