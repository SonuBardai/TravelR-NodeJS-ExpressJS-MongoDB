import express from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: mongoose.SchemaTypes.String,
		required: [true, "Enter a username"],
	},
	email: {
		type: mongoose.SchemaTypes.String,
		required: [true, "Enter an email address"],
		match: [/\S+@\S+\.\S+/, "Enter a valid email address"],
	},
	password: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},
});

const user = mongoose.model("User", userSchema);

export default user;
