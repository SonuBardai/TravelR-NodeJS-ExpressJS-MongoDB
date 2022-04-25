const express = require("express");
const router = express.Router();

router.use(express.static("static"));

router.get("/login", (req, res) => {
  return res.status(200).render("login");
});

router.post('/login', (req, res) => {
  // LOGIN USER
})

router.get("/register", (req, res) => {
  return res.status(200).render("register");
});

router.post('/register', (req, res) => {
  // CREATE USER
})

module.exports = router;
