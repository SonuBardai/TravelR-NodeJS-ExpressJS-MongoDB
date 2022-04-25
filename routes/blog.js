const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).render("home");
});

router.get("/about", (req, res) => {
  res.status(200).render("about");
});

router.get("/contact", (req, res) => {
  res.status(200).render("contact");
});

module.exports = router;
