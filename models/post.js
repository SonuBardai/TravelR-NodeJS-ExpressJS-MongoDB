import mongoose from "mongoose";

const postSchema = mongoose.Schema({
	title: {
		typeof: mongoose.SchemaTypes.String,
		required: true,
	},
	content: {
		typeof: mongoose.SchemaTypes.String,
		required: true,
	},
	datePosted: {
		typeof: mongoose.SchemaTypes.Date,
		required: true,
		default: new Date().getDate(),
	},
	author: {
		type: new mongoose.Schema.Types.ObjectId(),
		ref: "User",
		required: true,
	},
	image: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},
});

const post = mongoose.model("Post", postSchema);

export default post;
