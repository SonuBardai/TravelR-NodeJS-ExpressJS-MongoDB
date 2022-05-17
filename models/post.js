import mongoose from "mongoose";

const postSchema = mongoose.Schema({
	title: {
		type: mongoose.SchemaTypes.String,
		required: true
	},
	content: {
		type: mongoose.SchemaTypes.String,
		required: true
	},
	datePosted: {
		type: mongoose.SchemaTypes.Date,
		default: Date.now,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	image: {
		type: mongoose.SchemaTypes.String,
	},
});

const post = mongoose.model("Post", postSchema);

export default post;
