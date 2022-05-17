import express from "express";

const router = express.Router();

import {
	getRegisterPage,
	getLoginPage,
	loginUser,
	registerUser,
} from "../controllers/auth.js";

// Register Routes
router.get("/register", getRegisterPage);
router.post("/register", registerUser);

// Login Routes
router.get("/login", getLoginPage);
router.post("/login", loginUser);

export default router;
