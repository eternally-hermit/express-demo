const express = require("express");
const router = express.Router();
const pug = require("pug");

router.get("/", (req, res) => {
  res
    .status(200)
    .render("index", { title: "My Express App", message: "Welcome!" });
});

module.exports = router;
