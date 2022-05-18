import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	message: String,
	date: {
		type: Date,
		default: new Date(),
	},
});

export const Contact = mongoose.model("Contact", contactSchema);
