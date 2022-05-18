import express from "express";

import {
	home,
	about,
	contact,
	contactSubmit,
	getBlogsList,
	getBlog,
	newBlog,
	newBlogHandle,
} from "../controllers/blog.js";

import { isAuthenticated } from "../controllers/strategies/utils.js";

import { upload } from "./utils/imageUpload.js";

const router = express.Router();

// Regular routes
router.get("/", home);
router.get("/about", about);
router.get("/contact", isAuthenticated, contact);
router.post("/contact", isAuthenticated, contactSubmit);

// Routes to display blogs
router.get("/travels", getBlogsList);
router.get("/travels/:id", getBlog);

// Routes to create a blog
router.get("/create", isAuthenticated, newBlog);
router.post("/create", isAuthenticated, upload.single("image"), newBlogHandle);

export default router;
