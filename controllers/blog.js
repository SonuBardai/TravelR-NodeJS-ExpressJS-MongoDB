import Post from "../models/post.js";

import User from "../models/user.js";
import { Contact } from "../models/contactQuery.js";
import { isAuthenticated } from "./strategies/utils.js";

export const home = async (req, res) => {
	let authenticated = false;
	if (req.user) {
		authenticated = true;
	}
	const data = await Post.find({})
		.sort({ datePosted: "desc" })
		.limit(3)
		.populate("author");
	res.status(200).render("home", { data, authenticated });
};

export const about = (req, res) => {
	let authenticated = false;
	if (req.user) {
		authenticated = true;
	}
	res.status(200).render("about", { authenticated });
};

export const contact = (req, res) => {
	let authenticated = false;
	if (req.user) {
		authenticated = true;
	}
	res.status(200).render("contact", { authenticated });
};

export const contactSubmit = async (req, res) => {
	const message = req.body.message;
	console.log(req.body);
	try {
		const query = new Contact({
			user: req.user.id,
			message,
		});
		await query.save();
		req.flash("Query Submitted");
		res.redirect("/");
	} catch (err) {
		req.flash("Failed to Submit query.", err);
		res.redirect("/error");
	}
};

export const getBlogsList = async (req, res) => {
	let authenticated = false;
	if (req.user) {
		authenticated = true;
	}

	const data = await Post.find({})
		.populate("author")
		.sort({ datePosted: "desc" });
	res.status(200).render("travels", { data, authenticated });
};

export const getBlog = async (req, res) => {
	let authenticated = false;
	if (req.user) {
		authenticated = true;
	}

	const id = req.params.id;
	const post = await Post.findById(id).populate("author");
	res.status(200).render("post", { post, authenticated });
};

export const newBlog = (req, res) => {
	let authenticated = false;
	if (req.user) {
		authenticated = true;
	}

	res.status(200).render("post_form", { authenticated });
};

export const newBlogHandle = async (req, res) => {
	const { title, content } = req.body;
	if (!title || !content || !req.file) {
		req.flash("info", "Please enter all fields to publish post.");
		res.redirect("/create");
		return;
	}
	const post = new Post({
		title: req.body.title,
		content: req.body.content,
		author: req.user.id,
		image: req.file.filename,
	});

	try {
		await post.save();
		res.redirect("/travels");
	} catch (error) {
		console.error(error);
	}
};
