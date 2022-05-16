import express from "express";
const router = express.Router();

import User from '../models/user.js'

router.use(express.static("static"));

router.get("/login", (req, res) => {
	return res.status(200).render("login");
});

router.post("/login", (req, res) => {
	// LOGIN USER
});

router.get("/register", (req, res) => {
	return res.status(200).render("register");
});

router.post("/register", async (req, res) => {
	let { username, email, password1, password2 } = req.body;

	if (!username || !email || !password1 || !password2) {
		res.sendStatus(401);
	}

	const user = new User({
		username: username,
		email: email,
		password: password1,
	});
	errors = user.validateSync();
	if (!errors) {
		user.save();
		res.sendStatus(200);
	} else {
		res.status(401).send(errors);
	}
});

export default router; 