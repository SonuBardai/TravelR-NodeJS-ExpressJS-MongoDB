import Post from "../models/post.js";

export const home = async (req, res) => {
	const data = await Post.find({}).sort({datePosted: 'desc'}).limit(3)
	res.status(200).render("home", { data });
};

export const about = (req, res) => {
	res.status(200).render("about");
};

export const contact = (req, res) => {
	res.status(200).render("contact");
};

export const getBlogsList = async (req, res) => {
	const data = await Post.find({})
		.populate("author")
		.sort({ datePosted: "desc" });
	res.status(200).render("travels", { data });
};

export const getBlog = async (req, res) => {
	const id = req.params.id;
	const post = await Post.findById(id).populate("author");
	console.log("POST: ", post);
	res.status(200).render("post", { post });
};

export const newBlog = (req, res) => {
	res.status(200).render("post_form");
};

import User from "../models/user.js";

export const newBlogHandle = async (req, res) => {
	const post = new Post({
		title: req.body.title,
		content: req.body.content,
		author: "6283029e12e23f819109a9aa",
		image: req.file.filename,
	});

	try {
		await post.save();
		res.redirect("/travels");
	} catch (error) {
		console.error(error);
	}
};
