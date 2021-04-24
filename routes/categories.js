const express = require("express");
const { populate } = require("../models/Service.model");
const router = express.Router();
const Service = require("../models/Service.model");
const User = require("../models/User.model");

router.get("/:name", (req, res, next) => {
	const { name } = req.params;
	Service.find({ "category.name": name })
		.populate("user_id")
		.then((services) => {
			//todo: Get media rate from each service
			console.log(services[0].user_id.reviews)
			
			res.render("categories", { services });
		})
		.catch((err) => console.error(err));
});

module.exports = router;