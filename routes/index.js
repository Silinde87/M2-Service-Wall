const express = require("express");
const { users } = require("../bin/seeds/data");
const router = express.Router();
const { showProfilePic } = require("../middlewares/index")

const data = require("../bin/seeds/data");
const categories = data.categories;

/* GET home page */
router.get("/", (req, res, next) => {
	res.render("index", { categories, user: req.user });
});



module.exports = router;
