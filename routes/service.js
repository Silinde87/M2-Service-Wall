const express = require("express");
const router = express.Router();
const Service = require("../models/Service.model");
const User = require("../models/User.model");
const data = require("../bin/seeds/data");
const categories = data.categories;
const { isLoggedIn } = require("../middlewares/index");

router.get("/", (req, res, next) => {});

/* Search bar route. Search a service by description */
router.get("/search", (req, res, next) => {
	const { description } = req.query;
	Service.find({ description: { $regex: `.*(?i)${description}.*` } })
		.populate("user_id")
		.then((services) => {
			res.render("service/service-list", { services, description });
		})
		.catch((err) => console.error(err));
});

/* CREATE service routes */
router.get("/create", isLoggedIn, (req, res, next) => {
	res.render("service/service-create", { categories });
});

router.post("/create", isLoggedIn, (req, res, next) => {
	let { description, price, category, location, image } = req.body;
	const user_id = req.user._id;
	//Get category object from category name.
	categories.forEach((cat) => {
		if (cat.name === category) category = cat;
	});

	//temp. hardcoded location. todo: implement mapbox
	location = ["35.6828387", "139.7594549"];
	//image: todo, get "string" from file in a submit. Implement cloudinary

	//todo, add image property at create query
	Service.create({ description, price, location, user_id, category })
		.then(() => {
			res.redirect("/");
			//todo: Remove redirect to index and redirect to user profile
			//res.redirect(`/profile/${user_id}`);
		})
		.catch((err) => console.error(err));
});

/* DELETE service route */
router.post("/:id/delete", isLoggedIn, (req, res, next) => {
	const service_id = req.params.id;
	const user_id = req.user._id;

	Service.findById(service_id)
		.then((service) => {
			//Compare service_id and user_id, if equal deletes service.
			if (JSON.stringify(service.user_id) === JSON.stringify(user_id)) {
				Service.findByIdAndRemove(service_id)
					.then(() => {
						res.redirect("/");
						//todo: Remove redirect to index and redirect to user profile
						//res.redirect(`/profile/${user_id}`);
					})
					.catch((err) => console.error(err));
			}
		})
		.catch((err) => console.error(err));
});

/* Profile view. Rendered by user id. */
router.get("/:id", (req, res, next) => {
	const { id } = req.params;
	Service.findById(id)
		.populate("user_id")
		.then((service) => {
			console.log(service);
			res.render("service/service", service);
		})
		.catch((err) => console.error(err));
});

module.exports = router;
