import express from "express";

import {
	home,
	about,
	contact,
	getBlogsList,
	getBlog,
	newBlog,
	newBlogHandle,
} from "../controllers/blog.js";

import { upload } from "./utils/imageUpload.js";

const router = express.Router();

// Regular routes
router.get("/", home);
router.get("/about", about);
router.get("/contact", contact);

// Routes to display blogs
router.get("/travels", getBlogsList);
router.get("/travels/:id", getBlog);

// Routes to create a blog
router.get("/create", newBlog);
router.post("/create", upload.single("image"), newBlogHandle);

export default router;
