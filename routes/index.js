const express = require("express");
const router = express.Router();
const { profileLoggedIn  } = require("../middlewares/index");

const data = require("../bin/seeds/data");
const categories = data.categories;

/* GET home page */
router.get("/", profileLoggedIn, (req, res) => {
	res.render("index", { categories, user: req.user });
});

module.exports = router;
