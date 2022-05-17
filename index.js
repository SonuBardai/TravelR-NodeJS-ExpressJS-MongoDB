import express from "express";
import expressLayouts from "express-ejs-layouts";
import flash from "express-flash";
import session from "express-session";

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
	console.log(req.method, req.url, req.statusCode);
	next();
});
app.use(express.static("static"));
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(
	session({
		secret: "c1816c6bd664afbaf8a0f4cf4a31cc27102f990100fe0a9d8d1ded1a8f86ada0c2c247b2dc5b0471985b1132104431b21a03e50da89fbc744004395840cdd513",
		resave: false,
		saveUninitialized: false,
	})
);
app.use(flash());

// Routes
app.use("/", blog_routes);
app.use("/users", auth_routes);

app.get("/error", (req, res) => res.render("error"));
