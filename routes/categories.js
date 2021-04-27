const express = require("express");
const router = express.Router();
const Service = require("../models/Service.model");
const User = require("../models/User.model");

router.get("/:name", (req, res, next) => {
	const { name } = req.params;
	const sorting_by = req.query.sorting_by;

	if (sorting_by) {
		Service.find({ $and: [ {"category.name": name} , {'flag': true} ] } )
			.sort(sorting_by)
			.populate("user_id")
			.then((services) => {
				res.json(services);
			})
			.catch((err) => console.error(err));
	} else {
		Service.find({ $and: [ {"category.name": name} , {'flag': true} ] } )
			.populate("user_id")
			.then((services) => {
				res.render("categories", { services });
			})
			.catch((err) => console.error(err));
	}
});

module.exports = router;
