const express = require("express");
const expressLayout = require("express-ejs-layouts");

const app = express();
const PORT = process.env.PORT || 80;
const blog_routes = require("./routes/blog");
const auth_routes = require("./routes/auth");

// Settings
app.set("view engine", "ejs");
app.set("views", "templates");
app.set("layout", "base");

// Middleware
app.use(function logger(req, res, next){
  console.log(req.method, req.url);
  next()
})
app.use(express.static("static"));
app.use(expressLayout);

// Routes
app.use("/", blog_routes);
app.use("/users", auth_routes);

// Port Listener
app.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`);
});