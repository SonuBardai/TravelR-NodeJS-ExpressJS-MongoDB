import express from "express";

const router = express.Router();

import {
	getRegisterPage,
	getLoginPage,
	loginUser,
	registerUser,
	logoutUser,
} from "../controllers/auth.js";

import {
	isAuthenticated,
	isNotAuthenticated,
} from "../controllers/strategies/utils.js";

// Passport
import passport from "passport";
import { userAuthentication } from "../controllers/strategies/passportLocal.js";
userAuthentication();

// Register Routes
router.get("/register", isNotAuthenticated, getRegisterPage);
router.post("/register", isNotAuthenticated, registerUser);

// Login Routes
router.get("/login", isNotAuthenticated, getLoginPage);
router.post(
	"/login",
	passport.authenticate("local", {
		failureRedirect: "/users/login",
		failureMessage: true,
		failureFlash: true,
		successRedirect: "/travels",
		successFlash: true,
	}),
	loginUser
);

router.get("/logout", isAuthenticated, logoutUser);

export default router;
