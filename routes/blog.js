import express from "express";
import data from "../static/data.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.status(200).render("home", { data });
});

router.get("/about", (req, res) => {
	res.status(200).render("about");
});

router.get("/contact", (req, res) => {
	res.status(200).render("contact");
});

router.get("/travels", (req, res) => {
	res.status(200).render("travels", { data });
});

router.get("/travels/:id", (req, res) => {
	const id = req.params.id;
	const post = data.find((post) => post.id === parseInt(id));
	res.status(200).render("post", { post });
});

export default router;
