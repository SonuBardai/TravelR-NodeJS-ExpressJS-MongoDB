import express from "express";
import expressLayouts from "express-ejs-layouts";

const app = express();
const PORT = process.env.PORT || 80;

import blog_routes from "./routes/blog.js";
import auth_routes from "./routes/auth.js";

import mongoose from "mongoose";

// Settings
app.set("view engine", "ejs");
app.set("views", "templates");
app.set("layout", "base");

// DB
mongoose
	.connect("mongodb://localhost:27017/travelr")
	.then(
		app.listen(PORT, () => {
			console.log(`Server Running on Port: ${PORT}`);
		})
	)
	.catch((err) => console.error(err));

// Middleware
app.use(function logger(req, res, next) {
	console.log(req.method, req.url);
	next();
});
app.use(express.static("static"));
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: false }));

// Routes
app.use("/", blog_routes);
app.use("/users", auth_routes);
