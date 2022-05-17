import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getRegisterPage = (req, res) => {
	return res.status(200).render("register");
};

export const registerUser = async (req, res) => {
	let { username, email, password1, password2 } = req.body;

	if (!username || !email || !password1 || !password2) {
		req.flash("error", "Enter valid info to register");
		res.status(302).redirect("/users/register");
		return;
	}

	if (password1 !== password2) {
		req.flash("info", "Both passwords should match.");
		res.status(302).redirect("/users/register");
		return;
	}

	let tempUser = await User.findOne({ username });
	if (tempUser) {
		req.flash(
			"info",
			"An account with that username already exists. Please pick another one."
		);
		res.status(302).redirect("/users/register");
		return;
	}

	let hashedPassword;
	try {
		hashedPassword = bcrypt.hashSync(password1, 10);
	} catch (error) {
		req.flash("danger", error);
		res.status(501).redirect("/error");
	}

	const user = new User({
		username: username,
		email: email,
		password: hashedPassword,
	});

	try {
		await user.save();
		res.status(201).redirect("/users/login");
	} catch (error) {
		req.flash("danger", error);
		res.status(501).redirect("/error");
	}
};

export const getLoginPage = (req, res) => {
	return res.status(200).render("login");
};

export const loginUser = (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		req.flash("error", "Please enter valid credentials.");
		res.status(302).redirect("/users/login");
		return;
	}
	
};
