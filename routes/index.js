const express = require("express");
const router = express.Router();

const data = require("../bin/seeds/data");
const categories = data.categories;

/* GET home page */
router.get("/", (req, res, next) => {
	res.render("index", { categories });
});

module.exports = router;
